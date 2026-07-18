# Project: Ankita's Birthday Surprise Website

## Goal
A single-page, beautifully animated birthday website built as a personal gift for a friend named **Ankita**. She should feel genuinely surprised and delighted opening this link today, on her birthday.

## Tech Stack
- **React** (Vite recommended for fast setup — no Next.js needed, this is a single static page)
- **Tailwind CSS** for styling
- **GSAP** (+ ScrollTrigger plugin) for animations
- No backend, no database, no CMS — fully static, deployable to Vercel/Netlify in one step

## Hard Constraints
- **No personal photos of Ankita.** Do not scaffold logic expecting uploaded personal pictures.
- **GIFs and stickers ARE allowed and encouraged** — birthday-themed, celebratory (confetti gifs, dancing characters, cake/balloon stickers, sparkle animations). Source them as:
  - Lottie animations via `lottie-react` (crisp, scalable, lightweight — preferred over raster GIFs for performance) from lottiefiles.com's free library
  - Or downloaded `.gif`/`.png` sticker assets placed in `/public/stickers/` (you download and drop these in manually before build; the agent should reference them by path, not fetch them itself)
  - Do not have the agent hotlink GIFs from random third-party URLs — assets should live locally in `/public/`
- **No countdown timer.** Her birthday is TODAY. The site should open directly into celebration mode — no "waiting for midnight" logic anywhere.
- Single page, single scroll — no routing, no multiple pages.
- Mobile-first: she will very likely open this on her phone. Test all breakpoints down to 360px width.
- Keep dependencies minimal: `react`, `tailwindcss`, `gsap`, `lottie-react` (if using Lottie). Avoid pulling in heavy UI libraries.

## Visual Direction
Typography + motion + color as the foundation, with GIFs/stickers layered in as accents (not as the main content — the message and design should still work if a sticker fails to load):
- Large, expressive headline typography as the hero visual
- Soft pastel or warm gradient backgrounds (avoid stark white/black)
- CSS-drawn decorative elements (balloons, confetti particles, sparkles, blobs) PLUS a few well-placed GIFs/stickers for extra charm (e.g. a dancing/celebrating sticker near the Finale, a small cake or party sticker near the Hero)
- One elegant display font (e.g. "Playfair Display" or "Great Vibes" via Google Fonts) for headings + a clean sans-serif for body text

## Deliverable Structure
Build this as one scrollable page composed of the sections defined in `02-COMPONENTS-AND-ANIMATIONS.md`, using the copy provided in `03-CONTENT.md`.

## Definition of Done
- [ ] Loads instantly, no broken image references anywhere
- [ ] Every section has a GSAP entrance animation (fade/slide/scale on scroll into view)
- [ ] Fully responsive on mobile, tablet, desktop
- [ ] A clear "wow" finale moment (confetti/celebration burst) near the end
- [ ] Deployed and reachable via a live URL before sending to Ankita
