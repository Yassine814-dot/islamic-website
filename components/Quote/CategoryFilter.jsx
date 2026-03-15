import React from 'react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'all', label: 'Tous', color: 'bg-gray-500', icon: '📚' },
  { id: 'Sabr', label: 'Patience (Sabr)', color: 'bg-blue-500', icon: '🤲' },
  { id: 'Iman', label: 'Foi (Iman)', color: 'bg-green-500', icon: '✨' },
  { id: 'Knowledge', label: 'Savoir (Knowledge)', color: 'bg-purple-500', icon: '📖' },
  { id: 'Akhlaq', label: 'Morale (Akhlaq)', color: 'bg-yellow-500', icon: '💝' },
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {categories.map((category, index) => (
        <motion.button
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => onCategoryChange(category.id)}
          className={`
            px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
            flex items-center gap-2 shadow-md hover:shadow-lg
            ${selectedCategory === category.id
              ? `${category.color} text-white scale-105 ring-2 ring-offset-2 ring-${category.color.split('-')[1]}-500`
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }
          `}
        >
          <span>{category.icon}</span>
          <span>{category.label}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default CategoryFilter;