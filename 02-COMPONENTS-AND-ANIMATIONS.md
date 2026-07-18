# Components & Animation Spec

Build these as separate React components, composed in order on the single page. Each section = one component + its own GSAP timeline triggered by ScrollTrigger (except Hero, which animates on mount).

---

## 1. `<Hero />`
**Purpose:** First thing she sees. No button-click gate needed since there's no countdown to build suspense around — go straight into an animated reveal.

- Full-viewport height, centered content
- Background: animated gradient (Tailwind `bg-gradient-to-br` with 2–3 warm/pastel colors) — optionally animate the gradient position slowly with GSAP for a "breathing" effect
- Floating decorative shapes in the background (CSS circles/blobs, low opacity, slow drifting animation via GSAP — `yoyo: true, repeat: -1`)
- Headline: **"Happy Birthday"** in the display font — reveals with an **elastic explosion effect**: split into individual letters, each starts off-screen at a randomized position/rotation (scattered in random directions around its final spot) and flies in to land in place with a bouncy elastic ease (`ease: "elastic.out(1, 0.6)"`), staggered slightly per letter (~0.03-0.05s) so they don't all land at once — the effect should feel like the letters are being flung onto the page and settling with a satisfying bounce
- Below it: **"Ankita 🎉"** in a bigger/bolder treatment, using the same elastic explosion letter reveal, starting slightly after the first line finishes (small delay so it reads as two connected bursts rather than total chaos)
- Small scroll-down indicator at the bottom (bouncing chevron or "scroll for your surprise")
- Optional sticker: a small party/cake/balloon Lottie or GIF sticker positioned near the headline (corner placement, not covering text)

---

## 2. `<Message />`
**Purpose:** The heart of the site — your personal note to her.

- Card-like container, centered, generous padding, soft shadow, rounded corners
- Text content pulled from `03-CONTENT.md`
- Animate the letter in line-by-line as the user scrolls into view: each paragraph/line fades + slides up in sequence (ScrollTrigger with a stagger on child elements)
- Optional nice touch: a decorative quote-mark or small heart icon (SVG, not image) at the top of the card

---

## 3. `<WhyYoureSpecial />` (or rename to fit your message)
**Purpose:** A short list/grid of things that make her great — reasons, inside jokes, qualities. Since there are no photos, represent each point with an emoji or simple SVG icon + short text instead of a picture.

- Grid layout (2 columns on mobile, 3–4 on desktop) of "cards", each with: one emoji/icon, a short bold title, one line of text
- Cards animate in with a stagger as the section scrolls into view (fade + slight scale-up, staggered by ~0.1s per card)
- Optional: subtle hover animation (scale 1.05, shadow increase) for desktop users

---

## 4. `<SecretLetter />`
**Purpose:** A hidden bonus surprise — a second, more private letter she has to "unlock" to read. Placed after the public grid section and before the Finale.

- Starts in a **locked state**: a centered card showing a lock/envelope icon (SVG, gentle idle wiggle/glow to draw attention) and a short teaser line, e.g. *"There's something just for you..."* with a **"Tap to Unlock"** button
- On tap: play a short "unlock" animation — the lock icon rotates/shakes then springs open (GSAP, `ease: "elastic.out(1, 0.5)"` works well for the pop), the envelope/card flips or expands to reveal the letter content underneath
- Once unlocked, the secret letter text reveals using the **`<TypewriterText />`** component defined in Global Animation Notes below — each character appears in sequence like it's being typed live, with a blinking cursor at the end of the current line
- Once fully typed, either fade the cursor out after ~2 seconds or leave it gently blinking — pick whichever is simpler to implement cleanly
- Content comes from the "Secret Letter" block in `03-CONTENT.md` — keep it visually distinct from the main `<Message />` section (different card style/background tint) so it reads as a separate, more intimate moment
- No need to re-lock once opened — it can stay open for the rest of the session

---

## 5. `<Finale />`
**Purpose:** The big emotional payoff — the "wow" moment.

- Big centered text: **"Happy Birthday, Ankita! 🎂"** — largest text on the page
- Trigger a **confetti burst** using GSAP (animate small colored divs/SVG circles flying outward with randomized trajectories, rotation, and fade-out) when this section scrolls into view — this replaces any need for a photo-based celebration
- Optional: a repeating gentle animation on the text itself (soft pulse/glow)
- A celebratory GIF/Lottie sticker (dancing character, party popper, cake) placed prominently near the headline — this is the section where a sticker earns its spot most
- Small closing line underneath (e.g. "— from [Your Name]") — pull exact wording from `03-CONTENT.md`

---

## Reusable: `<TypewriterText />`
A small reusable component, not a page section — used inside `<SecretLetter />` (and optionally the Hero tagline or Message intro if you want the effect elsewhere too).

- Props: `text` (string), `speed` (ms per character, default ~35-45ms), `onComplete` (optional callback)
- Reveals the given text one character at a time at the given speed — slight randomized variance per character (e.g. ±15ms) makes it feel more human/natural rather than robotic
- Renders a blinking cursor (`|` or a thin vertical bar) immediately after the last revealed character while typing is in progress
- Should only start typing once triggered (either on mount for Hero use, or on an `active`/`start` prop for the SecretLetter unlock use) — not automatically on page load for every instance
- If the text contains multiple lines/paragraphs, type them in sequence with a brief pause (~400ms) between paragraphs rather than typing everything as one continuous stream

## Global Animation Notes
- Use one shared `gsap.registerPlugin(ScrollTrigger)` setup, ideally in a small `useGsapSetup` hook or top-level `App.jsx` effect
- Keep animation durations short (0.4–0.8s) with slight stagger — avoid anything that feels sluggish
- Respect `prefers-reduced-motion` if you want extra polish (optional, not required)
- Test scroll-triggered animations actually re-trigger correctly on mobile scroll (touch scroll behaves differently than desktop wheel scroll — verify with ScrollTrigger's `markers: true` during dev, remove before shipping)
