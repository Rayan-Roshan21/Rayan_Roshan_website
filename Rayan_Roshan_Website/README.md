# Rayan Roshan — Portfolio Website

React + Vite single-page site showcasing Rayan Roshan’s background, projects, and contact options.

## Features
- Hero, About, Projects, and Contact sections wired via React Router.
- Experience timeline with smooth horizontal scrolling and present marker.
- Responsive layouts, carousels, and Calendly/CTA buttons for quick outreach.
- Styled with custom CSS plus Framer Motion micro-interactions.

## Tech Stack
- React 19, Vite 6
- Framer Motion, React Router
- Emotion / Styled Components where needed for styling helpers

## Getting Started
1) Install dependencies
```bash
npm install
```
2) Run the dev server
```bash
npm run dev
```
3) Build for production
```bash
npm run build
```
4) Preview the production build
```bash
npm run preview
```

## Project Structure
```
src/
	main.jsx          # App entry
	App.jsx           # Routes and layout
	Pages/            # Home, About, Projects, Contacts
	Components/       # Reusable UI (timeline, carousels, sidebar, contact buttons)
	Pages_CSS/        # Page-level styles
	assets/           # Images and media
```

## Linting
```bash
npm run lint
```

## Notes
- Requires Node 18+.
- Update content in `src/Pages` and `src/Components` to personalize sections.
