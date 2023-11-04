import { useEffect, useState } from 'react'

export function useFlags(defaultFlags: string[] = []) {
  const [flags, setFlags] = useState<string[]>(defaultFlags)

  // Initialize flags from localStorage
  useEffect(() => {
    const savedFlags = localStorage.getItem('FLAGS')
    if (savedFlags) {
      setFlags(JSON.parse(savedFlags))
    }
  }, [])

  // Update localStorage whenever the flags change
  useEffect(() => {
    if (flags.length > 0) {
      localStorage.setItem('FLAGS', JSON.stringify(flags))
    }
  }, [flags])

  return [flags, setFlags] as const
}
