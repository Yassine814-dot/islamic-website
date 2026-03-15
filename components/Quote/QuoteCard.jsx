import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaCopy, FaInfoCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import ShareButton from '../UI/ShareButton';

const QuoteCard = ({ quote, isFavorite, onToggleFavorite }) => {
  const [copied, setCopied] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${quote.text}\n\n- ${quote.source} (${quote.reference})`
      );
      setCopied(true);
      toast.success('Citation copiée!', {
        icon: '📋',
        style: {
          borderRadius: '10px',
          background: '#1B4D3E',
          color: '#fff',
        },
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Erreur lors de la copie');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6 border border-islamic-gold/20 hover:shadow-2xl transition-all duration-500"
    >
      {/* Arabic Text */}
      {quote.arabic && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-right font-arabic text-3xl mb-6 text-islamic-green dark:text-islamic-gold leading-loose"
          dir="rtl"
        >
          {quote.arabic}
        </motion.p>
      )}

      {/* Quote Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-gray-800 dark:text-gray-200 text-xl mb-6 italic border-l-4 border-islamic-gold pl-4"
      >
        "{quote.text}"
      </motion.p>

      {/* Source */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <p className="text-islamic-gold font-semibold">{quote.source}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{quote.reference}</p>
      </motion.div>

      {/* Actions */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div className="flex gap-2">
          <span className="px-4 py-1.5 bg-islamic-cream dark:bg-islamic-green/20 text-islamic-green dark:text-islamic-gold rounded-full text-sm font-semibold">
            {quote.category}
          </span>
          
          {/* Explanation Toggle */}
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="p-2 text-gray-500 hover:text-islamic-gold transition-colors relative group"
            title="Voir l'explication"
          >
            <FaInfoCircle className="text-xl" />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Explication
            </span>
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-gray-500 hover:text-islamic-gold transition-colors relative group"
            title="Copier"
          >
            <FaCopy className={`text-xl ${copied ? 'text-green-500' : ''}`} />
            <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {copied ? 'Copié!' : 'Copier'}
            </span>
          </button>

          <ShareButton quote={quote} />

          <button
            onClick={() => onToggleFavorite(quote.id)}
            className="p-2 text-gray-500 hover:text-red-500 transition-colors relative group"
            title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          >
            {isFavorite ? (
              <FaHeart className="text-xl text-red-500" />
            ) : (
              <FaRegHeart className="text-xl hover:text-red-500" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Explanation */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700"
          >
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              <span className="font-semibold text-islamic-green dark:text-islamic-gold">Explication: </span>
              {quote.explanation}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuoteCard;