# Build Prompts — Run In Order

Paste these into Antigravity **one at a time, in sequence**. Wait for each phase to finish and check the result before moving to the next — this keeps the agent focused and makes it easy to catch issues early instead of debugging one giant generation.

Make sure `01-PROJECT-SPEC.md`, `02-COMPONENTS-AND-ANIMATIONS.md`, and `03-CONTENT.md` (filled in) are in the project root before you start Phase 0.

---

## Phase 0 — Project Setup
```
Read 01-PROJECT-SPEC.md, 02-COMPONENTS-AND-ANIMATIONS.md, and 03-CONTENT.md in this project.

Set up a new Vite + React project with Tailwind CSS configured, and install gsap and lottie-react as dependencies. Create the folder structure: /src/components (one file per component from 02-COMPONENTS-AND-ANIMATIONS.md), /public/stickers (empty, for GIF/sticker assets I'll add later). Set up the Google Fonts links for a display font (Playfair Display) and a body font (Inter or similar) in index.html. Create an empty App.jsx that will import and stack the components in order. Do not build any component content yet — just the scaffold.
```

---

## Phase 1 — Hero Section
```
Build the <Hero /> component as specified in 02-COMPONENTS-AND-ANIMATIONS.md, using the Hero copy from 03-CONTENT.md. Full-viewport, animated gradient background, staggered text entrance animation on mount using GSAP, floating decorative CSS/SVG shapes in the background, and a scroll-down indicator. Leave a clearly marked spot (with a code comment) where a sticker/GIF can be dropped in later — don't reference an actual file yet since /public/stickers is still empty.
```

---

## Phase 2 — Message Section
```
Build the <Message /> component as specified in 02-COMPONENTS-AND-ANIMATIONS.md, using the letter content from 03-CONTENT.md. Card-style container, each paragraph animates in on scroll (GSAP ScrollTrigger, staggered fade + slide up). Make sure line breaks in the content map to separate animated elements, not one solid block.
```

---

## Phase 3 — Why You're Special Grid
```
Build the grid section from 02-COMPONENTS-AND-ANIMATIONS.md using the card list in 03-CONTENT.md. Responsive grid (2 columns mobile, 3-4 desktop), each card animates in with a staggered fade + scale on scroll via ScrollTrigger, subtle hover lift effect on desktop.
```

---

## Phase 4 — Finale Section
```
Build the <Finale /> component as specified in 02-COMPONENTS-AND-ANIMATIONS.md, using the finale copy from 03-CONTENT.md. Big centered headline, GSAP-built confetti burst (animated divs/SVG shapes flying outward with randomized trajectory/rotation/fade) triggered when the section scrolls into view, gentle repeating pulse/glow on the headline text. Leave a marked spot for a sticker/GIF here too.
```

---

