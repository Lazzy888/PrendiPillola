---
name: pwa-anziani
description: >
  Usa questa skill ogni volta che l'utente chiede di creare una PWA
  (Progressive Web App) ottimizzata per persone anziane o con necessità
  di accessibilità elevata. Attiva anche quando si tratta di:
  app per la salute, promemoria, tracker abitudini, app offline-first
  con interfaccia semplificata, avvisi multimodali (visivi/sonori/vocali),
  comandi vocali, storage locale. Combina con le skill docx, pptx, pdf
  quando occorre produrre documentazione del progetto.
license: Privato – Lazzaro Serva – http://www.graficaesiti.it/
---

# Skill: PWA per Persone Anziane (Accessibilità Elevata)

Questa skill raccoglie pattern, scelte progettuali e codice riutilizzabile
sviluppati nelle applicazioni ScriviLibro e PrendiPillola.

---

## 1. STRUTTURA FILE STANDARD

```
nome-app/
├── index.html          ← app monolitica (HTML + CSS inline + JS inline)
├── manifest.json       ← configurazione PWA
├── service-worker.js   ← cache offline
├── assets/
│   ├── icon-192.png
│   └── icon-512.png
├── LICENSE             ← copyright all rights reserved
├── AUTHORS             ← dati autore
├── README.md           ← documentazione GitHub
├── CHANGELOG           ← storico versioni
└── [nome-app]-skill.md ← questa skill aggiornata
```

---

## 2. COPYRIGHT — INTESTAZIONI STANDARD

### index.html (commento HTML in cima)
```html
<!--
  ============================================================
  [NomeApp] v[N] — [Descrizione breve]
  Copyright (c) 2026 Lazzaro Serva - Centola
  Via Tasso, 28 – 84051 CENTOLA (SA) – Italia
  http://www.graficaesiti.it/
  Tutti i diritti riservati – All rights reserved.
  Vietata riproduzione, modifica e distribuzione senza
  autorizzazione scritta del titolare del copyright.
  ============================================================
-->
```

### app.js o script inline (commento JS in cima)
```javascript
/*
 * [NomeApp] v[N] — [Descrizione breve]
 * Copyright (c) 2026 Lazzaro Serva - Centola
 * Via Tasso, 28 – 84051 CENTOLA (SA) – Italia
 * http://www.graficaesiti.it/
 * Tutti i diritti riservati – All rights reserved.
 */
```

### manifest.json — campi copyright
```json
{
  "description": "[NomeApp] v[N] – [descrizione]. Copyright (c) 2026 Lazzaro Serva - Centola. Tutti i diritti riservati.",
  "author": "Lazzaro Serva – http://www.graficaesiti.it/"
}
```

### LICENSE (testo fisso, sostituire solo nome app e versione)
```
Copyright (c) 2026 Lazzaro Serva - Centola
TUTTI I DIRITTI RISERVATI / ALL RIGHTS RESERVED
[resto come da template in /prendipillola/LICENSE]
```

### AUTHORS (template con sezioni AUTORE / PROGETTO / COPYRIGHT / TECNOLOGIE)
Vedi `/prendipillola/AUTHORS` come modello.

---

## 3. CSS — VARIABILI TEMA PER ACCESSIBILITÀ

```css
:root {
  /* Palette */
  --primary:    #1565c0;
  --primary-l:  #1e88e5;
  --primary-d:  #0d47a1;
  --secondary:  #00897b;
  --success:    #2e7d32;
  --success-l:  #43a047;
  --warning:    #e65100;
  --danger:     #c62828;
  --bg:         #e3f2fd;
  --surface:    #ffffff;
  --surface2:   #f0f7ff;
  --text:       #0d2137;
  --text2:      #37474f;
  --border:     #90caf9;
  --shadow:     0 3px 12px rgba(21,101,192,0.18);
  --radius:     18px;
  --radius-s:   12px;

  /* Font size scalabile */
  --fs-body:    20px;   /* minimo per anziani */
  --fs-label:   18px;
  --fs-small:   16px;
  --fs-big:     24px;
  --fs-title:   28px;
}

/* Classi font size (applicate a body) */
.fs-xl  { --fs-body:24px; --fs-label:22px; --fs-small:19px; --fs-big:30px; --fs-title:34px; }
.fs-xxl { --fs-body:28px; --fs-label:26px; --fs-small:22px; --fs-big:36px; --fs-title:40px; }

/* Alto contrasto */
.hc {
  --primary: #003d99;
  --bg: #f5faff;
  --text: #000000;
  --text2: #111111;
  --border: #003d99;
}
```

