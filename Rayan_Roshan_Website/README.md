# Personal Portfolio Website

A modern, interactive portfolio website built with React and Vite, showcasing professional experience, projects, and technical skills. The site features an AI-powered voice agent for interactive Q&A about the portfolio owner's background.

## 🎯 Overview

This portfolio serves as a comprehensive digital presence for professional networking, job applications, and showcasing technical capabilities. It demonstrates proficiency in modern web development practices, including responsive design, API integration, and AI implementation.

## ✨ Key Features

### Core Pages
- **Home**: Hero section with dynamic introduction and call-to-action buttons
- **About**: Professional background with an interactive experience timeline
- **Projects**: Showcase of technical projects with descriptions and links
- **Contact**: Multiple contact options including Calendly integration for scheduling

### Interactive Components
- **AI Voice Agent**: Interactive voice-enabled assistant that can answer questions about professional background and projects
  - Text and voice input support
  - Text-to-speech responses
  - Knowledge base powered by embeddings and RAG (Retrieval-Augmented Generation)
  - Natural conversation interface
- **Experience Timeline**: Horizontal scrolling timeline with smooth animations
- **Image Carousels**: Dynamic project showcases with responsive navigation
- **Responsive Sidebar**: Mobile-friendly navigation with smooth transitions
- **Contact Integration**: Direct links to professional profiles and Calendly scheduling

## 🛠 Tech Stack

### Frontend
- **React 19**: Modern component architecture with hooks
- **Vite 6**: Lightning-fast build tool and development server
- **React Router DOM**: Client-side routing for single-page application
- **Framer Motion**: Smooth animations and micro-interactions
- **Styled Components**: Dynamic CSS-in-JS styling
- **React Calendly**: Embedded scheduling integration

### Backend & APIs
- **Express.js**: RESTful API endpoints
- **OpenAI API**: Natural language processing and text-to-speech
- **Google Generative AI**: AI-powered responses
- **Multer & Formidable**: File upload handling
- **CORS**: Cross-origin resource sharing configuration

### Development & Deployment
- **ESLint**: Code quality and consistency
- **Vercel**: Production deployment platform
- **Node.js 18+**: Runtime environment

## 📁 Project Structure

```
Rayan_Roshan_Website/
├── api/                    # Serverless API endpoints
│   ├── chat.js             # Text-based chat endpoint (RAG + LLM)
│   ├── health.js           # Health check endpoint
│   ├── tts.js              # Text-to-speech conversion
│   ├── voice.js            # Voice interaction endpoint
│   ├── knowledge.json      # Voice agent knowledge base (embedded chunks)
│   └── utils/rateLimiter.js  # Per-session rate limiting
├── scripts/
│   ├── embedknowledge.js   # Regenerates api/knowledge.json embeddings
│   └── optimize-images.mjs # Image optimization pipeline
├── src/
│   ├── Pages/             # Main page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── About.jsx      # Background & experience
│   │   ├── Projects.jsx   # Project showcase
│   │   └── Contacts.jsx   # Contact information
│   ├── Components/        # Reusable UI components
│   │   ├── VoiceAgent/           # AI voice assistant
│   │   ├── Experience_Timeline/  # Career timeline
│   │   ├── Image_carousel/       # Image slideshows
│   │   ├── Sidebar/              # Navigation menu
│   │   ├── Projects_component/   # Project cards
│   │   └── ContactButtons/       # CTA buttons
│   ├── Pages_CSS/         # Page-specific styles
│   ├── assets/            # Images and static files
│   ├── hooks/             # Custom React hooks
│   ├── App.jsx            # Root component with routing
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static public assets — favicon, robots.txt, sitemap.xml, og-image.png
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── vercel.json            # Deployment configuration
└── server.js              # Development server for voice features
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rayan-Roshan21/Rayan_Roshan_website.git
   cd Rayan_Roshan_Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (if using AI features)
   Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_key_here
   GOOGLE_API_KEY=your_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173` in your browser

### Available Scripts

- `npm run dev` — Start Vite development server with hot reload
- `npm run build` — Create optimized production build
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint for code quality checks
- `npm run voice:dev` — Start Express server for voice agent development
- `npm run embed:knowledge` — Regenerate embeddings in `api/knowledge.json` after editing it (requires `OPENAI_API_KEY`)
- `npm run optimize:images` — Re-run the image optimization pipeline over `src/assets/`

## 🌐 Deployment

This project is configured for seamless deployment on **Vercel**:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy with automatic builds on push to main branch

The `vercel.json` configuration handles:
- API route rewrites
- Static file serving
- Build optimization

## 🎨 Customization Guide

### Updating Content
- **Personal Information**: Edit `src/Pages/Home.jsx`, `src/Pages/About.jsx`, and the nav in `src/Components/Sidebar/`
- **Projects**: Modify the `projects` array and categories in `src/Pages/Projects.jsx`
- **Experience**: Update the `experiences` array in `src/Components/Experience_Timeline/ExperienceTimeline.jsx` — each entry needs a `date` and an `endDate` (`null` for the current role)
- **Contact Methods**: Configure buttons in `src/Components/ContactButtons/`

### Styling
- **Global Styles**: `src/index.css`
- **Page Styles**: `src/Pages_CSS/`
- **Component Styles**: Co-located with each component

### AI Agent Knowledge Base
- Knowledge lives in `api/knowledge.json` as `{ id, text, embedding }` chunks — `id`s must stay unique, since a duplicate silently splits retrieval between copies
- After editing the `text` of any chunk (or adding a new one without an `embedding`), run `npm run embed:knowledge` to regenerate embeddings — the script skips chunks that already have one, so add new chunks without an `embedding` key rather than an empty array
- The system prompt in `api/chat.js` is grounded: it should answer only from retrieved context and say so when context doesn't cover a question, rather than filling gaps

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1920px and above)
- Laptop (1024px - 1920px)
- Tablet (768px - 1024px)
- Mobile (320px - 768px)

## 🔒 Security & Privacy

- No sensitive personal information is exposed in the codebase
- API keys are managed through environment variables
- CORS policies configured for secure API access
- Input validation and sanitization on all endpoints

## 🤝 Contributing

This is a personal portfolio project. If you'd like to use it as a template:
1. Fork the repository
2. Update personal information and content
3. Configure your own API keys and services
4. Deploy to your preferred platform

## 📄 License

This project is for portfolio and demonstration purposes.

## 💡 Highlights for Recruiters

This project demonstrates:
- **Modern React Development**: Hooks, routing, state management
- **API Integration**: RESTful design, async operations
- **AI/ML Implementation**: RAG, embeddings, OpenAI integration
- **Responsive Design**: Mobile-first approach with CSS animations
- **Build Optimization**: Vite configuration, code splitting
- **Deployment Experience**: Vercel serverless functions
- **Code Quality**: ESLint configuration, component architecture
- **UI/UX Design**: Framer Motion animations, intuitive navigation

---

**Note**: This README is designed for public viewing and contains no sensitive personal information. All configuration and credentials are managed through environment variables.
