import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

// Langues supportées
const locales = ['fr', 'en','es', 'fa', 'ku', 'zh']
const defaultLocale = 'fr'

// Cette fonction obtient la langue préférée de l'utilisateur basée sur les headers
function getLocale(request: NextRequest) {
  const headers = new Headers(request.headers)
  const acceptLanguage = headers.get('accept-language')
  
  if (acceptLanguage) {
    headers.set('accept-language', acceptLanguage)
    const negotiator = new Negotiator({ headers: Object.fromEntries(headers) })
    
    try {
      return match(negotiator.languages(), locales, defaultLocale)
    } catch (e) {
      console.error('Error matching locale:', e)
      return defaultLocale
    }
  }
  
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Vérifier si la requête doit être ignorée
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Vérifier si le chemin a déjà un préfixe de locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // Si le chemin a déjà un préfixe de locale, ne pas rediriger
  if (pathnameHasLocale) return NextResponse.next()

  // Si nous sommes à la racine /, rediriger vers la langue par défaut
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
  }

  // Sinon, obtenir la locale depuis les headers et rediriger
  const locale = getLocale(request)
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
}

// Matcher configuré pour exclure les fichiers statiques et les API
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'],
} 