import { useState } from 'react'
import { Route, Router } from 'wouter'
import { NavLink } from '../../components/Header/NavLink'
import { Library } from '../../components/Library/Library'
import { PlayerFooter } from '../../components/Player/PlayerFooter/PlayerFooter'
import { usePlayer } from '../../components/Player/usePlayer'
import { Search } from '../../components/Search/Search'
import { useAppContext } from '../../context/AppContext'
import { useTheme } from '../../hooks/useTheme'
import { AppRouter } from '../../routers/AppRouter'
import { LibraryRouter } from '../../routers/LibraryRouter'
import { ArtistsScreen } from '../Artist/ArtistsScreen'
import { NowPlayingScreen } from '../NowPlaying/NowPlayingScreen'
import { TracksScreen } from '../Tracks/TracksScreen'
import './styles.scss'

export const AppScreen = () => {
  const { currentTheme } = useTheme()
  const { handlePlay } = usePlayer()
  const [bigPLayerSelected, toggleBigPLayerSelected] = useState(false)
  const [artist, setArtist] = useState({})

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
      {/* <AppRouter base='/app'> */}
      {/* <Route path='/home'> */}
      <AppRouter>
        <Route path='/home'>
          <Search />
        </Route>
        <Route path='/library'>
          <Library setArtist={setArtist} />
        </Route>
        <Route path='/tracks'>
          <TracksScreen handlePlay={handlePlay} />
        </Route>
        <Route path='/player'>
          <NowPlayingScreen />
        </Route>
        <Route path='/library/artist/:id'>
          {(params) => <ArtistsScreen artist={artist} id={params.id} />}
        </Route>
      </AppRouter>
      {!bigPLayerSelected && (
        <footer className='app-player'>
          <PlayerFooter handleClickPlayer={toggleBigPLayerSelected} />
        </footer>
      )}
      {/* </Route> */}
      {/* </AppRouter> */}
    </div>
  )
}
