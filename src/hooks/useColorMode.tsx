import { useCallback, useState } from 'react'
import { ColorMode } from 'react-terminal-ui'

export function useColorMode(initialMode: ColorMode = ColorMode.Dark) {
  const [colorMode, setColorMode] = useState<ColorMode>(initialMode)

  const toggleColorMode = useCallback(() => {
    setColorMode((prevMode) =>
      prevMode === ColorMode.Light ? ColorMode.Dark : ColorMode.Light
    )
  }, [])

  return { colorMode, toggleColorMode }
}
