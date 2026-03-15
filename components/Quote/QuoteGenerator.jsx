import React, { useState, useEffect } from 'react';
import { FaRandom } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import QuoteCard from './QuoteCard';
import quotesData from '../../data/quotes.json';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Button from '../UI/Button';

const QuoteGenerator = ({ selectedCategory }) => {
  const [currentQuote, setCurrentQuote] = useState(null);
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  const [quotes, setQuotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Filter quotes by category
    if (selectedCategory === 'all') {
      setQuotes(quotesData.quotes);
    } else {
      setQuotes(quotesData.quotes.filter(q => q.category === selectedCategory));
    }
  }, [selectedCategory]);

  useEffect(() => {
    // Generate random quote on load or category change
    if (quotes.length > 0) {
      generateRandomQuote();
    }
  }, [quotes]);

  const generateRandomQuote = () => {
    setIsLoading(true);
    
    // Simulate loading for better UX
    setTimeout(() => {
      if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setCurrentQuote(quotes[randomIndex]);
      }
      setIsLoading(false);
    }, 300);
  };

  const toggleFavorite = (quoteId) => {
    if (favorites.includes(quoteId)) {
      setFavorites(favorites.filter(id => id !== quoteId));
    } else {
      setFavorites([...favorites, quoteId]);
    }
  };

  const isFavorite = (quoteId) => favorites.includes(quoteId);

  if (!currentQuote && quotes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Aucune citation disponible pour cette catégorie
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-center mb-8">
        <Button
          onClick={generateRandomQuote}
          variant="primary"
          size="lg"
          icon={FaRandom}
          disabled={isLoading}
          className="group"
        >
          <span className="group-hover:scale-105 transition-transform">
            {isLoading ? 'Génération...' : 'Nouvelle citation'}
          </span>
        </Button>
      </div>
      
      <AnimatePresence mode="wait">
        {currentQuote && (
          <motion.div
            key={currentQuote.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <QuoteCard
              quote={currentQuote}
              isFavorite={isFavorite(currentQuote.id)}
              onToggleFavorite={toggleFavorite}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuoteGenerator;