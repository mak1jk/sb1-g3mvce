import React from 'react';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick?: () => void;
  className?: string;
}

export function HamburgerButton({ isOpen, onClick, className = '' }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-2 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700 ${className}`}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
    >
      <div className="w-6 h-5 relative flex flex-col justify-between">
        <span
          className={`w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full transform transition-all duration-300 
            ${isOpen ? 'rotate-45 translate-y-2' : ''}`}
        />
        <span
          className={`w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full transition-opacity duration-300 
            ${isOpen ? 'opacity-0' : ''}`}
        />
        <span
          className={`w-full h-0.5 bg-gray-600 dark:bg-gray-300 rounded-full transform transition-all duration-300 
            ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}
        />
      </div>
    </button>
  );
}