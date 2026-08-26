import { BrowserRouter as Router, useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react";
import Home from './Pages/Home';
import About from './Pages/About';
import Contacts from './Pages/Contacts';
import Projects from './Pages/Projects';
import VoiceAgent from './Components/VoiceAgent/VoiceAgent';
import { PageTransitionProvider } from './context/PageTransitionContext';

function AnimatedRoutes() {
  const location = useLocation();

  // Keyed on the top-level segment, not the full pathname. About's
  // sections are sub-routes (/about/skills, /about/experience), and
  // keying on the full path would tear down and rebuild the whole
  // page — tab bar included — every time the user changed section.
  // Sharing a key lets the shell stay put while only its content
  // swaps, which is also what makes the tab bar's sticky position
  // survive the change.
  const routeKey = location.pathname.split('/')[1] || 'index';

  // mode="popLayout" rather than "wait": the outgoing page leaves
  // immediately instead of holding the incoming one back for the
  // length of its exit animation.
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <Routes location={location} key={routeKey}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/about/:section" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contacts />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <PageTransitionProvider>
        <AnimatedRoutes />
        <VoiceAgent />
        <Analytics />
      </PageTransitionProvider>
    </Router>
  );
}
