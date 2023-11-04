/**
 * @file This file contains the definition and implementation of the Language context.
 * The context helps in maintaining and accessing the current language setting of the app.
 */

import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { TRANSLATIONS } from '../i18n/translations'

export type LanguageOption = 'GERMAN' | 'ENGLISH' | 'SPANISH'

/**
 * @interface LanguageContextProps
 * Defines the shape of the Language context.
 */
interface LanguageContextProps {
  /**
   * The currently selected language.
   */
  language: LanguageOption
  /**
   * Function to set the current language.
   * @param value The new language option to set.
   */
  setLanguage: (value: LanguageOption) => void
  /**
   * The translation data for the current language.
   */
  data: (typeof TRANSLATIONS)[LanguageOption]
}

/**
 * @interface LanguageProviderProps
 * Defines the props for the LanguageProvider component.
 */
interface LanguageProviderProps {
  /**
   * Children components that will have access to the Language context.
   */
  children: ReactNode
}

// Create a context with a default value.
const LanguageContext = createContext<LanguageContextProps>(
  {} as LanguageContextProps
)

/**
 * The LanguageProvider component. It wraps around components that need access to the Language context.
 * @param {LanguageProviderProps} props The props containing child components.
 */
export function LanguageProvider({ children }: LanguageProviderProps) {
  // Initial state
  const [language, setLanguage] = useState<LanguageOption>('SPANISH')

  // Check localStorage for a previously set language
  useEffect(() => {
    const languageInLocalStorage =
      (localStorage.getItem('language') as LanguageOption) || 'SPANISH'
    setLanguage(languageInLocalStorage)
  }, [])

  // Retrieve the translations for the current language
  const data = TRANSLATIONS[language]

  // Prepare the value for the Provider
  const value = {
    language,
    setLanguage,
    data,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

/**
 * Custom hook to access LanguageContext.
 * @throws {Error} Throws an error if used outside of LanguageProvider.
 * @returns {LanguageContextProps} The Language context value.
 */
export function useLanguageContext(): LanguageContextProps {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguageContext must be used within a LanguageProvider')
  }
  return context
}
