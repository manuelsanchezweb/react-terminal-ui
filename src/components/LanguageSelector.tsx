import React from 'react'
import { useLanguageContext, LanguageOption } from '../ctx/LanguageContext'

export const LanguageSelector = () => {
  const { setLanguage, language, data } = useLanguageContext()

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLanguage(event.target.value as LanguageOption)
    localStorage.setItem('language', event.target.value)
  }

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="language">{data.settings.switcherLanguage}</label>
      <select
        id="language"
        name="language"
        className="text-2xl bg-transparent"
        onChange={handleLanguageChange}
        value={language}
      >
        <option value="ENGLISH">🇺🇸</option>
        <option value="GERMAN">🇩🇪</option>
        <option value="SPANISH">🇪🇸</option>
      </select>
    </div>
  )
}
