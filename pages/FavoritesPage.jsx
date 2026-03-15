import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import FavoritesList from '../components/Favorites/FavoritesList';

const FavoritesPage = () => {
  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <FaHeart className="text-4xl text-red-500" />
          <h1 className="text-4xl font-bold text-islamic-green dark:text-islamic-gold">
            Mes Favoris
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Vos citations préférées sauvegardées dans votre navigateur
        </p>
      </motion.div>

      <FavoritesList />
    </div>
  );
};

export default FavoritesPage;