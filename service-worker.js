/*
 * PrendiPillola v1 — Service Worker
 * Copyright (c) 2026 Lazzaro Serva - Centola
 * Tutti i diritti riservati.
 */
'use strict';

const CACHE_NAME = 'prendipillola-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&display=swap',
];

// ── Installazione: pre-cache degli asset statici ──
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS).catch(() => {
        // Se il font Google non è raggiungibile, installa comunque
        return cache.addAll(['./index.html', './manifest.json']);
      });
    })
  );
  self.skipWaiting();
});

// ── Attivazione: pulizia cache vecchie ──
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: cache-first per asset statici, network-first per il resto ──
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Solo richieste GET
  if (event.request.method !== 'GET') return;

  // Network-first per API esterne
  if (url.origin !== self.location.origin && !url.hostname.includes('fonts.googleapis') && !url.hostname.includes('fonts.gstatic')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Fallback a index.html per la navigazione
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
