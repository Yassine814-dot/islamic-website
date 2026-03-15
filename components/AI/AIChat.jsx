import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaRobot, FaUser, FaSpinner, FaBook, FaQuran, 
  FaMoon, FaSun, FaTrash, FaCopy, FaGlobe,
  FaLanguage, FaCheck
} from 'react-icons/fa';
import { askLocalAssistant } from '../../services/localAssistant';
import toast from 'react-hot-toast';

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Suggestions de questions
  const suggestions = [
    { text: "Parle-moi de la patience dans l'Islam", icon: "🕋" },
    { text: "Quels sont les 5 piliers de l'Islam ?", icon: "🕌" },
    { text: "Que dit le Coran sur la miséricorde ?", icon: "📖" },
    { text: "Raconte-moi la vie du Prophète Mohammed", icon: "👳" },
    { text: "C'est quoi la Zakat ?", icon: "💰" },
    { text: "Parle-moi du Ramadan", icon: "🌙" },
    { text: "Les 6 piliers de la foi", icon: "✨" },
    { text: "Comment faire la prière ?", icon: "🕋" }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: input,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Simuler un délai pour l'expérience utilisateur
      setTimeout(() => {
        const aiResponse = askLocalAssistant(input, messages);
        setMessages(prev => [...prev, aiResponse]);
        setLoading(false);
      }, 500);
    } catch (error) {
      toast.error("Erreur de communication");
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion.text);
    inputRef.current?.focus();
  };

  const clearChat = () => {
    if (messages.length > 0 && window.confirm('Effacer la conversation ?')) {
      setMessages([]);
      toast.success('Conversation effacée');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copié !');
  };

  return (
    <div className={`max-w-4xl mx-auto rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-white'
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <FaQuran className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">Assistant Islamique</h2>
              <div className="flex items-center gap-2">
                <FaGlobe className="text-white/80 text-sm" />
                <p className="text-white/80 text-sm">Français • English • العربية</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              title={darkMode ? "Mode clair" : "Mode sombre"}
            >
              {darkMode ? <FaSun className="text-white" /> : <FaMoon className="text-white" />}
            </button>
            <button
              onClick={clearChat}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              title="Effacer"
            >
              <FaTrash className="text-white" />
            </button>
          </div>
        </div>
        
        {/* Badge hors ligne */}
        <div className="mt-2">
          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs inline-flex items-center gap-1">
            <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse"></span>
            Mode hors ligne - Gratuit
          </span>
        </div>
      </div>

      {/* Zone de chat */}
      <div className={`h-96 overflow-y-auto p-4 ${
        darkMode ? 'bg-gray-800' : 'bg-gray-50'
      }`}>
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
          >
            <div className="w-24 h-24 mx-auto mb-4 text-emerald-600 animate-float">
              <FaQuran className="w-full h-full" />
            </div>
            <h3 className={`text-xl font-semibold mb-2 ${
              darkMode ? 'text-white' : 'text-gray-700'
            }`}>
              Assistant Islamique Gratuit
            </h3>
            <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              Posez vos questions sur l'Islam en français, anglais ou arabe
            </p>
            
            {/* Suggestions */}
            <p className="text-sm mb-3 opacity-70">Questions suggérées :</p>
            <div className="flex flex-wrap gap-2 justify-center max-w-xl mx-auto">
              {suggestions.map((sugg, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(sugg)}
                  className="px-4 py-2 bg-white dark:bg-gray-700 border border-emerald-600/30 rounded-full text-sm hover:shadow-md transition-shadow flex items-center gap-2"
                >
                  <span>{sugg.icon}</span>
                  <span>{sugg.text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className={`flex gap-3 mb-4 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.sender === 'ai' && (
                <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center flex-shrink-0">
                  <FaRobot className="text-white text-sm" />
                </div>
              )}
              
              <div className={`group relative max-w-[80%] p-4 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-emerald-600 text-white rounded-br-none'
                  : darkMode 
                    ? 'bg-gray-700 text-white rounded-bl-none'
                    : 'bg-white shadow-md rounded-bl-none'
              }`}>
                {/* Badge hors ligne pour les réponses AI */}
                {message.offline && message.sender === 'ai' && (
                  <span className="absolute -top-2 -left-2 text-xs px-2 py-0.5 bg-green-500 text-white rounded-full">
                    📚 Hors ligne
                  </span>
                )}
                
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-50">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                  
                  <button
                    onClick={() => copyToClipboard(message.text)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-black/10 rounded"
                    title="Copier"
                  >
                    <FaCopy className="text-xs" />
                  </button>
                </div>
              </div>

              {message.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                  <FaUser className="text-white text-sm" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center">
              <FaRobot className="text-white text-sm" />
            </div>
            <div className={`p-3 rounded-lg ${
              darkMode ? 'bg-gray-700' : 'bg-white shadow'
            }`}>
              <div className="flex items-center gap-2">
                <FaSpinner className="animate-spin text-emerald-600" />
                <span className="text-sm">L'assistant réfléchit...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className={`p-4 border-t ${
        darkMode ? 'border-gray-700 bg-gray-800' : 'bg-white'
      }`}>
        <div className="flex gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Posez votre question en français, anglais ou arabe..."
            className={`flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 resize-none ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                : 'bg-white border-gray-300'
            }`}
            rows="2"
            dir="auto"
          />
          <button
            onClick={handleSendMessage}
            disabled={loading || !input.trim()}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-end font-semibold min-w-[100px]"
          >
            {loading ? (
              <FaSpinner className="animate-spin mx-auto" />
            ) : (
              "Envoyer"
            )}
          </button>
        </div>
        <p className={`text-xs mt-2 text-center ${
          darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          🤖 Assistant Islamique • 100% Gratuit • Sans Internet requis • Coran • Hadiths
        </p>
      </div>
    </div>
  );
};

export default AIChat;