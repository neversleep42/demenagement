# 🚚 Positive Moving — Landing page

Landing page moderne, animée et responsive pour **Positive Moving**, une entreprise de
déménagement international. Interface en français, conçue avec une direction artistique
soignée (vert forêt + doré, typographies distinctives) et de nombreuses interactions.

> Construite avec **Vite + React**, **Framer Motion** et **Lucide React**.

---

## ✨ Fonctionnalités

- **100 % responsive** — optimisée desktop, tablette et mobile (menu burger, CTA accessible).
- **Animations riches (Framer Motion)** :
  - apparition au scroll (`whileInView`) avec effets échelonnés,
  - compteurs animés (chiffres clés),
  - barre de progression de défilement,
  - boutons magnétiques et cartes en effet *tilt* 3D,
  - hero avec halo, badge de confiance et fond dégradé.
- **Section parcours animée** — un camion descend une route qui se remplit en doré
  au fil du scroll, chaque étape s'allumant à son passage.
- **Témoignages en deux bandeaux défilants** (sens opposés, pause au survol).
- **Footer interactif** — grand titre « POSITIVE MOVING » avec dégradé révélé au curseur.
- **Icônes cohérentes** — Lucide React + logos partenaires en SVG (zéro emoji).
- **Accessibilité & perfs** — HTML sémantique, `prefers-reduced-motion`, images en `lazy`
  avec repli en dégradé si une image échoue.

---

## 🛠️ Stack technique

| Outil | Rôle |
|-------|------|
| [Vite](https://vitejs.dev/) | Build & serveur de dev |
| [React 18](https://react.dev/) | UI (JSX) |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lucide React](https://lucide.dev/) | Icônes |
| CSS natif (variables + `@media`) | Design system & responsive |
| Google Fonts | *Bricolage Grotesque* (titres) + *Plus Jakarta Sans* (texte) |

---

## 📁 Structure du projet

```
.
├── index.html                 # Point d'entrée Vite
├── vite.config.js
├── vercel.json                # Config déploiement Vercel
├── src/
│   ├── main.jsx               # Montage React
│   ├── App.jsx                # Toutes les sections + données (FR)
│   ├── index.css              # Design system & styles
│   ├── ui.jsx                 # Reveal, Stagger, Magnetic, Tilt, Counter, SmartImg
│   ├── BrandLogos.jsx         # Logos partenaires (SVG)
│   └── components/ui/
│       └── hover-text.jsx     # Effet de texte interactif (footer)
└── vanilla/                   # Première version statique HTML/CSS/JS (archive)
```

---

## 🧩 Sections de la page

1. **Header** — navigation sticky, menu burger mobile, CTA « Obtenir un devis ».
2. **Hero** — titre, badge d'avis, sélecteur d'aide, photo + carte flottante.
3. **Partenaires** — bandeau défilant de logos (HubSpot, Dropbox, Square…).
4. **À propos** — visuels + badge « 60 ans » + liste de garanties.
5. **Chiffres clés** — compteurs animés.
6. **Services** — 3 cartes (international, dédouanement, emballage).
7. **Relocalisation d'entreprise** — bandeau vert + image.
8. **Parcours « partenaire de confiance »** — camion animé sur la route.
9. **Témoignages** — deux bandeaux défilants.
10. **FAQ** — accordéon animé.
11. **CTA final** + **Footer** avec texte interactif.

---

## 🚀 Démarrage

Prérequis : **Node.js ≥ 18**.

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev          # http://localhost:5173

# Générer le build de production
npm run build        # → dossier dist/

# Prévisualiser le build de production
npm run preview
```

---

## ☁️ Déploiement sur Vercel

Le projet est prêt à l'emploi (preset **Vite** auto-détecté + `vercel.json`).

**Option A — Tableau de bord**
1. Pousser le code sur GitHub / GitLab / Bitbucket.
2. https://vercel.com → **Add New → Project** → importer le dépôt.
3. Vercel détecte : Framework **Vite**, Build `npm run build`, Output `dist`.
4. **Deploy**.

**Option B — CLI**
```bash
npm i -g vercel
vercel            # préversion
vercel --prod     # production
```

Aucune variable d'environnement n'est requise.

---

## 🎨 Personnalisation

- **Couleurs** : variables CSS en haut de [`src/index.css`](src/index.css) (`--green-700`, `--gold`, `--cream`…).
- **Contenu** : tableaux de données en haut de [`src/App.jsx`](src/App.jsx)
  (`NAV`, `SERVICES`, `STEPS`, `TESTIMONIALS`, `FAQ`…).
- **Images** : actuellement des photos Unsplash (URLs dans `App.jsx`) — remplaçables par vos visuels.
- **Polices** : `<link>` Google Fonts dans [`index.html`](index.html).

---

## 📝 Notes

- `vercel.json` ajoute une réécriture SPA vers `index.html`.
- Le dossier `vanilla/` (version statique initiale) est conservé comme archive et
  exclu du déploiement via `.vercelignore`.

© 2026 Positive Moving — Tous droits réservés.
