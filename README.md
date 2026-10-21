# CYBERSECURITY DAY: CIPHER CHALLENGE

> “Crack the code. Learn the tip. Stay safe online.”

An interactive, responsive, retro cyber-operations mini-game designed for **Cybersecurity Awareness Month 2026** and live booth events.

---

## 🎯 Game Overview

Players collaborate in **Teams of 3–5** (or solo codebreakers in **Solo Practice Mode**) to decrypt 5 main intercepted cipher transmissions and 1 sudden-death bonus tie-breaker before the mission countdown timer expires. Every correctly decoded transmission unlocks a foundational cybersecurity hygiene directive.

### Challenge Sequence & Source-of-Truth

| Round | Cipher Type | Difficulty | Time Limit | Base Pts | First Team Bonus | Decoded Directive & Tip |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | Caesar Cipher (+3 shift) | Easy | 3 min (180s) | 10 PTS | +5 PTS | **STAY SAFE ONLINE** |
| **02** | Mystery Caesar Shift (Key 1–10) | Hard | 5 min (300s) | 10 PTS | +5 PTS | **NEVER SHARE YOUR PASSWORD** |
| **03** | A1Z26 Number Cipher | Easy | 3 min (180s) | 10 PTS | +5 PTS | **LOCK YOUR SCREEN** |
| **04** | Atbash Mirror Cipher | Hard | 5 min (300s) | 10 PTS | +5 PTS | **THINK BEFORE YOU CLICK** |
| **05** | Pigpen Freemason Cipher | Hard | 5 min (300s) | 10 PTS | +5 PTS | **UPDATE YOUR DEVICES** |
| **BONUS** | Reverse Writing (Tie-Breaker) | Sudden Death | 1 min (60s) | 5 PTS | N/A | **USE A STRONG PASSWORD** |

---

## 🛠 Features

1. **Interactive Cipher Decoding Aids**:
   - **Caesar Slider**: Dynamic live backward shift preview.
   - **Mystery Shift Explorer**: Test shift 1 through 10 against the short 4-letter word (`DTZW` → `YOUR` at shift 5).
   - **A1Z26 Reference Grid**: Number-to-letter index with quick decoder scratchpad.
   - **Atbash Mirror Strip**: Bidirectional alphabet mapping (`A ↔ Z`, `B ↔ Y`).
   - **Pigpen Reference Chart**: Full geometric grid diagrams (Grid 1 without dots, Grid 2 with dots, X-Grid 1 without dots, X-Grid 2 with dots) and interactive glyph inspector.
   - **Reverse Writing Scratchpad**: Real-time mirror typing tool.

2. **Accurate Countdown Timer & Audio FX**:
   - High-precision countdown timers for 180s, 300s, and 60s.
   - Built-in retro Web Audio API synthesizer for key clicks, correct chimes, time warnings, and mission victory fanfare (zero external audio file dependencies).
   - Audio mute toggle preserved in `localStorage`.

3. **Scoring & Leaderboard**:
   - Accurate points calculation (10 pts main, +5 facilitator first-team bonus, 5 pts sudden-death bonus).
   - Session leaderboard with local persistence, ranking by score, completed rounds, and time.
   - Facilitator read-aloud script for announcing winners.
   - Educational **Reality Check** comparing classical Caesar (25 keys) with modern **AES-256** ($2^{256}$ keys).

---

## 🚀 Running the Project

### Development
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Automated Tests
Run unit tests verifying all ciphers, answer validations, and scoring math:
```bash
npm run test
```

### Production Build
```bash
npm run build
```
The compiled static assets will be located in `/dist`.