## Phase 5 — Add GIFs/Stickers
*(Before running this: download 2-4 birthday-themed Lottie JSON files from lottiefiles.com's free section, or GIF/PNG stickers from a free source, and drop them into `/public/stickers/`. Then tell the agent what you added.)*
```
I've added the following sticker files to /public/stickers: [list the filenames you added]. 

Integrate them into the marked sticker spots in Hero.jsx and Finale.jsx — use lottie-react's <Lottie /> component for .json files, or a plain <img> for .gif/.png files. Size them so they accent the section without overlapping or obscuring the main text. Add a subtle floating/looping idle animation via GSAP if the sticker itself is static.
```

---

## Phase 6 — Responsive & Polish Pass
```
Do a full responsive pass across the whole page at 360px, 768px, and 1280px widths. Fix any overflow, text sizing, or spacing issues. Double-check every GSAP ScrollTrigger animation actually re-triggers correctly on mobile touch scroll, not just desktop wheel scroll. Remove any leftover dev-only code like ScrollTrigger markers or console.logs. Confirm there are no broken image/sticker references anywhere.
```

---

## Phase 7 — Build & Deploy
```
Run a production build and fix any build errors or warnings. Once it builds cleanly, prepare it for deployment to Vercel (or Netlify) — confirm the output directory and build command are correct for a Vite project.
```

After Phase 7, deploy via the Vercel/Netlify dashboard (drag-and-drop the build output, or connect the repo) and grab the live URL to send to Ankita.

---
---

# Enhancement Phases — Run After Phase 7 (or before, your call)

These take the site from "done" to "wow." Run them in order, check each result, then **re-run Phase 7 (build & deploy) at the end** to push the final polished version live.

---

## Phase 8 — Ambient Atmosphere & Depth
```
Enhance the overall page feel with three additions:

1. Custom cursor trail (desktop only — detect touch devices with a media query or pointer check and skip this entirely on mobile/touch): a small trail of sparkle or heart-shaped particles that follow the mouse cursor as it moves, fading out after a fraction of a second. Implement with GSAP, using a pooled set of small divs/SVGs rather than creating new DOM elements on every mousemove event, to keep it performant.

2. A full-page ambient background layer: subtle floating sparkles/dots/particles that drift slowly across the ENTIRE page (not just the Hero section), sitting behind all content (low z-index, low opacity, pointer-events: none so it never blocks clicks/scroll). This should read as a continuous atmosphere as the user scrolls through every section, not something that resets per-section.

3. Parallax depth on scroll: using GSAP ScrollTrigger with `scrub`, make background decorative elements (blobs, shapes, the ambient particle layer) move at a different speed than the foreground content as the user scrolls, so the page feels layered rather than flat. Keep the effect subtle — this should feel elegant, not dizzying.

Also smooth out the background color transitions BETWEEN sections: instead of hard cuts where one section's background ends and the next begins, blend the gradient colors so scrolling from one section to the next feels like a continuous color journey.
```

---

## Phase 9 — Opening Interaction & Music
```
Upgrade the opening interaction and add audio:

1. Replace the current "Tap to Open" button interaction with a more tactile animated opening moment — e.g. an animated gift box or envelope (built in SVG) that visually opens (lid rotates open / envelope flap lifts and a card slides out) when tapped, using a GSAP timeline, BEFORE revealing the Hero headline. This should feel like actually opening a gift, not just clicking a button that fades away. Keep it under 2 seconds so it doesn't feel slow on repeat visits.

2. Add a floating background music toggle button (fixed position, e.g. bottom-right, small circular button with a music note icon). It should default to OFF/muted (do not autoplay audio — browsers block it anyway and it can feel jarring). Show a subtle pulse/glow animation on the button to invite the user to tap it. When tapped, play a soft looping background track and swap the icon to a "playing" state; tapping again pauses it. Use an HTML5 `<audio>` element with a placeholder file path at `/public/audio/background-music.mp3` — I'll add the actual file myself.
```

---

## Phase 10 — Stickers Expansion & Signature Finale
```
Two additions:

1. Expand sticker/GIF usage beyond just Hero and Finale. Add 1-2 well-placed stickers (from /public/stickers, using the same Lottie/img approach as before) near the Message section and the Why-You're-Special grid — small, corner-placed, accenting rather than dominating the content. If more sticker files are needed, leave clearly marked placeholder spots with code comments describing what kind of sticker would fit (e.g. "// spot for a small heart or sparkle sticker") rather than guessing a filename that doesn't exist.

2. On the Finale section, add an animated "signature" detail: render the sign-off text (e.g. "— from [Name]") as an SVG path in a cursive/script style, animated to draw itself in on scroll using a stroke-dasharray/stroke-dashoffset GSAP animation (like a pen signing it live), triggered once when the Finale section scrolls into view. If a full cursive SVG signature is too complex to generate reliably, fall back to the sign-off text fading/typing in character-by-character with a small pen/sparkle icon animating alongside it — the key effect is that it feels handwritten and personal, not just another fade-in.
```

---

## Phase 11 — Typewriter Text & Secret Letter Section
*(Before running this: fill in the "Secret Letter" block in 03-CONTENT.md with real, more personal text — don't leave it as placeholder brackets.)*
```
Read the updated 02-COMPONENTS-AND-ANIMATIONS.md and 03-CONTENT.md — a new <TypewriterText /> reusable component and a new <SecretLetter /> section have been added.

1. Build <TypewriterText /> as a standalone reusable component per its spec in 02-COMPONENTS-AND-ANIMATIONS.md: reveals given text character-by-character with slight randomized timing per character, blinking cursor while typing, paragraph-aware pausing, and a controllable start trigger (not auto-start on mount by default).

2. Build the <SecretLetter /> component per its spec: locked state with an idle-animated lock/envelope icon and "Tap to Unlock" button, an elastic unlock animation on tap that reveals the card content, and the secret letter text (from 03-CONTENT.md) rendered via <TypewriterText />, only starting to type once the unlock animation completes.

3. Insert <SecretLetter /> into App.jsx between the Why-You're-Special grid and the Finale section, matching the existing section spacing/rhythm.

Keep the visual style (colors, card treatment) distinct from the main <Message /> card so it reads as a separate, more intimate moment — don't just duplicate the Message card styling.
```

---

## Phase 12 — Elastic Explosion Hero Text
```
Upgrade the Hero headline animation ("Happy Birthday" and "Ankita 🎉") to an elastic explosion letter reveal, per the updated spec in 02-COMPONENTS-AND-ANIMATIONS.md.

Split each line into individual letter spans (wrap each character in its own <span>, preserve spaces correctly so words don't collapse together). For each letter:
- Set a random starting position offset (e.g. randomized x/y within a few hundred pixels, in a random direction from its final resting spot) and a random starting rotation (e.g. -180deg to 180deg) using GSAP's random utility or Math.random.
- Animate from that scattered starting state to its natural in-line position/rotation using ease: "elastic.out(1, 0.6)", so each letter bounces slightly as it settles.
- Stagger the letters by roughly 0.03-0.05s each so they arrive in a cascading burst rather than all landing simultaneously.

Run "Happy Birthday" first, then start "Ankita 🎉" shortly after (small delay, e.g. 0.3-0.4s after the first line's stagger completes) so it reads as two connected bursts.

Keep this to a one-time entrance animation on mount (not scroll-triggered, not repeating). Make sure it performs well on mobile — test that having this many individually-animated letter spans doesn't cause jank on a mid-range phone; if performance is a concern, consider using GSAP's `force3D` and `will-change: transform` on the letter spans.
```

---

## Final Step — Rebuild & Redeploy
```
Run a fresh production build, fix any errors, and redeploy to Vercel/Netlify so the live URL reflects all the Phase 8-12 enhancements. Do one more responsive check at 360px, 768px, and 1280px to make sure the new cursor trail, ambient layer, opening animation, signature effect, typewriter text, Secret Letter unlock interaction, and elastic explosion Hero text all behave correctly on mobile (especially confirming the cursor trail is properly disabled on touch devices, the SecretLetter unlock works on tap not just click, the typewriter timing doesn't feel sluggish on slower devices, and the letter-explosion animation doesn't cause jank on a mid-range phone).
```
