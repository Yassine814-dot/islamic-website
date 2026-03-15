import React from 'react';
import { motion } from 'framer-motion';
import { FaQuran, FaBook, FaHeart, FaRobot } from 'react-icons/fa';

const AboutPage = () => {
  const features = [
    {
      icon: <FaQuran className="text-3xl" />,
      title: "Citations authentiques",
      description: "Toutes les citations proviennent du Coran et des Hadiths authentiques (Sahih al-Bukhari et Sahih Muslim)"
    },
    {
      icon: <FaRobot className="text-3xl" />,
      title: "Assistant IA",
      description: "Posez vos questions et recevez des réponses basées sur les enseignements islamiques"
    },
    {
      icon: <FaHeart className="text-3xl" />,
      title: "Favoris",
      description: "Sauvegardez vos citations préférées directement dans votre navigateur"
    },
    {
      icon: <FaBook className="text-3xl" />,
      title: "Catégories",
      description: "Filtrez les citations par thèmes : Patience, Foi, Connaissance, Morale"
    }
  ];

  return (
    <div className="min-h-screen max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-islamic-green dark:text-islamic-gold mb-4">
          À propos du projet
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Une plateforme éducative pour découvrir la sagesse islamique
        </p>
      </motion.div>

      {/* Mission */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-12"
      >
        <h2 className="text-2xl font-semibold text-islamic-green dark:text-islamic-gold mb-4">
          Notre Mission
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
          Islamic Quotes Generator a pour mission de rendre accessible la sagesse intemporelle 
          de l'Islam à travers une plateforme moderne et interactive. Nous croyons que les 
          enseignements du Coran et des Hadiths peuvent apporter lumière et guidance dans la vie 
          quotidienne de chacun.
        </p>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-6 mb-12"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-islamic-gold/20"
          >
            <div className="text-islamic-gold mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-islamic-green dark:text-islamic-gold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Sources */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-islamic-green to-islamic-green/90 text-white rounded-2xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-semibold mb-4">Sources authentiques</h2>
        <p className="mb-4">
          Notre base de données s'appuie sur les sources les plus fiables de l'Islam :
        </p>
        <ul className="list-disc list-inside space-y-2">
          <li>Le Saint Coran (traductions reconnues)</li>
          <li>Sahih al-Bukhari - La collection de hadiths la plus authentique</li>
          <li>Sahih Muslim - Seconde collection la plus authentique</li>
          <li>Sunan Ibn Majah - Hadiths authentiques</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default AboutPage;