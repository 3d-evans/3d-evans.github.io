# 3d-evans.github.io

Personal portfolio & demo reel — live at **https://3d-evans.github.io**

Plain HTML/CSS/JS. No build step, no frameworks: what's in this folder is exactly what GitHub Pages serves.

## File structure

```
3d-evans.github.io/
├── index.html              ← all content (text, links, sections)
├── css/
│   └── styles.css          ← all styling. Section 01 = design tokens
├── js/
│   └── main.js             ← timeline scrubber, placeholders, small extras
└── assets/
    ├── images/
    │   ├── profile.jpg      ← YOUR PHOTO (portrait 4:5, ~1200×1500)
    │   ├── reel-poster.jpg  ← still frame shown before the reel plays (16:9)
    │   └── og-cover.jpg     ← link-preview image for LinkedIn/WhatsApp (1200×630)
    ├── video/
    │   └── demo-reel.mp4    ← YOUR REEL (H.264 MP4, 1080p)
    ├── docs/
    │   └── cv.pdf           ← downloadable CV
    └── icons/
        └── favicon.svg      ← browser-tab icon
```

Missing files are handled on purpose: no photo → magenta "missing texture" checker;
no reel → colour bars. They disappear as soon as the real files exist with those exact names.

## Where to edit what

Every editable spot in `index.html` is marked with an `<!-- EDIT: ... -->` comment.

| What | Where |
|---|---|
| Page title / Google description | `<head>` |
| Name, role, one-line pitch | Hero section (`.hero__title`, `.hero__role`, `.hero__lede`) |
| "Available for work" badge | Header `.status` — remove `status--available` to turn it off |
| Reel title bar text | `.player__title` |
| Vimeo / YouTube instead of MP4 | "OPTION B" comment inside `.player__screen` |
| Shot breakdown | `.breakdown__list` — one `<li>` per shot |
| Bio | `.about__bio` |
| Quick facts | `.facts` |
| Software / toolkit | `.outliner` |
| Experience / education | `.keyframes` |
| Email | `.contact__email` (href + text) **and** `data-copy-email` on the Copy button |
| Social links | `.socials` — replace `href="#"` and the `@handle` |

## Styling

- **Colours, fonts, spacing:** `:root` tokens at the top of `styles.css`.
  Changing `--color-accent` re-themes the whole site.
- **Naming:** BEM — `.block`, `.block__element`, `.block--modifier`. JS-driven states use `.is-*`.
- **Timeline length:** `TOTAL_FRAMES` at the top of `main.js`.
- **New section:** copy any `<section class="section ...">`, give it an `id` and a
  `data-keyframe="Name"` — it automatically gets a keyframe on the bottom timeline.

## Publishing & workflow (GitHub Pages)

**How it deploys**
GitHub Pages serves the `main` branch from the repo root. Every push to `main` updates the live site in ~1 minute
(check progress under the repo's **Actions** tab). Settings → Pages should read: *Deploy from a branch* → `main` / `(root)`.

**Everyday loop**
- Edit → preview with the *Live Server* extension (right-click `index.html` → Open with Live Server).
- Source Control → write a message → **Commit** → **Sync Changes**. The live site updates in ~1 minute.

**Editing with Claude**
- In the Claude desktop app, use **Add folder** and pick this repo folder (`3d-evans.github.io`). Claude then edits the files directly on your computer.
- Every change Claude makes shows up as a diff in VS Code's Source Control panel — review it, then commit & push yourself.
  Don't like it? Right-click the file → *Discard Changes*.
- Tip: commit your own work before asking Claude for changes, so each diff only contains Claude's edits.

**Limits to know**
- GitHub rejects files over 100 MB and warns above 50 MB. Keep the reel MP4 small, or host it on Vimeo/YouTube (Option B in `index.html`).
- `.nojekyll` tells GitHub to serve the files as-is (no Jekyll processing). Don't delete it.

## Reel tips

- Keep the MP4 under ~50 MB (H.264, 1080p, ~8–10 Mbps). Bigger → host on Vimeo and use Option B.
- Put your best shot in the first 10 seconds.
