import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { AppContext } from '../context/AppContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const States = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
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
    },
    { 
      code: 'bn', 
      name: t('language.bengali'), 
      nativeName: 'বাংলা',
      flag: '🇮🇳',
      description: t('Bengali language option for users from West Bengal and Bangladesh.')
    },
    { 
      code: 'te', 
      name: t('language.telugu'), 
      nativeName: 'తెలుగు',
      flag: '🇮🇳',
      description: t('Telugu language option for users from Andhra Pradesh and Telangana.')
    },
    { 
      code: 'mr', 
      name: t('language.marathi'), 
      nativeName: 'मराठी',
      flag: '🇮🇳',
      description: t('Marathi language option for users from Maharashtra.')
    },
    { 
      code: 'ta', 
      name: t('language.tamil'), 
      nativeName: 'தமிழ்',
      flag: '🇮🇳',
      description: t('Tamil language option for users from Tamil Nadu.')
    },
    { 
      code: 'ur', 
      name: t('language.urdu'), 
      nativeName: 'اردو',
      flag: '🇮🇳',
      description: t('Urdu language option with right-to-left support.')
    },
    { 
      code: 'gu', 
      name: t('language.gujarati'), 
      nativeName: 'ગુજરાતી',
      flag: '🇮🇳',
      description: t('Gujarati language option for users from Gujarat.')
    },
    { 
      code: 'kn', 
      name: t('language.kannada'), 
      nativeName: 'ಕನ್ನಡ',
      flag: '🇮🇳',
      description: t('Kannada language option for users from Karnataka.')
    },
    { 
      code: 'ml', 
      name: t('language.malayalam'), 
      nativeName: 'മലയാളം',
      flag: '🇮🇳',
      description: t('Malayalam language option for users from Kerala.')
    },
    { 
      code: 'pa', 
      name: t('language.punjabi'), 
      nativeName: 'ਪੰਜਾਬੀ',
      flag: '🇮🇳',
      description: t('Punjabi language option for users from Punjab.')
    },
    { 
      code: 'or', 
      name: t('language.odia'), 
      nativeName: 'ଓଡ଼ିଆ',
      flag: '🇮🇳',
      description: t('Odia language option for users from Odisha.')
    },
    { 
      code: 'as', 
      name: t('language.assamese'), 
      nativeName: 'অসমীয়া',
      flag: '🇮🇳',
      description: t('Assamese language option for users from Assam.')
    },
    { 
      code: 'sd', 
      name: t('language.sindhi'), 
      nativeName: 'سنڌي',
      flag: '🇮🇳',
      description: t('Sindhi language option with right-to-left support.')
    },
    { 
      code: 'sa', 
      name: t('language.sanskrit'), 
      nativeName: 'संस्कृतम्',
      flag: '🇮🇳',
      description: t('Sanskrit language option - the classical language of India.')
    },
    { 
      code: 'ks', 
      name: t('language.kashmiri'), 
      nativeName: 'कॉशुर',
      flag: '🇮🇳',
      description: t('Kashmiri language option for users from Kashmir.')
    },
    { 
      code: 'brx', 
      name: t('language.bodo'), 
      nativeName: 'बड़ो',
      flag: '🇮🇳',
      description: t('Bodo language option for users from Northeast India.')
    },
    { 
      code: 'es', 
      name: t('language.spanish'), 
      nativeName: 'Español',
      flag: '🇪🇸',
      description: t('Spanish language option for native Spanish speakers.')
    },
    { 
      code: 'fr', 
      name: t('language.french'), 
      nativeName: 'Français',
      flag: '🇫🇷',
      description: t('French language option for native French speakers.')
    },
    { 
      code: 'de', 
      name: t('language.german'), 
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      description: t('German language option for native German speakers.')
    },
    { 
      code: 'zh', 
      name: t('language.chinese'), 
      nativeName: '中文',
      flag: '🇨🇳',
      description: t('Chinese language option for native Chinese speakers.')
    },
    { 
      code: 'ja', 
      name: t('language.japanese'), 
      nativeName: '日本語',
      flag: '🇯🇵',
      description: t('Japanese language option for native Japanese speakers.')
    },
    { 
      code: 'ru', 
      name: t('language.russian'), 
      nativeName: 'Русский',
      flag: '🇷🇺',
      description: t('Russian language option for native Russian speakers.')
    },
    { 
      code: 'pt', 
      name: t('language.portuguese'), 
      nativeName: 'Português',
      flag: '🇵🇹',
      description: t('Portuguese language option for native Portuguese speakers.')
    },
    { 
      code: 'ko', 
      name: t('language.korean'), 
      nativeName: '한국어',
      flag: '🇰🇷',
      description: t('Korean language option for native Korean speakers.')
    },
    { 
      code: 'it', 
      name: t('language.italian'), 
      nativeName: 'Italiano',
      flag: '🇮🇹',
      description: t('Italian language option for native Italian speakers.')
    },
    { 
      code: 'nl', 
      name: t('language.dutch'), 
      nativeName: 'Nederlands',
      flag: '🇳🇱',
      description: t('Dutch language option for native Dutch speakers.')
    },
    { 
      code: 'tr', 
      name: t('language.turkish'), 
      nativeName: 'Türkçe',
      flag: '🇹🇷',
      description: t('Turkish language option for native Turkish speakers.')
    },
    { 
      code: 'pl', 
      name: t('language.polish'), 
      nativeName: 'Polski',
      flag: '🇵🇱',
      description: t('Polish language option for native Polish speakers.')
    },
    { 
      code: 'sv', 
      name: t('language.swedish'), 
      nativeName: 'Svenska',
      flag: '🇸🇪',
      description: t('Swedish language option for native Swedish speakers.')
    },
    { 
      code: 'vi', 
      name: t('language.vietnamese'), 
      nativeName: 'Tiếng Việt',
      flag: '🇻🇳',
      description: t('Vietnamese language option for native Vietnamese speakers.')
    },
    { 
      code: 'th', 
      name: t('language.thai'), 
      nativeName: 'ไทย',
      flag: '🇹🇭',
      description: t('Thai language option for native Thai speakers.')
    },
    { 
      code: 'id', 
      name: t('language.indonesian'), 
      nativeName: 'Bahasa Indonesia',
      flag: '🇮🇩',
      description: t('Indonesian language option for native Indonesian speakers.')
    },
    { 
      code: 'he', 
      name: t('language.hebrew'), 
      nativeName: 'עברית',
      flag: '🇮🇱',
      description: t('Hebrew language option with right-to-left support.')
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {languages.map((lang) => (
              <div 
                key={lang.code}
                className={`border rounded-lg overflow-hidden hover:shadow-lg transition duration-300 
                  ${language === lang.code ? 'border-green-500 ring-2 ring-green-500' : 'border-gray-200'}`}
              >
                <button 
                  onClick={() => changeLanguage(lang.code)}
                  className="w-full h-full p-4 text-left"
                >
                  <div className="flex items-center mb-3">
                    <span className="text-3xl mr-3">{lang.flag}</span>
                    <div>
                      <h2 className="text-lg font-semibold">{lang.name}</h2>
                      <p className="text-gray-600 text-sm">{lang.nativeName}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs">{lang.description}</p>

                  {language === lang.code && (
                    <div className="mt-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs inline-block">
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