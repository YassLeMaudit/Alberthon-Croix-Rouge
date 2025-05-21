import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translations
const resources = {
  fr: {
    common: {
      'welcome': 'Votre assistant personnel pour la recherche d\'emploi',
      'cv.title': 'Création de CV',
      'lettre.title': 'Lettre de Motivation',
      'lettre.subtitle': 'Rédigez une lettre de motivation personnalisée',
      'assistant': 'Coaching Carrière',
      'chat.welcome_cv': 'Obtenez des conseils personnalisés pour votre carrière'
    }
  },
  en: {
    common: {
      'welcome': 'Your personal job search assistant',
      'cv.title': 'CV Creation',
      'lettre.title': 'Cover Letter',
      'lettre.subtitle': 'Write a personalized cover letter',
      'assistant': 'Career Coaching',
      'chat.welcome_cv': 'Get personalized career advice'
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'fr', // default language
    fallbackLng: 'fr',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n 