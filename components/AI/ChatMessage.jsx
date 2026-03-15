import React from 'react';
import { FaUser, FaRobot } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ChatMessage = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-islamic-gold flex items-center justify-center flex-shrink-0">
          <FaRobot className="text-white text-sm" />
        </div>
      )}
      
      <div
        className={`max-w-[80%] p-4 rounded-2xl ${
          isUser
            ? 'bg-islamic-green text-white rounded-br-none'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
        {message.arabic && (
          <p className="text-right font-arabic text-lg mt-2 opacity-90" dir="rtl">
            {message.arabic}
          </p>
        )}
        {message.source && (
          <p className="text-xs mt-2 opacity-70">
            Source: {message.source}
          </p>
        )}
        <span className="text-xs opacity-50 mt-2 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-islamic-green flex items-center justify-center flex-shrink-0">
          <FaUser className="text-white text-sm" />
        </div>
      )}
    </motion.div>
  );
};

export default ChatMessage;