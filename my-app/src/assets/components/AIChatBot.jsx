import React, { useState, useEffect, useRef } from 'react';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! 👋 I\'m your AI travel assistant. I can help you with travel planning, recommendations, bookings, and answer any questions you have!',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState('claude');
  const [backendUrl, setBackendUrl] = useState('http://localhost:5000'); // Backend is on 5000, React on 5173
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);

  // Test backend connection on mount
  useEffect(() => {
    const testBackend = async () => {
      try {
        console.log('🔍 Testing backend connection...');
        const response = await fetch(`${backendUrl}/`, { method: 'GET' });
        if (response.ok) {
          console.log('✅ Backend connected successfully!');
        } else {
          console.error('❌ Backend responded but with error:', response.status);
        }
      } catch (error) {
        console.error('❌ Cannot connect to backend:', error.message);
        console.log('💡 Make sure backend is running on:', backendUrl);
      }
    };
    testBackend();
  }, [backendUrl]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Call YOUR backend instead of API directly
  const callBackendAPI = async (userMessage) => {
    try {
      console.log('🔵 Calling Rentara backend...');

      // Prepare conversation history for context
      const conversationMessages = messages
        .filter(m => m.type !== 'system')
        .map(m => ({
          role: m.type === 'user' ? 'user' : 'assistant',
          content: m.text
        }));

      // Add current message
      conversationMessages.push({
        role: 'user',
        content: userMessage
      });

      const response = await fetch(`${backendUrl}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversationMessages,
          provider: selectedProvider,
          systemPrompt: 'You are a helpful travel assistant for Rentara, a travel booking platform. Help users with travel planning, famous places in India, transportation options, booking assistance, and travel tips. Be friendly, concise, and informative. Use emojis where appropriate to make conversations engaging.'
        })
      });

      console.log('📡 Response Status:', response.status);

      if (!response.ok) {
        const error = await response.json();
        console.error('❌ Backend Error:', error);

        if (response.status === 500) {
          return `❌ Server Error: ${error.error || 'Something went wrong on the server'}`;
        }
        if (response.status === 400) {
          return `❌ Bad Request: ${error.error || 'Invalid request'}`;
        }
        return `❌ Error (${response.status}): ${error.error || 'Failed to get response'}`;
      }

      const data = await response.json();
      console.log('✅ Got response from backend!');

      if (data.success) {
        return data.message;
      } else {
        return `❌ Error: ${data.error || 'Unknown error'}`;
      }

    } catch (error) {
      console.error('🔴 Backend Connection Error:', error);

      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        return `❌ Cannot connect to backend server.\n\nPlease make sure:\n• Backend is running on ${backendUrl}\n• Run: npm start (in backend folder)\n• Check if port 5000 is available`;
      }

      return `❌ Connection Error: ${error.message}`;
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return;

    const userMsg = {
      type: 'user',
      text: inputMessage,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);

    const botResponse = await callBackendAPI(currentMessage);

    const botMsg = {
      type: 'bot',
      text: botResponse,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickSuggestions = [
    '🏛️ Famous places in Delhi',
    '🚗 Best transport options',
    '🏨 Help me plan a trip',
    '✈️ Weekend getaway ideas',
    '💡 Travel tips for India'
  ];

  const handleSuggestionClick = (suggestion) => {
    setInputMessage(suggestion.substring(3));
  };

  const clearChat = () => {
    setMessages([
      {
        type: 'bot',
        text: 'Chat cleared! How can I help you today?',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <button
        onClick={() => window.history.back()}
        className="fixed top-5 left-5 bg-white text-indigo-600 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:-translate-x-1 transition-all duration-300 flex items-center gap-2 z-50"
      >
        <span className="text-lg">←</span>
        Back to Home
      </button>

      <button
        className={`fixed bottom-8 right-8 w-16 h-16 rounded-full text-white text-3xl shadow-2xl transition-all duration-300 flex items-center justify-center z-50 ${isOpen
          ? 'bg-gradient-to-r from-pink-500 to-rose-500 rotate-90'
          : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-110'
          }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div className="fixed bottom-28 right-8 w-[450px] h-[650px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col overflow-hidden z-40 animate-slideUp">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl shadow-lg">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-lg">AI Travel Assistant</h3>
                <span className="text-xs opacity-90 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Powered by {selectedProvider === 'claude' ? 'Claude' : 'OpenAI'}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                title="Settings"
              >
                ⚙️
              </button>
              <button
                onClick={clearChat}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
                title="Clear Chat"
              >
                🗑️
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center"
              >
                −
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          {showSettings && (
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-indigo-200 animate-fadeIn">
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">Backend URL:</p>
                <input
                  type="text"
                  value={backendUrl}
                  onChange={(e) => setBackendUrl(e.target.value)}
                  placeholder="http://localhost:5000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
                />
              </div>

              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-700 mb-2">Select AI Provider:</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedProvider('claude');
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${selectedProvider === 'claude'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-400'
                      }`}
                  >
                    🧠 Claude AI
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProvider('openai');
                    }}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${selectedProvider === 'openai'
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-indigo-400'
                      }`}
                  >
                    🤖 OpenAI
                  </button>
                </div>
              </div>

              <div className="text-xs text-gray-600 bg-white p-3 rounded-lg">
                {selectedProvider === 'claude' ? (
                  <>
                    <p className="font-semibold mb-1">✅ Using: Claude AI</p>
                    <p>• More accurate responses</p>
                    <p>• Better context understanding</p>
                    <p>• API Key configured on server</p>
                  </>
                ) : (
                  <>
                    <p className="font-semibold mb-1">✅ Using: OpenAI</p>
                    <p>• Fast responses</p>
                    <p>• GPT-3.5 Turbo model</p>
                    <p>• API Key configured on server</p>
                  </>
                )}
              </div>

              <button
                onClick={() => setShowSettings(false)}
                className="w-full mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Close Settings
              </button>
            </div>
          )}

          <div className="flex-1 p-5 overflow-y-auto bg-gradient-to-b from-transparent to-indigo-50/30">
            {messages.map((msg, index) => (
              <div key={index} className={`flex gap-3 mb-4 animate-fadeIn ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 shadow-md ${msg.type === 'user' ? 'bg-gradient-to-br from-indigo-500 to-purple-600' : 'bg-white'
                  }`}>
                  {msg.type === 'user' ? '👤' : '🤖'}
                </div>
                <div className={`max-w-[75%] ${msg.type === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`px-4 py-3 rounded-2xl shadow-md ${msg.type === 'user'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-800 rounded-bl-sm'
                    }`}>
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <span className="text-xs text-gray-500 mt-1 px-2">
                    {msg.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-lg shadow-md">
                  🤖
                </div>
                <div className="bg-white px-5 py-3 rounded-2xl rounded-bl-sm shadow-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && (
            <div className="px-5 py-3 bg-white border-t border-gray-100">
              <p className="text-xs text-gray-600 font-medium mb-2">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 border border-indigo-200 rounded-full text-xs text-gray-700 transition-all hover:shadow-md hover:-translate-y-0.5"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex gap-2 items-center">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-full focus:border-indigo-500 focus:outline-none transition-colors"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputMessage.trim() === ''}
                className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105"
              >
                <span className="text-xl">📤</span>
              </button>
            </div>
          </div>

          <div className="py-2 px-4 bg-gray-50 text-center">
            <span className="text-xs text-gray-500">Powered by Rentara AI</span>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease;
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease;
        }

        @media (max-width: 768px) {
          .fixed.bottom-28.right-8 {
            width: 100vw;
            height: 100vh;
            bottom: 0;
            right: 0;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AIChatBot;