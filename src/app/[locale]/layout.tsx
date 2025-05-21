'use client'

import { useEffect } from 'react'
import '../../i18n'
import i18n from 'i18next'
import Header from '@/components/Header'

export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])


    useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for CTRL+B (Windows/Linux) or CMD+B (Mac)
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault(); // Prevent default browser action (e.g., bolding text)
        const selectedText = window.getSelection()?.toString().trim();

        if (selectedText) {
          const targetLanguage = prompt("Enter target language code (e.g., en, es, fr):");
          if (targetLanguage) {
            const googleTranslateUrl = `https://translate.google.com/?sl=auto&tl=${encodeURIComponent(targetLanguage)}&text=${encodeURIComponent(selectedText)}`;
            window.open(googleTranslateUrl, '_blank');
          }
        } else {
          alert("Please select some text to translate.");
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup function to remove the event listener
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

  return (
    <>
      <Header />
      {children}
    </>
  )
} 