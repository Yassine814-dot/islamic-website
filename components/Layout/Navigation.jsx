import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaHeart, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Navigation = () => {
  const navItems = [
    { to: '/', icon: FaHome, label: 'Accueil' },
    { to: '/favorites', icon: FaHeart, label: 'Favoris' },
    { to: '/about', icon: FaInfoCircle, label: 'À propos' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-center gap-2 py-3">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `
                relative px-6 py-2 rounded-lg transition-all duration-300
                flex items-center gap-2 overflow-hidden group
                ${isActive 
                  ? 'text-islamic-green dark:text-islamic-gold' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-islamic-green dark:hover:text-islamic-gold'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <item.icon className="text-xl relative z-10" />
                  <span className="relative z-10 font-medium">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-islamic-cream dark:bg-gray-700 rounded-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;