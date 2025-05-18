/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // App Router est compatible avec le middleware pour i18n
  // i18n est géré par notre middleware personnalisé, pas de configuration i18n ici
}

module.exports = nextConfig 