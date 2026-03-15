import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  icon: Icon,
  disabled = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-islamic-green text-white hover:bg-islamic-green/90 dark:bg-islamic-gold dark:text-islamic-dark",
    secondary: "bg-islamic-gold text-islamic-dark hover:bg-islamic-gold/90",
    outline: "border-2 border-islamic-green text-islamic-green hover:bg-islamic-green hover:text-white dark:border-islamic-gold dark:text-islamic-gold",
    ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      {...props}
    >
      {Icon && <Icon className="text-xl" />}
      {children}
    </motion.button>
  );
};

export default Button;