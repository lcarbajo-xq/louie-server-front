import { Route, Router, Switch } from 'wouter'
import { NavLink } from '../components/Header/NavLink'
import { Library } from '../components/Library/Library'
import { Player } from '../components/Player/Player'
import { useTheme } from '../hooks/useTheme'
import { AppRouter } from '../routers/AppRouter'
import './styles.scss'
export const AppLayout = () => {
  const { currentTheme } = useTheme()
  return (
    <div className='app'>
      <section className='app-menu'>
        <NavLink href='/app/home' title='Home' icon='track_changes' />
        <NavLink href='/app/library' title='Library' icon='library_music' />
        <NavLink href='/app/tracks' title='Tracks' icon='speaker_group' />
        <div className='grow'></div>
        <NavLink
          href='/settings'
          title='Settings'
          icon='settings_applications'
        />
      </section>
      <AppRouter />

      <footer className='app-player'>
        <Player />
      </footer>
    </div>
  )
}
