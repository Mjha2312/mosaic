# ◈ MOSAIC — Reimagining Social Interaction

> **The internet has enough feeds. It needs better conversations.**

MOSAIC is a frontend-only social experience designed around **meaningful conversations instead of endless scrolling**.

Rather than feeds, likes, followers, and popularity metrics, MOSAIC brings people together in small interactive **conversation circles** built around questions, experiences, and shared challenges.

Users don't scroll through content.

**They explore perspectives, connect ideas, and contribute to a shared mosaic.**

---

## ✦ Hackathon

### Frontend Odyssey Hackathon

**Challenge:** Reimagine Social — Think Beyond the Conventional Feed.

MOSAIC was built to challenge the traditional social media model and explore a more intentional way of connecting online.

### The Problem

Most social platforms are built around:

- Infinite feeds
- Likes and engagement metrics
- Follower counts
- Algorithmic recommendations
- Passive content consumption

Over time, social interaction can become repetitive and performative.

### Our Approach

MOSAIC replaces the conventional feed with a **Conversation Map**.

Instead of asking:

> "How popular is this?"

MOSAIC asks:

> **"What perspective can I discover from this?"**

---

# ◈ What is MOSAIC?

MOSAIC is a collaborative social space where users gather around a **prompt** and build a visual map of perspectives.

Each contribution becomes a piece of the mosaic.

Different perspectives are represented as connected nodes, allowing users to discover how experiences and ideas relate to one another.

### Core Philosophy

**Less scrolling.  
More exploring.  
Less performance.  
More perspective.**

---

# ✦ How It Works

## 01 — Discover a Prompt

Users begin with a selection of conversation prompts.

Examples:

- **What helped you get through a difficult week?**
- **Show one tiny thing that made you curious today.**
- **Is failure necessary for personal success?**

Instead of browsing an algorithmic feed, users choose a conversation they genuinely want to explore.

---

## 02 — Explore the Conversation Map

This is the core MOSAIC experience.

The selected prompt becomes the **center node**, surrounded by different user perspectives.

Each contribution appears as a connected node with its own perspective type:

- 🟣 Personal Experience
- 🔵 Different Opinion
- 🟢 Questioning
- 🟡 Shared Goal

The result is a visual representation of a conversation rather than a chronological list of posts.

---

## 03 — Create Meaningful Exchanges

Users can interact with perspectives instead of simply liking them.

### Relate

When a user genuinely connects with someone's experience, they can choose:

**Relate (+1 Exchange)**

This contributes to the session's meaningful exchange count.

### Challenge Respectfully

Users can also engage with an idea they see differently through:

**Challenge Respectfully**

The focus is on exchanging perspectives rather than maximizing engagement.

---

## 04 — Add Your Perspective

Users can contribute their own thought directly to the conversation map.

Their contribution becomes a new node within the mosaic, dynamically expanding the conversation.

---

## 05 — End With Reflection

At the end of a session, MOSAIC summarizes the user's experience.

Instead of showing likes or follower growth, users see meaningful activity such as:

> **5 Perspectives Explored**  
> **3 Meaningful Exchanges Made**

The goal isn't to spend more time online.

**It's to make the time meaningful.**

---

# ✦ Why MOSAIC Is Different

| Traditional Social Media | MOSAIC |
|---|---|
| Infinite feeds | Conversation maps |
| Likes | Meaningful exchanges |
| Follower counts | Shared perspectives |
| Popularity metrics | Personal exploration |
| Algorithmic recommendations | User-selected prompts |
| Passive scrolling | Active participation |
| Comment sections | Perspective nodes |
| Content performance | Conversation quality |

MOSAIC intentionally avoids becoming another:

**Instagram / Snapchat / Reddit / X clone.**

---

# ◈ Key Features

### Interactive Conversation Map
A lightweight 2D visual graph replaces the traditional social feed.

### Meaningful Exchange System
Interactions focus on relating to and respectfully challenging perspectives.

### Dynamic Contributions
New perspectives are instantly added to the conversation map.

### Session Tracking
MOSAIC tracks meaningful exchanges during the user's session.

### Session Summary
Users receive a reflection of their participation when they finish.

### Glassmorphism UI
A dark, immersive interface with glowing neon accents and layered glass surfaces.

### Micro-interactions
Animated nodes, glowing states, transitions, particles and interaction feedback make the experience feel alive.

### Responsive Design
Designed to work across desktop and mobile layouts.

### Accessibility
Includes:

- Keyboard-friendly interactions
- Visible focus states
- ARIA labels
- High-contrast UI elements
- Accessible interactive controls

---

# ✦ Design System

MOSAIC uses a futuristic Gen-Z inspired visual language.

### Visual Direction

- Deep midnight backgrounds
- Glassmorphism
- Large typography
- Rounded interfaces
- Neon gradients
- Ambient glow effects
- Floating visual elements
- Minimal traditional UI

### Accent Palette

**Electric Indigo**  
`#6366F1`

**Hyper Pink**  
`#EC4899`

**Cyber Cyan**  
`#22D3EE`

**Acid Lime**  
`#A3E635`

**Midnight**  
`#070709`

---

# ◈ Tech Stack

### Frontend

- React
- JavaScript
- Tailwind CSS

### UI & Animation

- Lucide React
- Framer Motion / CSS Animations

### Data

- Static mock JSON
- React state
- LocalStorage

### Architecture

**100% Frontend**

No backend or database is required.

---

# ✦ Architecture

```text
MOSAIC
│
├── Prompt Discovery
│      │
│      └── Select Conversation
│
├── Conversation Map
│      │
│      ├── Central Prompt
│      ├── Perspective Nodes
│      ├── Connection Paths
│      ├── Node Details
│      └── Add Perspective
│
├── Meaningful Exchange
│      │
│      ├── Relate
│      └── Challenge Respectfully
│
└── Session Summary
       │
       ├── Perspectives Explored
       └── Meaningful Exchanges