**Font consigliato:** `Nunito` (Google Fonts) — rotondo, leggibile, friendly.
**Touch target minimo:** 64×64px (WCAG 2.5.5 AAA).

---

## 4. LAYOUT STANDARD

### Header
```html
<header id="header">
  <span class="logo">[EMOJI]</span>
  <div class="title">
    [NomeApp]
    <span>[sottotitolo]</span>
  </div>
  <button class="hdr-btn" id="helpBtn" aria-label="Manuale d'uso">❓</button>
</header>
```

### Bottom Navigation (4 tab)
```html
<nav id="bottom-nav">
  <button class="nav-btn active" data-view="[view1]">
    <span class="ni">[emoji]</span>[Label]
  </button>
  <!-- ...altri tab... -->
</nav>
```

### FAB (Floating Action Button)
```html
<button class="fab" id="fabAdd" aria-label="Aggiungi">＋</button>
```

### Modale bottom-sheet
```html
<div class="modal-backdrop hidden" id="modal[X]">
  <div class="modal">
    <div class="modal-header">
      <h2>Titolo</h2>
      <button class="modal-close" id="close[X]">✕</button>
    </div>
    <!-- contenuto -->
  </div>
</div>
```

### Modale centrata (conferme, aiuto)
```html
<div class="modal-backdrop center hidden" id="modal[X]">
  <div class="modal">...</div>
</div>
```

---

## 5. SISTEMA AVVISI MULTIMODALI

### Web Audio API — pattern base
```javascript
let audioCtx = null;
function initAudio(){
  if(!audioCtx) audioCtx = new(window.AudioContext||window.webkitAudioContext)();
}
function playBeep(freq=880, dur=0.35, type='sine'){
  if(!audioCtx) initAudio();
  const vol = settings.volume / 100;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  osc.type = type; osc.frequency.value = freq;
  gain.gain.setValueAtTime(vol, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
  osc.start(audioCtx.currentTime);
  osc.stop(audioCtx.currentTime + dur);
}
// Campana: sequenza armonica
function playCampana(){ [1047,1319,1568].forEach((f,i)=>setTimeout(()=>playBeep(f,0.5),i*350)); }
// Allarme: square wave alternato
function playAllarme(){ for(let i=0;i<4;i++){ setTimeout(()=>playBeep(1100,0.18,'square'),i*400); setTimeout(()=>playBeep(880,0.18,'square'),i*400+200); } }
```

### Sintesi vocale italiana
```javascript
function speakIt(text){
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'it-IT'; u.rate = 0.9; u.volume = settings.volume / 100;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}
```

### Vibrazione
```javascript
function vibrate(intensity='media'){
  const p = intensity==='alta'?[600,200,600,200,600]:intensity==='bassa'?[200]:[300,150,300];
  if('vibrate' in navigator) navigator.vibrate(p);
}
```

### Alert overlay lampeggiante
```css
#alertOverlay {
  position:fixed; inset:0; z-index:900;
  background:rgba(230,81,0,0.92);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  animation: flashBg 1s infinite alternate;
}
@keyframes flashBg { 0%{background:rgba(230,81,0,0.9);} 100%{background:rgba(198,40,40,0.92);} }
```

---

## 6. COMANDI VOCALI (Web Speech API)

