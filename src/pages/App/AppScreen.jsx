import { useState } from 'react'
import { Route } from 'wouter'
import { NavLink } from '../../components/Header/NavLink'
import { Library } from '../../components/Library/Library'
import { PlayerFooter } from '../../components/Player/PlayerFooter/PlayerFooter'
import { Search } from '../../components/Search/Search'
import { useAppContext } from '../../context/AppContext'
import { useAudioPlayer2 } from '../../hooks/useAudioPlayer2'
import { useTheme } from '../../hooks/useTheme'
import { AppRouter } from '../../routers/AppRouter'
import { AlbumScreen } from '../Album/AlbumScreen'
import { ArtistsScreen } from '../Artist/ArtistsScreen'
import { NowPlayingScreen } from '../NowPlaying/NowPlayingScreen'
import { TracksScreen } from '../Tracks/TracksScreen'
import './styles.scss'

export const AppScreen = () => {
  useTheme()
  const [{ bigPlayerSelected }] = useAppContext()
  const [artist, setArtist] = useState({})
  const [album, setAlbum] = useState({})

  const {
    audioSrc,
    ready,
    loading,
    error,
    playing,
    paused,
    duration,
    mute,
    loop,
    volume,
    seek,
    progressCircumference,
    rate,
    audioElementRef,
    onTogglePlayback,
    onPlay,
    onPause,
    onMute,
    onLoop,
    onVolume,
    onRate,
    onSeek
  } = useAudioPlayer2({
    preload: true,
    autoplay: false,
    volume: 0.5,
    mute: false,
    loop: false,
    rate: 1.0
  })

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
          <Library setArtist={setArtist} setAlbum={setAlbum} />
        </Route>
        <Route path='/tracks'>
          <TracksScreen />
        </Route>
        <Route path='/player'>
          <NowPlayingScreen
            ready={ready}
            playing={playing}
            duration={duration}
            volume={volume}
            seek={seek}
            onTogglePlayback={onTogglePlayback}
            onVolume={onVolume}
            onSeek={onSeek}
          />
        </Route>
        <Route path='/library/artist/:id'>
          {(params) => <ArtistsScreen artist={artist} id={params.id} />}
        </Route>
        <Route path='/library/album/:id'>
          {(params) => <AlbumScreen album={album} id={params.id} />}
        </Route>
      </AppRouter>
      <audio ref={audioElementRef} src={audioSrc} preload='metadata' />
      {!bigPlayerSelected && (
        <footer className='app-player'>
          <PlayerFooter
            onTogglePlayback={onTogglePlayback}
            playing={playing}
            ready={ready}
            progressCircumference={progressCircumference}
          />
        </footer>
      )}
      {/* </Route> */}
      {/* </AppRouter> */}
    </div>
  )
}
