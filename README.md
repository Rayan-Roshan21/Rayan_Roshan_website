# Personal Portfolio Website

## 📋 Overview
A professional portfolio website showcasing technical skills, projects, and experience. Built with modern web technologies and featuring an AI-powered voice assistant for interactive exploration of professional background and expertise.

## 🎯 Purpose
This portfolio serves multiple objectives:
- **Professional Presence**: Comprehensive digital representation for recruiters and potential collaborators
- **Technical Demonstration**: Showcase of modern web development practices and AI integration
- **Project Portfolio**: Detailed presentation of technical projects with live demos and source code
- **Easy Contact**: Multiple channels for professional networking and scheduling

## ✨ Key Features

### User Experience
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations**: Framer Motion-powered transitions and micro-interactions
- **Fast Performance**: Vite-optimized build with code splitting and lazy loading
- **Intuitive Navigation**: Clean UI with sidebar menu and smooth page transitions

### Interactive Components
- **AI Voice Agent**: Conversational assistant with voice and text input
  - Real-time voice recognition and synthesis
  - RAG-powered knowledge retrieval
  - Context-aware responses about professional background
- **Experience Timeline**: Interactive horizontal scrolling timeline with visual indicators
- **Project Showcase**: Dynamic carousels with project details and links
- **Calendly Integration**: Direct scheduling for professional meetings
- **Contact Options**: Multiple communication channels with hover effects

### Technical Features
- **Serverless API**: RESTful endpoints for chat, voice, and TTS functionality
- **AI Integration**: OpenAI and Google Generative AI for natural language processing
- **Email Integration**: Contact form with EmailJS
- **Analytics**: Vercel Analytics for visitor insights
- **Health Monitoring**: API health check endpoints

## 💻 Technologies Used

### Frontend Stack
- **React 19**: Modern component architecture with hooks and context
- **Vite 6**: Next-generation frontend tooling with HMR
- **React Router DOM 7**: Client-side routing and navigation
- **Framer Motion 12**: Animation library for smooth transitions
- **Styled Components**: CSS-in-JS for dynamic styling

### Backend & APIs
- **Express.js**: RESTful API server
- **OpenAI API**: GPT models and text-to-speech
- **Google Generative AI**: Alternative LLM integration
- **Multer/Formidable**: File upload handling
- **CORS**: Cross-origin request management

### UI Components & Libraries
- **React Calendly**: Meeting scheduling integration
- **React Responsive Carousel**: Image and content carousels
- **EmailJS Browser**: Client-side email functionality

### Development Tools
- **ESLint 9**: Code quality and consistency enforcement
- **Vercel**: Deployment platform with serverless functions
- **Node.js 18+**: Runtime environment

## 📁 Project Structure

```
Rayan_Roshan_Website/
├── api/                    # Serverless API endpoints
│   ├── chat.js            # Text-based chat endpoint
│   ├── health.js          # Health check endpoint
│   ├── tts.js             # Text-to-speech conversion
│   └── voice.js           # Voice interaction endpoint
├── src/
│   ├── Pages/             # Main page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── About.jsx      # Background & experience
│   │   ├── Projects.jsx   # Project showcase
│   │   └── Contacts.jsx   # Contact information
│   ├── Components/        # Reusable UI components
│   │   ├── Voice agent/   # AI voice assistant with RAG
│   │   ├── Experience_Timeline/  # Career timeline
│   │   ├── Image_carousel/       # Image slideshows
│   │   ├── Sidebar/              # Navigation menu
│   │   ├── Projects_component/   # Project cards
│   │   ├── Contact_Buttons/      # CTA buttons
│   │   └── Calendly_box/         # Meeting scheduler
│   ├── Pages_CSS/         # Page-specific styles
│   ├── assets/            # Images and static files
│   ├── hooks/             # Custom React hooks
│   ├── App.jsx            # Root component with routing
│   ├── main.jsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static public assets
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── eslint.config.js       # ESLint rules
├── vercel.json            # Deployment configuration
└── server.js              # Development server for voice features
```

## 🚀 Setup and Installation

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager
- Git for version control

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rayan-Roshan21/Rayan_Roshan_website.git
   ```

2. **Navigate to the project directory**
   ```bash
   cd Rayan_Roshan_Website
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Set up environment variables** (for AI features)
   Create a `.env` file in the root directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_API_KEY=your_google_api_key
   VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Visit `http://localhost:5173` to view the application

## 🔧 Available Scripts

- `npm run dev` — Start Vite development server with hot module replacement
- `npm run build` — Create optimized production build in `dist/` folder
- `npm run preview` — Preview the production build locally
- `npm run lint` — Run ESLint to check code quality and style
- `npm run voice:dev` — Start Express server for local voice agent development

## 🌐 Deployment

### Vercel (Recommended)

This project is optimized for Vercel deployment:

