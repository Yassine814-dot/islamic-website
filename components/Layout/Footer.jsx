import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t dark:border-gray-700 mt-16 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300">
            © 2024 Islamic Quotes Generator - Toutes les citations proviennent de sources authentiques
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Basé sur le Saint Coran, Sahih al-Bukhari et Sahih Muslim
          </p>
          
          <div className="flex justify-center gap-4 mt-4 text-sm text-islamic-green dark:text-islamic-gold">
            <a href="#" className="hover:underline">Conditions d'utilisation</a>
            <span>•</span>
            <a href="#" className="hover:underline">Confidentialité</a>
            <span>•</span>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;