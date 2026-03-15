import React from 'react';
import { Link } from 'react-router-dom';
import { FaQuran } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ThemeToggle from '../UI/ThemeToggle';

const Header = () => {
  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-gradient-to-r from-islamic-green to-islamic-green/90 dark:from-islamic-dark dark:to-islamic-green/80 text-white shadow-lg"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <FaQuran className="text-3xl text-islamic-gold" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold group-hover:text-islamic-gold transition-colors">
                Islamic Quotes
              </h1>
              <p className="text-xs text-white/70">Inspiration & Spiritualité</p>
            </div>
          </Link>
          
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;