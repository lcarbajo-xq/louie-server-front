import { useEffect, useState } from 'react'
import { Route } from 'wouter'
import { NavLink } from '../../components/Header/NavLink'
import { Library } from '../../components/Library/Library'
import { PlayerFooter } from '../../components/Player/PlayerFooter/PlayerFooter'
import { SpotifyWebPlayer } from '../../components/Player/SpotifyPlayer/SpotifyWebPlayer'
import { Search } from '../../components/Search/Search'
import { useAppContext } from '../../context/AppContext'
import { useAudioPlayer } from '../../hooks/useAudioPlayer'
import { useSpotifyPlayer } from '../../hooks/useSpotifyPlayer'
import { useTheme } from '../../hooks/useTheme'
import { AppRouter } from '../../routers/AppRouter'
import { AlbumScreen } from '../Album/AlbumScreen'
import { ArtistsScreen } from '../Artist/ArtistsScreen'
import { NowPlayingScreen } from '../NowPlaying/NowPlayingScreen'
import { PlaylisScreen } from '../Playlist/PlaylisScreen'
import { TracksScreen } from '../Tracks/TracksScreen'
import './styles.scss'

export const AppScreen = () => {
  useTheme()
  const [{ bigPlayerSelected, currentTrack, accessToken }] = useAppContext()
  const [artist, setArtist] = useState({})
  const [album, setAlbum] = useState({})

  const {
    isActive,
    isPaused,
    playbackState,
    volume,
    setSpotifyCurrentTrack,
    togglePlayPause,
    skipNextTrack,
    skipPrevTrack,
    seekPlaybackProgress,
    seekVolume
  } = useSpotifyPlayer({ token: accessToken })

  // const {
  //   audioSrc,
  //   ready,
  //   loading,
  //   error,
  //   playing,
  //   paused,
  //   duration,
  //   mute,
  //   loop,
  //   volume,
  //   seek,
  //   progressCircumference,
  //   rate,
  //   audioElementRef,
  //   queueTrackNumber,
  //   isLast,
  //   onTogglePlayback,
  //   onPlay,
  //   onNext,
  //   onPrevious,
  //   onPause,
  //   onError,
  //   onAbort,
  //   onMute,
  //   onLoop,
  //   onLoadedData,
  //   onVolume,
  //   onRate,
  //   onSeek
  // } = useAudioPlayer({
  //   preload: true,
  //   autoplay: false,
  //   volume: 0.5,
  //   mute: false,
  //   loop: false,
  //   rate: 1.0
  // })

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
          <Search setSpotifyCurrentTrack={setSpotifyCurrentTrack} />
        </Route>
        <Route path='/library'>
          <Library setArtist={setArtist} setAlbum={setAlbum} />
        </Route>
        <Route path='/tracks'>
          <TracksScreen />
        </Route>
        <Route path='/player'>
          <NowPlayingScreen
            trackNumber={0}
            isLast={false}
            ready={isActive}
            playing={!isPaused}
            duration={playbackState.duration}
            volume={volume}
            mute={false}
            seek={playbackState.progress}
            onTogglePlayback={togglePlayPause}
            onVolume={seekVolume}
            onSeek={seekPlaybackProgress}
            onMute={() => {}}
            onNext={skipNextTrack}
            onPrevious={skipPrevTrack}
          />
          {/* <NowPlayingScreen
            trackNumber={queueTrackNumber}
            isLast={isLast}
            ready={ready}
            playing={playing}
            duration={duration}
            volume={volume}
            mute={mute}
            seek={seek}
            onTogglePlayback={onTogglePlayback}
            onVolume={onVolume}
            onSeek={onSeek}
            onMute={onMute}
            onNext={onNext}
            onPrevious={onPrevious}
          /> */}
        </Route>
        <Route path='/library/artist/:id'>
          {(params) => <ArtistsScreen artist={artist} id={params.id} />}
        </Route>
        <Route path='/library/album/:id'>
          {(params) => <AlbumScreen album={album} id={params.id} />}
        </Route>
        <Route path='/library/playlist/:id'>
          {(params) => (
            <PlaylisScreen
              id={params.id}
              setSpotifyCurrentTrack={setSpotifyCurrentTrack}
            />
          )}
        </Route>
      </AppRouter>
      {/* <audio
        onCanPlay={onLoadedData}
        onLoadedMetadata={onLoadedData}
        ref={audioElementRef}
        src={audioSrc}
        onError={onError}
        onAbort={onAbort}
        preload='metadata'
      /> */}
      {!bigPlayerSelected && (
        <footer className='app-player'>
          {/* <PlayerFooter
            onTogglePlayback={onTogglePlayback}
            playing={playing}
            ready={ready}
            progressCircumference={progressCircumference}
          /> */}

          <SpotifyWebPlayer
            isActive={isActive}
            isPlaying={!isPaused}
            togglePlayPause={togglePlayPause}
            currentTrack={currentTrack}
            progressCirumference={playbackState.progressCirumference}
          />
        </footer>
      )}
      {/* </Route> */}
      {/* </AppRouter> */}
    </div>
  )
}
