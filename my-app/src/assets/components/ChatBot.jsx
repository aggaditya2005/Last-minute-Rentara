import React, { useState, useRef, useEffect } from "react";

export default function FlightChatbot() {
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Welcome to FlyAssist — ask me about flights, fares, or deals!" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => scrollToEnd(), [messages, isTyping]);

  function scrollToEnd() {
    if (messagesEndRef.current) messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }

  async function handleSend(e) {
    e && e.preventDefault();
    const text = input.trim();
    if (!text) return;

    const userMsg = { id: Date.now(), from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);
    setSending(true);

    try {
      // Call the backend API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botReply = data.reply || "Sorry, I couldn't process that request.";

      setMessages((m) => [...m, { id: Date.now() + 1, from: "bot", text: botReply }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages((m) => [...m, {
        id: Date.now() + 1,
        from: "bot",
        text: `Error connecting to server: ${err?.message || 'Please make sure the backend is running on port 5000'}`
      }]);
    } finally {
      setIsTyping(false);
      setSending(false);
    }
  }

  return (
    <div className="flight-page">
      <style>{`
/* ========= Theme CSS (inlined) ========= */
:root { --primary-700: #1976d2; --primary-800: #1565c0; }
body { margin: 0; font-family: 'Poppins', sans-serif; }

.flight-page { min-height: 100vh; background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 50%, #90caf9 100%); padding: 2rem; box-sizing: border-box; }

.flight-container { max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 350px; gap: 2rem; }

/* Chat Card */
.chat-card { background: white; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.08); overflow: hidden; display: flex; flex-direction: column; }
.chat-header { background: linear-gradient(135deg, var(--primary-800) 0%, var(--primary-700) 100%); color: white; padding: 1rem 1.25rem; display:flex; justify-content: space-between; align-items: center; }
.chat-title { margin: 0; font-size: 1.25rem; font-weight: 800; letter-spacing: 0.6px; }
.chat-sub { margin: 0; font-size: 0.9rem; opacity: 0.95; }

.chat-window { padding: 1rem; height: 60vh; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; background: linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.0)); }
.message-row { display:flex; }
.message-row.user { justify-content: flex-end; }
.message-bubble { max-width: 74%; padding: 12px 14px; border-radius: 12px; font-size: 0.95rem; line-height: 1.35; white-space: pre-wrap; }
.message-bubble.user { background: linear-gradient(90deg,#0ea5a6,#06b6d4); color: #07111a; border-bottom-right-radius: 6px; }
.message-bubble.bot { background: #f5f7fa; color: #0d47a1; border-bottom-left-radius: 6px; }
.typing { font-style: italic; color: #546e7a; }

.input-area { display:flex; gap: 0.75rem; padding: 1rem; border-top: 1px solid #eef3fb; background: white; }
.input-field { flex: 1; padding: 0.9rem 1rem; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 1rem; }
.send-button { padding: 0.8rem 1.2rem; background: linear-gradient(135deg, #1565c0 0%, #1976d2 100%); color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; display:flex; align-items:center; gap:0.6rem; }
.send-button:disabled { opacity: 0.6; cursor: not-allowed; }
.spinner { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.3); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg);} }

/* Sidebar */
.flight-updates-sidebar { background: white; border-radius: 12px; box-shadow: 0 8px 30px rgba(0,0,0,0.06); overflow: hidden; display:flex; flex-direction:column; }
.updates-header { background: linear-gradient(135deg, var(--primary-800) 0%, var(--primary-700) 100%); color: white; padding: 1rem; display:flex; justify-content:space-between; align-items:center; }
.updates-list { padding: 0.75rem; max-height: 56vh; overflow-y:auto; display:flex; flex-direction:column; gap:0.75rem; }
.update-card { background: #fff; border-radius:8px; padding:0.75rem; border:1px solid #eef3fb; }
.update-flight-no { font-weight:700; color: var(--primary-700); }
.status-badge { padding:0.25rem 0.6rem; border-radius:10px; font-weight:600; font-size:0.75rem; }
.status-badge.on-time { background:#c8e6c9; color:#2e7d32; }
.status-badge.delayed { background:#ffcdd2; color:#c62828; }

/* Responsive */
@media (max-width: 1100px) { .flight-container { grid-template-columns: 1fr; } .flight-updates-sidebar { width: 100%; } }

/* ========== End inlined theme ========== */
      `}</style>

      <div className="flight-container">
        <div className="chat-card">
          <div className="chat-header">
            <div>
              <h3 className="chat-title">FlyAssist</h3>
              <div className="chat-sub">Your flight-help chatbot</div>
            </div>
            <div style={{ fontSize: "0.9rem", opacity: 0.9 }}>Ask fares • Deals • Policies</div>
          </div>

          <div className="chat-window" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`message-row ${m.from === "user" ? "user" : "bot"}`}>
                <div className={`message-bubble ${m.from === "user" ? "user" : "bot"}`}>{m.text}</div>
              </div>
            ))}

            {isTyping && (
              <div className="message-row bot">
                <div className="message-bubble bot typing">Searching fares and deals...</div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className="input-area" onSubmit={handleSend}>
            <input
              className="input-field"
              placeholder="Ask about flights, e.g. 'Mumbai to Delhi cheapest next week'"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) handleSend(e); }}
              aria-label="Message input"
            />

            <button className="send-button" type="submit" disabled={sending} aria-label="Send message">
              {sending ? <div className="spinner" /> : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" fill="white" /></svg>}
              <span style={{ fontWeight: 700 }}>Send</span>
            </button>
          </form>
        </div>

        <aside className="flight-updates-sidebar">
          <div className="updates-header">
            <h3 style={{ margin: 0 }}>Live Flight Updates</h3>
            <div className="live-indicator">Live</div>
          </div>

          <div className="updates-list">
            <div className="update-card">
              <div className="update-flight-no">AI456 <span className="status-badge on-time" style={{ marginLeft: 8 }}>On Time</span></div>
              <div style={{ fontSize: '0.9rem', color: '#546e7a' }}>IndiGo • DEL ➜ BOM</div>
              <div style={{ marginTop: 6, display: 'flex', gap: 12 }}><div style={{ fontSize: '0.85rem', color: '#78909c' }}>Dep 14:20</div><div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Gate 12</div></div>
            </div>

            <div className="update-card">
              <div className="update-flight-no">QF202 <span className="status-badge delayed" style={{ marginLeft: 8 }}>Delayed</span></div>
              <div style={{ fontSize: '0.9rem', color: '#546e7a' }}>Airways • BOM ➜ DEL</div>
              <div style={{ marginTop: 6, display: 'flex', gap: 12 }}><div style={{ fontSize: '0.85rem', color: '#78909c' }}>New Dep 16:50</div><div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Tarmac Delay</div></div>
            </div>

            <div className="update-card">
              <div className="update-flight-no">6E789 <span className="status-badge on-time" style={{ marginLeft: 8 }}>Boarding</span></div>
              <div style={{ fontSize: '0.9rem', color: '#546e7a' }}>SpiceJet • BLR ➜ DEL</div>
              <div style={{ marginTop: 6, display: 'flex', gap: 12 }}><div style={{ fontSize: '0.85rem', color: '#78909c' }}>Dep 15:05</div><div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Gate 4</div></div>
            </div>
          </div>

          <div style={{ padding: '0.75rem', background: '#f5f7fa', textAlign: 'center' }}>Data refreshed just now</div>
        </aside>
      </div>
    </div>
  );
}