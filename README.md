# PrendiPillola — Promemoria Farmaci (PWA)

---

## Autore / Copyright

**Lazzaro Serva / Produzione Software**
Via Tasso, 28 – 84051 CENTOLA (SA) – Italia
🌐 [www.graficaesiti.it](http://www.graficaesiti.it/)

Copyright (c) 2026 Lazzaro Serva - Centola
Tutti i diritti riservati — vedi file [LICENSE](LICENSE)

---

## Informazioni sul progetto

| Campo       | Valore                  |
|-------------|-------------------------|
| Nome        | PrendiPillola           |
| Versione    | v1                      |
| Produzione  | maggio 2026             |
| Tipologia   | PWA (Progressive Web App) |
| Linguaggio  | HTML5 · CSS3 · JavaScript |
| Target      | Persone anziane / bassa visibilità |

---

## Descrizione

**PrendiPillola** è una Progressive Web App progettata per aiutare le persone anziane a ricordare l'assunzione dei farmaci quotidiani. L'interfaccia è semplificata al massimo, con caratteri grandi, pulsanti ampi e avvisi multimodali.

### Funzionalità principali

- 📅 **Scheda Oggi** — mostra tutti i farmaci del giorno con orario e stato
- 💊 **Gestione farmaci** — aggiungi, modifica, elimina qualsiasi tipo di farmaco
- 🔔 **Avvisi multipli** — sonoro, visivo (lampeggiante), vibrazione e vocale
- 🎚️ **Intensità regolabile** — bassa, media o alta per tutti i tipi di avviso
- 🎙️ **Comandi vocali** — "Preso", "Saltato", "Annulla" senza toccare lo schermo
- 📋 **Storico 14 giorni** — registro completo delle assunzioni
- 🔠 **Font scalabile** — 3 dimensioni di testo per ipovedenti
- 👁️ **Alto contrasto** — modalità ad alta leggibilità
- 📴 **Offline** — funziona senza connessione Internet (Service Worker)
- 📱 **Installabile** — come app nativa su Android, iPhone, desktop

### Tipi di farmaco supportati

Compressa/pillola, gocce, sciroppo, spray, inalatore/aerosol, cerotto, iniezione, supposta, crema/unguento, collirio, bustina/polvere, altro.

---

## Struttura repository

```
prendipillola/
├── index.html          # App principale (HTML + CSS + JS)
├── manifest.json       # Configurazione PWA
├── service-worker.js   # Cache offline
├── assets/
│   ├── icon-192.png    # Icona app 192×192
│   └── icon-512.png    # Icona app 512×512
├── LICENSE             # Copyright
├── AUTHORS             # Informazioni autore
├── README.md           # Questo file
└── CHANGELOG           # Storico versioni
```

---

## Installazione / Uso

1. Clona o scarica il repository
2. Apri `index.html` con un browser moderno
3. Per le funzionalità PWA complete (Service Worker, installazione, notifiche):
   - Pubblica su un server HTTPS
   - Oppure usa `npx serve .` in locale

### GitHub Pages (distribuzione rapida)
```
Settings → Pages → Source: main branch → /root
```
L'app sarà disponibile su `https://[username].github.io/prendipillola/`

---

## Comandi vocali

| Comando | Azione |
|---------|--------|
| "Preso" / "Ho preso" | Segna il farmaco più vicino come assunto |
| "Saltato" / "Non preso" | Segna come non assunto |
| "Annulla" / "Errore" | Annulla l'ultima azione |

---

## Protezione copyright

- File `LICENSE` con tutti i diritti riservati
- Intestazione copyright in ogni file sorgente
- File `AUTHORS` con dati autore completi
- `manifest.json` con campo `author`
- Nota copyright nel footer della schermata Impostazioni

---

## Compatibilità browser

| Browser | Supporto |
|---------|----------|
| Chrome / Edge 90+ | ✅ Completo |
| Safari iOS 15+ | ✅ Completo |
| Firefox 90+ | ✅ Parziale (no installazione PWA) |
| Samsung Internet | ✅ Completo |

---

*PrendiPillola v1 — Produzione maggio 2026 — http://www.graficaesiti.it/*
