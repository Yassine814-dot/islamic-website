import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QuoteGenerator from '../components/Quote/QuoteGenerator';
import CategoryFilter from '../components/Quote/CategoryFilter';
import AIChat from '../components/AI/AIChat';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAIChat, setShowAIChat] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-islamic-green dark:text-islamic-gold mb-4">
          Citations Islamiques
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Découvrez des paroles inspirantes du Coran et des Hadiths authentiques
        </p>
      </motion.section>

      {/* AI Assistant Toggle */}
      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowAIChat(!showAIChat)}
          className="px-6 py-3 bg-gradient-to-r from-islamic-gold to-islamic-green text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          {showAIChat ? 'Masquer l\'assistant IA' : 'Posez une question à l\'assistant IA'}
        </button>
      </div>

      {/* AI Chat Section */}
      {showAIChat && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-12"
        >
          <AIChat />
        </motion.div>
      )}

      {/* Quote Generator Section */}
      <section>
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <QuoteGenerator selectedCategory={selectedCategory} />
      </section>
    </div>
  );
};

export default HomePage;