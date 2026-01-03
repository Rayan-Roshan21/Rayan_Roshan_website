import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './VoiceAgent.css';

export default function VoiceAgent() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [level, setLevel] = useState(0);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const panelRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const micStreamRef = useRef(null);
  const rafRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const audioElementRef = useRef(null);

  const statusText = useMemo(() => {
    if (speaking) return 'Speaking…';
    if (listening) return 'Listening…';
    return 'Idle';
  }, [listening, speaking]);

  useEffect(() => {
    function onKey(e) {
      // Alt+Space toggles panel
      if (e.altKey && e.code === 'Space') {
        e.preventDefault();
        setOpen((v) => {
          const next = !v;
          if (!next) setListening(false);
          return next;
        });
      }
      // Esc closes panel
      if (e.code === 'Escape') {
        setOpen(false);
        setListening(false);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Greeting on first open
  useEffect(() => {
    if (open && !hasGreeted) {
      setHasGreeted(true);
      const greeting = "Hello! I'm Echo, I'm your voice assistant. How can I help you today?";
      const greetingMsg = { id: Date.now(), role: 'assistant', text: greeting };
      setMessages([greetingMsg]);
      
      // Play greeting first, then start listening
      playTextToSpeech(greeting).then(() => {
        if (open) {
          setListening(true);
        }
      });
    }
  }, [open, hasGreeted]);

  useEffect(() => {
    // Click outside closes the panel
    function onClick(e) {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setOpen(false);
        setListening(false);
      }
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  useEffect(() => {
    if (listening) startMic();
    else stopMic();
    // cleanup when component unmounts
    return () => stopMic();
  }, [listening]);

  async function startMic() {
    try {
      // Avoid re-creating if already active
      if (micStreamRef.current) return;
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      audioCtxRef.current = audioCtx;
      const source = audioCtx.createMediaStreamSource(stream);
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 512;
      analyserRef.current = analyser;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      const loop = () => {
        analyser.getByteFrequencyData(data);
        // Compute a simple average level (0-255)
        let sum = 0;
        for (let i = 0; i < data.length; i++) sum += data[i];
        const avg = sum / data.length;
        // Map to 0-100
        setLevel(Math.min(100, Math.round((avg / 255) * 100)));
        rafRef.current = requestAnimationFrame(loop);
      };
      loop();

      // Setup recorder
      const mime = 'audio/webm;codecs=opus';
      const canUse = MediaRecorder.isTypeSupported ? MediaRecorder.isTypeSupported(mime) : true;
      const recorder = new MediaRecorder(stream, { mimeType: canUse ? mime : undefined });
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        try {
          if (!chunksRef.current.length) return;
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
          chunksRef.current = [];
          await sendAudioBlob(blob);
        } catch (err) {
          console.warn('Upload failed:', err);
        }
      };
      recorder.start();
      recorderRef.current = recorder;
    } catch (err) {
      // If permissions fail, just keep UI in simulated listening mode
      console.warn('Microphone unavailable:', err);
    }
  }

  function stopMic() {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch {}
      audioCtxRef.current = null;
    }
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (recorderRef.current) {
      try { recorderRef.current.stop(); } catch {}
      recorderRef.current = null;
    }
    setLevel(0);
  }

  async function playTextToSpeech(text) {
    try {
      setSpeaking(true);
      const API_BASE = import.meta.env.VITE_VOICE_API_BASE || '/api';
      const res = await fetch(`${API_BASE}/tts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ text })
      });
      
      // Handle rate limiting
      if (res.status === 429) {
        console.warn('TTS rate limited');
        setSpeaking(false);
        return;
      }
      
      if (!res.ok) {
        throw new Error('TTS failed');
      }
      
      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Create or reuse audio element
      if (!audioElementRef.current) {
        audioElementRef.current = new Audio();
      }
      
      const audio = audioElementRef.current;
      audio.src = audioUrl;
      
      return new Promise((resolve, reject) => {
        audio.onended = () => {
          setSpeaking(false);
          URL.revokeObjectURL(audioUrl);
          resolve();
        };
        audio.onerror = (err) => {
          setSpeaking(false);
          URL.revokeObjectURL(audioUrl);
          reject(err);
        };
        audio.play().catch(reject);
      });
    } catch (err) {
      console.error('TTS error:', err);
      setSpeaking(false);
    }
  }

  async function sendAudioBlob(blob) {
    try {
      const API_BASE = import.meta.env.VITE_VOICE_API_BASE || '/api';
      const fd = new FormData();
      fd.append('audio', blob, 'clip.webm');
      const res = await fetch(`${API_BASE}/voice`, {
        method: 'POST',
        body: fd,
        mode: 'cors',
        credentials: 'include',
      });
      
      // Handle rate limiting
      if (res.status === 429) {
        const errorData = await res.json();
        const retryMinutes = Math.ceil(errorData.retryAfter / 60);
        const errorMsg = `⚠️ ${errorData.message} Please try again in ${retryMinutes} minute${retryMinutes > 1 ? 's' : ''}.`;
        setMessages((prev) => [
          ...prev,
          { id: Date.now(), role: 'assistant', text: errorMsg }
        ]);
        setListening(false);
        return;
      }
      
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || 'Upload failed');
      }
      const data = await res.json();
      const transcribedText = (data && data.text) ? String(data.text) : '';
      if (transcribedText) {
        // Add user message
        const userMsg = { id: Date.now(), role: 'user', text: transcribedText };
        setMessages((prev) => [...prev, userMsg]);

        // Get AI response from RAG + LLM
        try {
          const chatRes = await fetch(`${API_BASE}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
              message: transcribedText,
              history: messages
            })
          });
          
          // Handle rate limiting
          if (chatRes.status === 429) {
            const errorData = await chatRes.json();
            const retryMinutes = Math.ceil(errorData.retryAfter / 60);
            const errorMsg = `⚠️ ${errorData.message} Please try again in ${retryMinutes} minute${retryMinutes > 1 ? 's' : ''}.`;
            setMessages((prev) => [
              ...prev,
              { id: Date.now() + 1, role: 'assistant', text: errorMsg }
            ]);
            setListening(false);
            return;
          }
          
          if (!chatRes.ok) {
            throw new Error('Chat failed');
          }
          const chatData = await chatRes.json();
          const aiResponse = chatData.response || '';
          if (aiResponse) {
            // OPTIMIZATION #1: Show text immediately, play TTS in parallel (non-blocking)
            setMessages((prev) => [
              ...prev,
              { id: Date.now() + 1, role: 'assistant', text: aiResponse }
            ]);
            // Play TTS without blocking (fire and forget)
            playTextToSpeech(aiResponse).catch(err => console.error('TTS error:', err));
          }
        } catch (chatErr) {
          console.error('Chat error:', chatErr);
          setMessages((prev) => [
            ...prev,
            { id: Date.now() + 1, role: 'assistant', text: `Error: ${chatErr.message}` }
          ]);
        }
      }
    } catch (err) {
      // Surface errors in the transcript pane for easier debugging
      const id = Date.now();
      setMessages((prev) => [...prev, { id, role: 'assistant', text: `Upload failed: ${err.message}` }]);
      throw err;
    }
  }

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    
    // Client-side validation
    if (text.length > 500) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: 'assistant', text: '⚠️ Message too long. Please keep messages under 500 characters.' }
      ]);
      return;
    }
    
    // Add user message
    const userMsg = { id: Date.now(), role: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Get AI response from RAG + LLM
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
      
      // Handle rate limiting
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
        // OPTIMIZATION #1: Show text immediately, play TTS in parallel (non-blocking)
        setMessages((prev) => [
          ...prev,
          { id: Date.now() + 1, role: 'assistant', text: aiResponse }
        ]);
        // Play TTS without blocking
        playTextToSpeech(aiResponse).catch(err => console.error('TTS error:', err));
      }
    } catch (chatErr) {
      console.error('Chat error:', chatErr);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, role: 'assistant', text: `Error: ${chatErr.message}` }
      ]);
    }
  }

  function handleClear() {
    setMessages([]);
    setListening(false);
  }

  return (
    <div className="va-root" aria-live="polite">
      {/* Floating toggle button */}
      <button
        type="button"
        className={`va-fab ${open ? 'va-fab-active' : ''}`}
        aria-label={open ? 'Close voice agent' : 'Open voice agent'}
        title="Alt+Space to toggle"
        onClick={() => setOpen((v) => {
          const next = !v;
          if (!next) setListening(false);
          return next;
        })}
      >
        <span className="va-fab-icon" aria-hidden="true">{listening ? '🔴' : '🎤'}</span>
      </button>

      {/* Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            className="va-panel"
            role="dialog"
            aria-modal="false"
            aria-label="Voice agent"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          >
          <div className="va-header">
            <div className="va-title">Voice Assistant</div>
            <div className={`va-status ${listening ? 'va-status-on' : ''}`}>{statusText}</div>
          </div>

          <div className="va-controls">
            <button
              type="button"
              className={`va-mic ${listening ? 'va-mic-on' : ''}`}
              aria-pressed={listening}
              aria-label={listening ? 'Stop listening' : 'Start listening'}
              onClick={() => setListening((v) => !v)}
            >
              {listening ? 'Stop' : 'Start'}
            </button>
            <button type="button" className="va-clear" onClick={handleClear} aria-label="Clear conversation">
              Clear
            </button>
            <div className="va-level" aria-hidden={!listening} title="Input level">
              <div className="va-levelbar" style={{ width: `${level}%` }} />
            </div>
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
          </div>

          <form className="va-input" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type instead…"
              aria-label="Type a message"
            />
            <button type="submit" className="va-send" aria-label="Send message">Send</button>
          </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
