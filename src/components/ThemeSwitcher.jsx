import { useState } from 'react'
import { DarkModeSwitch } from 'react-toggle-dark-mode'
import useDarkTheme from 'hooks/useDarkTheme'

function ThemeSwitcher() {
  const [colorTheme, setTheme] = useDarkTheme()
  const [darkTheme, setDarkTheme] = useState(
    colorTheme === 'light' ? true : false
  )

  const toggleDarkMode = checked => {
    setTheme(colorTheme)
    setDarkTheme(checked)
  }

  return (
    <>
      <DarkModeSwitch
        style={{ marginBottom: '1rem' }}
        checked={darkTheme}
        onChange={toggleDarkMode}
        size={24}
        sunColor='white'
        moonColor='white'
      />
    </>
  )
}

export default ThemeSwitcher
