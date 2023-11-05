import { useCallback, useState } from 'react'

// Custom hook to manage command history using local storage
export const useCommandHistory = () => {
  const [history, setHistory] = useState<string[]>(() => {
    // Retrieve history from local storage or initialize as an empty array
    const savedHistory = localStorage.getItem('commandHistory')
    return savedHistory ? JSON.parse(savedHistory) : []
  })
  const [historyIndex, setHistoryIndex] = useState(history.length)

  // Function to add a command to history
  const addCommandToHistory = useCallback(
    (command: string) => {
      const newHistory = [...history, command]
      setHistory(newHistory)
      localStorage.setItem('commandHistory', JSON.stringify(newHistory))
      // Reset index to the new latest
      setHistoryIndex(newHistory.length)
    },
    [history]
  )

  // Function to move up or down in history
  const moveInHistory = useCallback(
    (direction: 'up' | 'down') => {
      if (direction === 'up' && historyIndex > 0) {
        setHistoryIndex((prevIndex) => prevIndex - 1)
      } else if (direction === 'down' && historyIndex < history.length - 1) {
        setHistoryIndex((prevIndex) => prevIndex + 1)
      }
    },
    [historyIndex, history.length]
  )

  // Function to get the current command from history
  const getCurrentCommand = useCallback(() => {
    return history[historyIndex] || ''
  }, [history, historyIndex])

  return { addCommandToHistory, moveInHistory, getCurrentCommand }
}
