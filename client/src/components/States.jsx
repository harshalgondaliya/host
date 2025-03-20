import React, { useContext, useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';
import i18n from '../i18n';

const LanguageDropdown = () => {
  const { language, changeLanguage } = useContext(AppContext);
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const dropdownRef = useRef(null);
  const containerRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Get available languages from i18n resources
    const languages = Object.keys(i18n.resources || {});
    console.log('Available languages from i18n:', languages);
    setAvailableLanguages(languages);
  }, []);

  const handleLanguageChange = async (langCode) => {
    console.log('Attempting to change language to:', langCode);
    try {
      await changeLanguage(langCode);
      console.log('Language changed successfully to:', langCode);
      setIsOpen(false);
      setSearchTerm('');
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  // Debug - log current language and available resources
  useEffect(() => {
    console.log('Current language:', language);
    console.log('i18n resources:', i18n.options.resources);
    console.log('i18n instance:', i18n);
    console.log('changeLanguage function:', changeLanguage);
  }, [language]);

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

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
          containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    }

    // Add event listener when dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Language options grouped by regions - updated with all languages from locales folder
  const languageGroups = {
    popular: [
      { code: 'en', name: t('language.english'), flag: '🇺🇸' },
      { code: 'es', name: t('language.spanish'), flag: '🇪🇸' },
      { code: 'fr', name: t('language.french'), flag: '🇫🇷' },
      { code: 'de', name: t('language.german'), flag: '🇩🇪' },
      { code: 'zh', name: t('language.chinese'), flag: '🇨🇳' },
      { code: 'ar', name: t('language.arabic'), flag: '🇸🇦' },
      { code: 'ru', name: t('language.russian'), flag: '🇷🇺' },
      { code: 'pt', name: t('language.portuguese'), flag: '🇵🇹' },
      { code: 'ja', name: t('language.japanese'), flag: '🇯🇵' },
      { code: 'hi', name: t('language.hindi'), flag: '🇮🇳' },
    ],
    indian: [
      { code: 'hi', name: t('language.hindi'), flag: '🇮🇳' },
      { code: 'bn', name: t('language.bengali'), flag: '🇮🇳' },
      { code: 'te', name: t('language.telugu'), flag: '🇮🇳' },
      { code: 'mr', name: t('language.marathi'), flag: '🇮🇳' },
      { code: 'ta', name: t('language.tamil'), flag: '🇮🇳' },
      { code: 'ur', name: t('language.urdu'), flag: '🇮🇳' },
      { code: 'gu', name: t('language.gujarati'), flag: '🇮🇳' },
      { code: 'kn', name: t('language.kannada'), flag: '🇮🇳' },
      { code: 'ml', name: t('language.malayalam'), flag: '🇮🇳' },
      { code: 'pa', name: t('language.punjabi'), flag: '🇮🇳' },
      { code: 'or', name: t('language.odia'), flag: '🇮🇳' },
      { code: 'as', name: t('language.assamese'), flag: '🇮🇳' },
      { code: 'sd', name: t('language.sindhi'), flag: '🇮🇳' },
      { code: 'sa', name: t('language.sanskrit'), flag: '🇮🇳' },
      { code: 'ks', name: t('language.kashmiri'), flag: '🇮🇳' },
      { code: 'brx', name: t('language.bodo'), flag: '🇮🇳' },
    ],
    eastAsian: [
      { code: 'zh', name: t('language.chinese'), flag: '🇨🇳' },
      { code: 'ja', name: t('language.japanese'), flag: '🇯🇵' },
      { code: 'ko', name: t('language.korean'), flag: '🇰🇷' },
    ],
    southeastAsian: [
      { code: 'vi', name: t('language.vietnamese'), flag: '🇻🇳' },
      { code: 'th', name: t('language.thai'), flag: '🇹🇭' },
      { code: 'id', name: t('language.indonesian'), flag: '🇮🇩' },
    ],
    westernEuropean: [
      { code: 'en', name: t('language.english'), flag: '🇬🇧' },
      { code: 'fr', name: t('language.french'), flag: '🇫🇷' },
      { code: 'de', name: t('language.german'), flag: '🇩🇪' },
      { code: 'es', name: t('language.spanish'), flag: '🇪🇸' },
      { code: 'it', name: t('language.italian'), flag: '🇮🇹' },
      { code: 'nl', name: t('language.dutch'), flag: '🇳🇱' },
      { code: 'pt', name: t('language.portuguese'), flag: '🇵🇹' },
    ],
    easternEuropean: [
      { code: 'pl', name: t('language.polish'), flag: '🇵🇱' },
      { code: 'ru', name: t('language.russian'), flag: '🇷🇺' },
    ],
    nordic: [
      { code: 'sv', name: t('language.swedish'), flag: '🇸🇪' },
    ],
    middleEast: [
      { code: 'ar', name: t('language.arabic'), flag: '🇸🇦' },
      { code: 'he', name: t('language.hebrew'), flag: '🇮🇱' },
      { code: 'tr', name: t('language.turkish'), flag: '🇹🇷' },
    ]
  };

  // Filter language groups to only show available languages
  const filteredLanguageGroups = Object.fromEntries(
    Object.entries(languageGroups).map(([region, languages]) => [
      region,
      languages.filter(lang => availableLanguages.includes(lang.code))
    ])
  );

  // Flatten languages for search
  const allLanguages = Object.values(filteredLanguageGroups).flat();

  // Get current language display
  const currentLanguage = allLanguages.find(lang => lang.code === language) || allLanguages[0];

  // Get language name from language code
  const getLanguageName = (langCode) => {
    try {
      // Try to get the translated name from the language object
      const langKey = `language.${langCode}`;
      const translatedName = t(langKey);
      
      // If the translation exists and is not the same as the key (fallback behavior)
      if (translatedName && translatedName !== langKey) {
        return translatedName;
      }
      
      // Try to find it in the language groups
      for (const group of Object.values(languageGroups)) {
        const langObj = group.find(l => l.code === langCode);
        if (langObj) {
          return langObj.name;
        }
      }
      
      // Fallback to a capitalized version of the language code
      return langCode.charAt(0).toUpperCase() + langCode.slice(1);
    } catch (error) {
      console.error('Error getting language name:', error);
      return langCode;
    }
  };

  // Function to get flag emoji for a language code
  const getLanguageFlag = (langCode) => {
    for (const group of Object.values(languageGroups)) {
      const langObj = group.find(l => l.code === langCode);
      if (langObj && langObj.flag) {
        return langObj.flag;
      }
    }
    return "🌐"; // Default globe emoji if no specific flag is found
  };

  // Filter languages based on search term
  const filteredLanguages = searchTerm
    ? allLanguages.filter(lang => 
        lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lang.code.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div ref={containerRef} className="relative inline-block" data-testid="language-dropdown">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-gradient-to-br from-teal-400 to-emerald-500 text-white hover:from-teal-500 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 border border-emerald-300"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center space-x-2">
          <span className="text-xl group-hover:scale-110 transition-transform">{getLanguageFlag(language)}</span>
          <span className="font-medium">{getLanguageName(language)}</span>
        </div>
        <svg 
          className={`w-4 h-4 transition-all duration-300 ${isOpen ? 'rotate-180 opacity-70' : 'opacity-100'}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute right-0 mt-3 w-72 max-h-[70vh] overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl z-50 border border-emerald-100 dark:border-emerald-900 animate-fadeIn"
          style={{
            boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.1), 0 10px 10px -5px rgba(16, 185, 129, 0.04)'
          }}
        >
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 pt-3 px-4 pb-2">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t('Search languages...')}
                className="w-full py-2 pl-10 pr-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400"
              />
              <svg 
                className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 dark:text-gray-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="overflow-y-auto max-h-[calc(70vh-60px)]">
            {searchTerm ? (
              <div className="py-3">
                {filteredLanguages.length > 0 ? (
                  <div className="space-y-1 px-3">
                    {filteredLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center w-full px-4 py-2.5 rounded-xl transition-colors ${
                          language === lang.code 
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                          {language === lang.code && (
                            <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 px-4 text-gray-500 dark:text-gray-400">
                    {t('No languages found matching')} "{searchTerm}"
                  </div>
                )}
              </div>
            ) : (
              <div className="py-3 space-y-4">
                {/* Recently Used Section (Example) */}
                <div className="px-4 pb-1">
                  <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {t('Recently Used')}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {filteredLanguageGroups.popular.slice(0, 5).map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm border ${
                          language === lang.code 
                            ? 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' 
                            : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Main Languages Section */}
                <div className="px-4 pb-1">
                  <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {t('Popular Languages')}
                  </h3>
                  <div className="mt-2 space-y-1">
                    {filteredLanguageGroups.popular.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        className={`flex items-center w-full px-3 py-2 rounded-xl transition-colors ${
                          language === lang.code 
                            ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{lang.flag}</span>
                            <span>{lang.name}</span>
                          </div>
                          {language === lang.code && (
                            <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Regional Sections with Collapsible UI */}
                {Object.entries(filteredLanguageGroups)
                  .filter(([region]) => region !== 'popular' && filteredLanguageGroups[region].length > 0)
                  .map(([region, languages]) => (
                    <div key={region} className="px-4 pb-1 pt-2 border-t border-gray-100 dark:border-gray-800">
                      <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        {t(region.charAt(0).toUpperCase() + region.slice(1))}
                      </h3>
                      <div className="mt-2 space-y-1">
                        {languages.map((lang) => (
                          <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`flex items-center w-full px-3 py-2 rounded-xl transition-colors ${
                              language === lang.code 
                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-medium' 
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                          >
                            <div className="flex items-center space-x-3">
                              <span className="text-xl">{lang.flag}</span>
                              <span>{lang.name}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;
