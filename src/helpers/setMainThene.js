
export const setMainThene = () => {
  const theme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
  if (theme) document.documentElement.setAttribute('data-theme', theme)
}

export const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  const targetTheme = currentTheme === 'light' ? 'dark' : 'light'

  document.documentElement.setAttribute('data-theme', targetTheme)
}
