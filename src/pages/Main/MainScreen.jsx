import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import { NavLink } from '../../components/Header/NavLink'
import './styles.scss'
import { Player } from '../../components/Player/Player'
import { Library } from '../../components/Library/Library'

export const MainScreen = () => {
  const { toggleTheme, currentTheme } = useTheme()
  return (
    <div className='app'>
      <section className='app-menu'>
        <NavLink href='/home' title='Home' icon='track_changes' />
        <NavLink href='/library' title='Library' icon='library_music' />
        <NavLink href='/tracks' title='Tracks' icon='speaker_group' />
        <div className='grow'></div>
        <NavLink
          href='/settings'
          title='Settings'
          icon='settings_applications'
        />
      </section>
      <main className='app-content'>
        <Library />
      </main>
      <footer className='app-player'>
        <Player />
      </footer>
    </div>
  )
}