1. **Connect Repository**
   - Sign up/login to [Vercel](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect the framework settings

2. **Configure Environment Variables**
   - Add all environment variables from `.env` in Vercel dashboard
   - Navigate to Project Settings > Environment Variables

3. **Deploy**
   - Push to `main` branch for automatic deployment
   - Or use `vercel deploy` command via Vercel CLI

### Other Platforms

The project can also be deployed to:
- **Netlify**: Use `npm run build` and deploy the `dist/` folder
- **GitHub Pages**: Configure `vite.config.js` with base path
- **AWS/Azure**: Deploy as static site with serverless functions

## 🎨 Customization Guide

### Personalizing Content

1. **Update Personal Information**
   - Edit name and titles in `src/Components/Name_title/`
   - Modify bio and introduction in `src/Pages/Home.jsx`

2. **Configure Projects**
   - Update project data in `src/Pages/Projects.jsx`
   - Add project images to `src/assets/`
   - Link to live demos and GitHub repositories

3. **Update Experience Timeline**
   - Modify timeline data in `src/Components/Experience_Timeline/`
   - Add or remove career milestones

4. **Configure Contact Options**
   - Update social links in `src/Components/Contact_Buttons/`
   - Configure Calendly link in `src/Components/Calendly_box/`
   - Set up EmailJS credentials for contact form

### Styling Customization

- **Global Theme**: Edit `src/index.css` for colors, fonts, and global styles
- **Page Styles**: Modify files in `src/Pages_CSS/` for page-specific styling
- **Component Styles**: Each component has co-located CSS files

### AI Voice Agent Configuration

- **Knowledge Base**: Update `src/Components/Voice agent/api/RAG/Embeddings/knowledge.json`
- **Embeddings**: Re-generate embeddings when knowledge base changes
- **API Endpoints**: Configure in `api/` folder for serverless deployment

## 📱 Responsive Breakpoints

The website adapts to different screen sizes:
- **Mobile**: 320px - 768px (single column, hamburger menu)
- **Tablet**: 768px - 1024px (adjusted spacing and grid layouts)
- **Laptop**: 1024px - 1920px (optimized desktop experience)
- **Desktop**: 1920px+ (full-width layouts with max constraints)

## 🔒 Security Best Practices

- ✅ Environment variables for all sensitive data
- ✅ No hardcoded API keys or credentials
- ✅ CORS configuration for API security
- ✅ Input validation and sanitization
- ✅ Secure HTTP headers via Vercel configuration
- ✅ Rate limiting on API endpoints (configurable)

## 🤝 Using as a Template

To use this project as your own portfolio:

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/your-portfolio.git
   ```

2. **Remove personal content**
   - Replace images in `src/assets/`
   - Update all text content in components and pages
   - Modify project showcases

3. **Configure your services**
   - Set up your own OpenAI/Google AI accounts
   - Create EmailJS account and templates
   - Configure Calendly link

4. **Deploy your version**
   - Push to your GitHub repository
   - Deploy to Vercel or your preferred platform

## 💡 Technical Highlights for Recruiters

This project showcases proficiency in:

### Frontend Development
- **Modern React**: Functional components, hooks (useState, useEffect, useRef, useMemo), context API
- **Routing**: React Router DOM with nested routes and dynamic navigation
- **State Management**: Local state, custom hooks, and prop drilling optimization
- **Performance**: Code splitting, lazy loading, memoization

### Backend & APIs
- **RESTful Design**: Clean API structure with proper HTTP methods
- **Serverless Functions**: Vercel/Express integration
- **Error Handling**: Comprehensive error boundaries and API error handling
- **Async Operations**: Promises, async/await patterns

### AI/ML Integration
- **RAG Implementation**: Retrieval-Augmented Generation for knowledge base
- **Embeddings**: Vector similarity search for relevant information retrieval
- **LLM Integration**: OpenAI GPT and Google Gemini API usage
- **Voice Processing**: Speech-to-text and text-to-speech implementation

### DevOps & Build Tools
- **Vite Configuration**: Optimized build settings and plugins
- **ESLint**: Code quality enforcement with modern rules
- **Git Workflow**: Clean commit history and branch management
- **CI/CD**: Automated deployments with Vercel

### UI/UX Design
- **Responsive Design**: Mobile-first approach with fluid layouts
- **Accessibility**: Semantic HTML and keyboard navigation
- **Animations**: Framer Motion for smooth, performant animations
- **User Feedback**: Loading states, error messages, success confirmations

## 📞 Support & Contact

For questions about the codebase or technical implementation, please:
- Open an issue in the GitHub repository
- Review existing documentation in `DEPLOYMENT.md` and `VOICE_DEPLOYMENT.md`

---

**Privacy Note**: This README is designed for public viewing and contains no personally identifiable information. All sensitive configuration is managed through environment variables and is not committed to version control.

**Last Updated**: December 2025