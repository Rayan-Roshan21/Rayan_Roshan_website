import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './VoiceAgent.css';

export default function VoiceAgent() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const panelRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    function onKey(e) {
      if (e.altKey && e.code === 'Space') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.code === 'Escape') {
        setOpen(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Greeting on first open
  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true);
      const greeting = "Hi! I'm Rayan's AI assistant. Ask me anything about his experience, projects, or skills!";
      setMessages([{ id: Date.now(), role: 'assistant', text: greeting }]);
    }
  }, [open, hasGreeted]);

  useEffect(() => {
    function onClick(e) {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    if (text.length > 500) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: 'assistant', text: '⚠️ Message too long. Please keep messages under 500 characters.' }
      ]);
      return;
    }

    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const API_BASE = import.meta.env.VITE_VOICE_API_BASE || '/api';
      const chatRes = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          message: text,
          history: messages
        })
      });

      if (chatRes.status === 429) {
        const errorData = await chatRes.json();
        const retryMinutes = Math.ceil(errorData.retryAfter / 60);
        const errorMsg = `⚠️ ${errorData.message} Please try again in ${retryMinutes} minute${retryMinutes > 1 ? 's' : ''}.`;
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: 'assistant', text: errorMsg }
        ]);
        return;
      }

      if (!chatRes.ok) {
        throw new Error('Chat failed');
      }
      const chatData = await chatRes.json();
      const aiResponse = chatData.response || '';
      if (aiResponse) {
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: 'assistant', text: aiResponse }
        ]);
      }
    } catch (chatErr) {
      console.error('Chat error:', chatErr);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', text: `Error: ${chatErr.message}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClear() {
    setMessages([]);
  }

  return (
    <div className="va-root" aria-live="polite">
      {/* Floating toggle button */}
      <button
        type="button"
        className={`va-fab ${open ? 'va-fab-active' : ''}`}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
        title="Alt+Space to toggle"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="va-fab-icon" aria-hidden="true">💬</span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            className="va-panel"
            role="dialog"
            aria-modal="false"
            aria-label="Chat assistant"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          >
            <div className="va-header">
              <div className="va-title">Chat Assistant</div>
              <button
                type="button"
                className="va-clear-btn"
                onClick={handleClear}
                aria-label="Clear conversation"
              >
                Clear
              </button>
            </div>

            <div className="va-messages" role="list">
              {messages.length === 0 ? (
                <div className="va-empty">No messages yet. Try typing below.</div>
              ) : (
                messages.map((m) => (
                  <div key={m.id} role="listitem" className={`va-message va-${m.role}`}>
                    <div className="va-avatar" aria-hidden="true">{m.role === 'assistant' ? '🤖' : '😀'}</div>
                    <div className="va-text">{m.text}</div>
                  </div>
                ))
              )}
              {isLoading && (
                <div className="va-message va-assistant" role="listitem">
                  <div className="va-avatar" aria-hidden="true">🤖</div>
                  <div className="va-text va-typing">
                    <span className="va-dot"></span>
                    <span className="va-dot"></span>
                    <span className="va-dot"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="va-input" onSubmit={handleSend}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything…"
                aria-label="Type a message"
                disabled={isLoading}
              />
              <button type="submit" className="va-send" aria-label="Send message" disabled={isLoading}>Send</button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