```javascript
function setupVoice(){
  const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SpeechRec) return;
  const recognition = new SpeechRec();
  recognition.lang = 'it-IT';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.onresult = (e) => {
    const cmd = e.results[0][0].transcript.trim().toLowerCase();
    handleVoiceCmd(cmd);
  };
  return recognition;
}
// Pattern comandi italiani:
// /preso|ho preso|assunto/        → azione "confermato"
// /saltato|non preso|non ho preso/→ azione "saltato"
// /annull|errore|sbagliato/       → undo
// /nuov[ao]|aggiungi/             → apri form aggiunta
```

---

## 7. PERSISTENZA LOCALE

```javascript
// Pattern salva/carica con fallback sicuro
function saveData(){
  localStorage.setItem('appname_data', JSON.stringify({medicines, settings}));
  localStorage.setItem('appname_log', JSON.stringify(dailyLog));
}
function loadData(){
  try{
    const d = JSON.parse(localStorage.getItem('appname_data') || '{}');
    if(d.medicines) medicines = d.medicines;
    if(d.settings) settings = {...defaults, ...d.settings};
  }catch(e){ console.warn('Errore caricamento dati', e); }
}
```

---

## 8. SERVICE WORKER — PATTERN CACHE-FIRST

```javascript
const CACHE_NAME = 'appname-v1';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))
  ));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if(e.request.method!=='GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if(cached) return cached;
      return fetch(e.request).then(r => {
        if(r&&r.status===200) caches.open(CACHE_NAME).then(c=>c.put(e.request,r.clone()));
        return r;
      }).catch(()=> e.request.mode==='navigate'?caches.match('./index.html'):undefined);
    })
  );
});
```

---

## 9. TOAST NOTIFICATION (in-app)

```javascript
let toastTimer = null;
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  if(toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2800);
}
```
```css
#toast {
  position:fixed; bottom:85px; left:50%; transform:translateX(-50%) translateY(20px);
  background:#1a1a2e; color:#fff; padding:12px 22px; border-radius:30px;
  opacity:0; transition:opacity .3s,transform .3s; z-index:800;
  pointer-events:none;
}
#toast.show { opacity:1; transform:translateX(-50%) translateY(0); }
```

---

## 10. SEGMENTED CONTROLS (Impostazioni)

```javascript
// Binding generico per controlli a segmenti
function bindSegControl(ctrlId, settingKey, onchange){
  document.getElementById(ctrlId)?.querySelectorAll('.seg-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      settings[settingKey] = btn.dataset.val;
      saveData();
      syncSegControl(ctrlId, settingKey);
      if(onchange) onchange(btn.dataset.val);
    });
  });
}
function syncSegControl(ctrlId, settingKey){
  document.getElementById(ctrlId)?.querySelectorAll('.seg-btn').forEach(b => {
    b.classList.toggle('active', String(b.dataset.val)===String(settings[settingKey]));
  });
}
```

---

## 11. CHECKLIST ACCESSIBILITÀ ANZIANI

- [ ] Font size minimo 20px body (18px label, 24px big, 28px title)
- [ ] Touch target minimo 64×64px
- [ ] Classi font-size scalabili: normale / grande / enorme
- [ ] Modalità alto contrasto
- [ ] Etichette aria-label su tutti i pulsanti icon-only
- [ ] Feedback visivo immediato su ogni azione (toast)
- [ ] Overlay alert a schermo intero con font enorme
- [ ] Conferma prima di azioni distruttive (elimina)
- [ ] Possibilità di annullare l'ultima azione
- [ ] Comandi vocali in italiano
- [ ] Avvisi vocali (sintesi TTS)
- [ ] Vibrazione configurabile
- [ ] Manuale d'uso integrato (modale ?)

---

## 12. APP SVILUPPATE CON QUESTO PATTERN

| App | Versione | Data | Descrizione |
|-----|---------|------|-------------|
| ScriviLibro | v23 | maggio 2026 | PWA scrittura libri con AI (Groq) |
| PrendiPillola | v1 | maggio 2026 | PWA promemoria farmaci per anziani |

---

*Skill mantenuta da: Lazzaro Serva – http://www.graficaesiti.it/*
*Copyright (c) 2026 Lazzaro Serva - Centola — Tutti i diritti riservati*
