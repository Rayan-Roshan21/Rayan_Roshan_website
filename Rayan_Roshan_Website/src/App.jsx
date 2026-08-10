import { BrowserRouter as Router, useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Analytics } from "@vercel/analytics/react";
import Home from './Pages/Home';
import About from './Pages/About';
import Contacts from './Pages/Contacts';
import Projects from './Pages/Projects';
import VoiceAgent from './Components/Voice agent/VoiceAgent';
import { PageTransitionProvider } from './context/PageTransitionContext';

function AnimatedRoutes() {
  const location = useLocation();

  // mode="popLayout" rather than "wait": the outgoing page leaves
  // immediately instead of holding the incoming one back for the
  // length of its exit animation.
  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
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
