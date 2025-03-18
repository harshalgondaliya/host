import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const States = () => {
  const { t } = useTranslation();
  const { language, changeLanguage } = useContext(AppContext);

  // Language options with more detailed information
  const languages = [
    { 
      code: 'en', 
      name: t('language.english'), 
      nativeName: 'English',
      flag: '🇺🇸',
      description: t('This is the default language and provides full content across the website.')
    },
    { 
      code: 'ar', 
      name: t('language.arabic'), 
      nativeName: 'العربية',
      flag: '🇸🇦',
      description: t('Select for right-to-left layout and Arabic translation.')
    },
    { 
      code: 'hi', 
      name: t('language.hindi'), 
      nativeName: 'हिंदी',
      flag: '🇮🇳',
      description: t('Choose Hindi for content localized for Indian users.')
    }
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen py-20 px-4 bg-yellow-50">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
            {t('Choose Your Language')}
          </h1>

          <div className="grid md:grid-cols-3 gap-6">
            {languages.map((lang) => (
              <div 
                key={lang.code}
                className={`border rounded-lg overflow-hidden hover:shadow-lg transition duration-300 
                  ${language === lang.code ? 'border-green-500 ring-2 ring-green-500' : 'border-gray-200'}`}
              >
                <button 
                  onClick={() => changeLanguage(lang.code)}
                  className="w-full h-full p-6 text-left"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-3">{lang.flag}</span>
                    <div>
                      <h2 className="text-xl font-semibold">{lang.name}</h2>
                      <p className="text-gray-600">{lang.nativeName}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{lang.description}</p>

                  {language === lang.code && (
                    <div className="mt-4 bg-green-100 text-green-800 px-3 py-1 rounded text-sm inline-block">
                      {t('Currently Selected')}
                    </div>
                  )}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t('About Language Settings')}</h3>
            <p className="text-gray-600">
              {t('Your language preference will be saved for future visits. The website will automatically detect your preferred language when you return.')}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default States; 