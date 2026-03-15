import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaTrash, FaQuoteLeft } from 'react-icons/fa';
import QuoteCard from '../Quote/QuoteCard';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import quotesData from '../../data/quotes.json';

const FavoritesList = () => {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  
  // Récupérer les citations favorites à partir des IDs
  const favoriteQuotes = quotesData.quotes.filter(quote => 
    favorites.includes(quote.id)
  );

  const toggleFavorite = (quoteId) => {
    setFavorites(favorites.filter(id => id !== quoteId));
  };

  const clearAllFavorites = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer tous vos favoris ?')) {
      setFavorites([]);
    }
  };

  const isFavorite = (quoteId) => favorites.includes(quoteId);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (favoriteQuotes.length === 0) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 px-4"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="inline-block mb-6"
        >
          <FaHeart className="text-6xl text-gray-300 dark:text-gray-600" />
        </motion.div>
        
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Aucune citation favorite
        </h2>
        
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Cliquez sur le cœur <FaHeart className="inline text-red-500 text-sm" /> pour ajouter des citations à vos favoris et les retrouver ici.
        </p>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a 
            href="/"
            className="inline-flex items-center gap-2 bg-islamic-green text-white px-6 py-3 rounded-lg hover:bg-islamic-green/90 transition-colors"
          >
            <FaQuoteLeft />
            Découvrir des citations
          </a>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* En-tête avec statistiques */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-islamic-green to-islamic-green/90 dark:from-islamic-dark dark:to-islamic-green/80 text-white rounded-2xl p-6 mb-8 shadow-xl"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <FaHeart className="text-3xl text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Mes Favoris</h2>
              <p className="text-white/80">
                {favoriteQuotes.length} citation{favoriteQuotes.length > 1 ? 's' : ''} sauvegardée{favoriteQuotes.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearAllFavorites}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg flex items-center gap-2 transition-colors"
            title="Supprimer tous les favoris"
          >
            <FaTrash className="text-sm" />
            Tout supprimer
          </motion.button>
        </div>

        {/* Barre de progression */}
        <div className="mt-4 w-full bg-white/20 rounded-full h-2">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${(favoriteQuotes.length / quotesData.quotes.length) * 100}%` }}
            className="bg-islamic-gold h-2 rounded-full"
          />
        </div>
        <p className="text-xs text-white/60 mt-2">
          {favoriteQuotes.length} sur {quotesData.quotes.length} citations
        </p>
      </motion.div>

      {/* Liste des favoris */}
      <AnimatePresence mode="popLayout">
        {favoriteQuotes.map((quote, index) => (
          <motion.div
            key={quote.id}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: -100 }}
            layout
          >
            <QuoteCard
              quote={quote}
              isFavorite={isFavorite(quote.id)}
              onToggleFavorite={toggleFavorite}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Bouton pour retourner à l'accueil */}
      <motion.div 
        variants={itemVariants}
        className="text-center mt-8"
      >
        <a 
          href="/"
          className="inline-flex items-center gap-2 text-islamic-green dark:text-islamic-gold hover:underline"
        >
          ← Retour à l'accueil
        </a>
      </motion.div>
    </motion.div>
  );
};

export default FavoritesList;