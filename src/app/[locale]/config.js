// Configuration pour le routage i18n
export const dynamicParams = false

// Définir les locales disponibles pour Next.js App Router
export function generateStaticParams() {
  return [
    { locale: 'fr' },
    { locale: 'en' },
    { locale: 'fa' }, // Afghan (Dari)
    { locale: 'ku' }, // Kurde
    { locale: 'zh' }, // Chinois
  ]
} 