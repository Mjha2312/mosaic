# MOSAIC — Reimagine Social

**A frontend-only social interaction experience built for the Frontend Odyssey Hackathon.**

> *"THE INTERNET HAS ENOUGH FEEDS. IT NEEDS BETTER CONVERSATIONS."*

---

## The Problem

Traditional social media turns conversation into performance. Content is created for likes, followers, and algorithmic reach. Real connection gets buried under metrics.

MOSAIC asks: **What if social media measured depth instead of reach?**

## The Solution

MOSAIC turns social media from a **performance space** into a **collaborative space**.

Instead of scrolling an infinite feed, users explore **visual Conversation Maps** — a central prompt with perspectives branching out as connected nodes. Every interaction is a **meaningful exchange**, not a like.

```
Traditional Social Media:
  Content → Feed → Scroll → Like

MOSAIC:
  Prompt → Perspective → Connection → Exchange → Reflection
```

---

## Key Features

### Conversation Map (Core Experience)
A dynamic 2D conversation map sits at the center of MOSAIC. A glowing prompt node anchors the map while perspective nodes radiate outward, connected by SVG paths. Users click to explore, relate, or challenge any perspective.

### Meaningful Exchanges (Not Likes)
Every "Relate" interaction increments a meaningful exchange counter. There are no follower counts, no popularity metrics, no algorithmic feeds. The only score is how many genuine connections you made.

### Challenge Respectfully
A full modal lets users write structured challenges to any perspective — choosing from "Different Experience," "Counterpoint," or "Question." The challenge becomes a new node on the map, connected to the original. No comments buried in threads.

### Circles (Communities)
Small, themed communities built around shared interests: Personal Growth, Creative Minds, Builders, Student Life, Technology, Life Experiments, Perspective Exchange. Users join circles and explore their live mosaics.

### Discover
A search-and-filter interface (not a feed) for finding conversations. Users filter by topic category (Personal Growth, Creativity, Technology, etc.) and sort by exchanges, perspectives, or recency. Search actually filters the data.

### Create a Mosaic
Users create new conversation prompts — choosing the prompt text, description, conversation type (Question, Challenge, Reflection, Shared Goal), and which circle to post it in. New mosaics appear in the selected circle and in Discover.

### Profile & Identity
A participation-first profile showing: perspectives added, meaningful exchanges, circles joined, conversations explored. No followers, no likes, no vanity metrics. Profile name and bio are editable.

### Session Summary
A "Finish Session" button triggers a polished summary modal showing: perspectives explored, meaningful exchanges, new connections, and conversations explored — with reflective copy.

### Session Persistence
Everything persists via `localStorage` — profiles, created conversations, perspectives, joined circles, meaningful exchanges, explored conversations, and session history. The app survives browser refresh.

---

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 |
| Icons | Lucide React |
| Animations | CSS Keyframes + Tailwind Animations |
| Persistence | `localStorage` (no backend) |
| Fonts | Syne, Space Grotesk, Inter (Google Fonts) |

No heavy graph libraries. No backend. No database. Lightweight by design.

---

## Architecture

```
src/
├── components/
│   ├── AmbientBackground.jsx   # Fixed ambient orb background
│   ├── Navbar.jsx              # Desktop sidebar + mobile top/bottom nav
│   ├── Toast.jsx               # Notification toasts
│   ├── EmptyState.jsx          # Reusable empty state
│   ├── PromptCard.jsx          # Clickable conversation card
│   ├── ConversationMap.jsx     # Core map with nodes + SVG connectors
│   ├── NodeCard.jsx            # Individual perspective node
│   ├── NodeSheet.jsx           # Perspective detail bottom sheet
│   ├── ChallengeModal.jsx      # "Challenge Respectfully" modal
│   ├── CreateMosaic.jsx        # Conversation creation form
│   ├── CircleCard.jsx          # Circle/community card
│   ├── CircleView.jsx          # Full circle view with its conversations
│   ├── SessionSummary.jsx      # End-of-session summary modal
│   ├── SplashScreen.jsx        # Loading splash
│   └── Walkthrough.jsx         # Onboarding slides
│
├── pages/
│   ├── Home.jsx                # Hero + featured prompts
│   ├── Discover.jsx            # Search/filter conversations
│   ├── Circles.jsx             # Circles with join/view
│   ├── Create.jsx              # Create new mosaic
│   └── Profile.jsx             # Identity + stats + history
│
├── data/
│   ├── prompts.js              # Prompts, perspective types, initial perspectives
│   ├── circles.js              # Circle definitions
│   └── storageKeys.js          # localStorage key constants + defaults
│
├── hooks/
│   ├── useLocalStorage.js      # Generic localStorage hook
│   └── useMosaicSession.js     # Session tracking (exchanges, connections)
│
├── utils/
│   └── helpers.js              # UID generation, positioning, formatting
│
├── App.jsx                     # Root: state, routing, navigation
├── main.jsx                    # React DOM mount
└── index.css                   # Tailwind + glass components + animations
```

---

## Responsive Design

| Breakpoint | Layout |
|-----------|--------|
| 320–768px | Mobile: compact top header, bottom nav bar, map nodes sized to viewport, bottom sheet modals |
| 768–1024px | Tablet: transitional, 2-column grids |
| 1024–1280px | Desktop: left glass sidebar, spacious map, multi-column layouts |
| 1280px+ | Wide: generous padding, larger prompt cards, full conversation map |

Map nodes use percentage-based positioning (`min(36vw, 200px)`) to remain usable across all sizes.

---

## Accessibility

- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<button>`, `<form>`, `<fieldset>`, `<legend>`
- ARIA attributes: `aria-label`, `aria-pressed`, `aria-current="page"`, `aria-live="polite"`, `aria-expanded`, `role="dialog"`, `role="status"`
- All interactive elements are keyboard-accessible with visible focus rings (`focus-visible` via CSS)
- Modal Escape-to-close behavior on all overlays
- `prefers-reduced-motion` respected globally
- Screen reader labels on all icon-only buttons

---

## Customization (Design Language)

- **Background:** `#070709` midnight abyss
- **Accent palette:** Electric Indigo, Hyper Pink, Cyber Cyan, Acid Lime
- **Glassmorphism:** `backdrop-blur-xl` glass cards and sheets
- **Typography:** Oversized display (Syne), clean grotesk (Space Grotesk), readable body (Inter)
- **Motion:** Float, pop, slide-up, fade-in, drift, shimmer animations

---

## Setup

```bash
npm install
npm run dev        # Start development server
npm run build      # Production build
npm run preview    # Preview production build
```

---

## MOSAIC vs. Traditional Social Media

| Feature | Traditional | MOSAIC |
|---------|------------|--------|
| Core unit | Content post | Conversation prompt |
| Metric | Likes, followers | Meaningful exchanges |
| Structure | Infinite feed | Visual conversation map |
| Interaction | Like / comment | Relate / challenge / add perspective |
| Community | Follower-based groups | Small circles with shared interest |
| Profile | Public popularity | Participation & reflection |
| Creation | Post for engagement | Start a mosaic, invite perspectives |
| Session goal | Maximize engagement | Maximize understanding |

---

## License

Built for the Frontend Odyssey Hackathon — "Reimagine Social."

No likes. No feeds. Just conversations.
