import { useState } from 'react'
import { Route } from 'wouter'
import { NavLink } from '../../components/Header/NavLink'
import { Library } from '../../components/Library/Library'
import { PlayerFooter } from '../../components/Player/PlayerFooter/PlayerFooter'
import { Search } from '../../components/Search/Search'
import { useAppContext } from '../../context/AppContext'
import { useTheme } from '../../hooks/useTheme'
import { AppRouter } from '../../routers/AppRouter'
import { AlbumScreen } from '../Album/AlbumScreen'
import { ArtistsScreen } from '../Artist/ArtistsScreen'
import { PlaylistScreen } from '../Playlist/PlaylistScreen'
import { TracksScreen } from '../Tracks/TracksScreen'
import './styles.scss'

export const AppScreen = () => {
  useTheme()
  const [{ accessToken }] = useAppContext()
  const [artist, setArtist] = useState({})
  const [album, setAlbum] = useState({})

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
      <AppRouter>
        <Route path='/home'>
          <Search />
        </Route>
        <Route path='/library'>
          <Library setArtist={setArtist} setAlbum={setAlbum} />
        </Route>
        <Route path='/tracks'>
          <TracksScreen />
        </Route>

        <Route path='/library/artist/:id'>
          {(params) => <ArtistsScreen artist={artist} id={params.id} />}
        </Route>
        <Route path='/library/album/:id'>
          {(params) => <AlbumScreen album={album} id={params.id} />}
        </Route>
        <Route path='/library/playlist/:id'>
          {(params) => <PlaylistScreen id={params.id} />}
        </Route>
      </AppRouter>

      <PlayerFooter token={accessToken} />
    </div>
  )
}
