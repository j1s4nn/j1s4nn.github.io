# j1s4nn.github.io

Personal academic website of **Md Jisan Hossen** — AI Undergraduate Researcher at
Nanjing University of Information Science & Technology (NUIST), China.

Live at: https://j1s4nn.github.io

## Structure

```
.
├── index.html              # Single-page academic homepage
├── assets/
│   ├── css/style.css       # Styling (modern-academic visual system)
│   ├── js/main.js          # Scroll progress, reveal, counters, tilt
│   ├── js/i18n.js          # EN / 中文 toggle (data-i18n dictionary)
│   └── images/jisan.jpg    # Profile photo
├── .nojekyll               # Serve as a plain static site (no Jekyll)
└── README.md
```

## Featured

- **Preprint (Zenodo, 2026):** *JevGAG + DDAG — Regime-Aware Adaptive Temporal Granularity for
  Causal Video World Models: When Does Adaptivity Pay?* —
  DOI [10.5281/zenodo.23693517](https://doi.org/10.5281/zenodo.23693517).
  Code and artifacts: [JevGAG](https://github.com/j1s4nn/JevGAG).
  Project page: <https://j1s4nn.github.io/JevGAG/>.
- **Preprint (Zenodo, 2026):** *Jev-Routed Temporal Granularity with Recovery and Hysteresis for
  Causal Video Generation* — DOI [10.5281/zenodo.23395414](https://doi.org/10.5281/zenodo.23395414).
  Code and replication artifact: [jev-adaptive-granularity-WM](https://github.com/j1s4nn/jev-adaptive-granularity-WM).
  Project page: <https://j1s4nn.github.io/jev-adaptive-granularity-WM/>.

## Sections

About · Stats · Highlights · Research Interests · Publications & Research Projects · Projects ·
Education · Skills · Contact

## Bilingual (EN / 中文)

A language button in the navigation toggles the whole page between English and Simplified Chinese.
Translations live in `assets/js/i18n.js` as a `data-i18n` key dictionary; proper nouns (name, NUIST,
tool names, DOIs, paper titles, metric values) are intentionally kept in English. The choice is
persisted in `localStorage`, and the English text is captured at load so switching back is exact.

## Local preview

```bash
python -m http.server 8080
# open http://localhost:8080
```

## Deployment

Pushed to the `main` branch; GitHub Pages serves `index.html` from the repository
root (Settings → Pages → Source: Deploy from a branch → `main` / root).

---

© 2026 Md Jisan Hossen
