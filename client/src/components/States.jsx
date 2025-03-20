import React, { useContext, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';

const States = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(AppContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef(null);

  // Scroll to top when component mounts
  useEffect(() => {
    // Force scroll to top with a slight delay to ensure it happens after render
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
      
      // Additional approach - scroll the container element to top
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ 
          behavior: 'auto',
          block: 'start'
        });
      }
    }, 100);
  }, []);

  // Language options
  const languages = [
    { code: 'en', name: t('language.english'), flag: '🇺🇸' },
    { code: 'ar', name: t('language.arabic'), flag: '🇸🇦' },
    { code: 'hi', name: t('language.hindi'), flag: '🇮🇳' }
  ];

  // Get current language display
  const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  return (
    <div ref={containerRef} className="language-dropdown relative">
      <button 
        className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="text-xl">{currentLanguage.flag}</span>
        <span className="hidden md:inline-block">{currentLanguage.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 ${
                lang.code === language ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
              onClick={() => {
                changeLanguage(lang.code);
                setIsDropdownOpen(false);
              }}
            >
              <span className="text-xl">{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default States;
