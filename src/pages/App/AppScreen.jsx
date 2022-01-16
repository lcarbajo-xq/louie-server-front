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
import { PlaylistScreen } from '../Playlist/PlaylistScreen'
import { TracksScreen } from '../Tracks/TracksScreen'
import './styles.scss'

export const AppScreen = () => {
  useTheme()
  const [{ bigPlayerSelected, accessToken }] = useAppContext()
  const [artist, setArtist] = useState({})
  const [album, setAlbum] = useState({})

  // const {
  //   isActive,
  //   playbackState,
  //   volume,
  //   setSpotifyCurrentTrack,
  //   togglePlayPause,
  //   skipNextTrack,
  //   skipPrevTrack,
  //   seekPlaybackProgress,
  //   seekVolume,
  //   setMutedVolume,
  //   setShuffleMode,
  //   setRepeatMode
  // } = useSpotifyPlayer({ token: accessToken })

  const {
    audioSrc,
    playbackState,
    loading,
    error,
    volume,
    audioElementRef,
    queueTrackNumber,
    setLocalCurrentTrack,
    togglePlayPause,
    skipNextTrack,
    skipPrevTrack,
    seekPlaybackProgress,
    seekVolume,
    setMutedVolume,
    setShuffleMode,
    setRepeatMode,
    onError,
    onEnd,
    onAbort,
    // onPlay,
    // onPause,
    onSetUpTrackList,
    onLoadedData,
    onRate
  } = useAudioPlayer({
    autoplay: true
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
          <Search setCurrentTrack={setLocalCurrentTrack} />
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
            currentTrack={playbackState.currentTrack}
            isLast={playbackState.isLast}
            isFirst={playbackState.isFirst}
            ready={playbackState.ready}
            playing={playbackState.isPlaying}
            duration={playbackState.duration}
            volume={volume}
            shuffle={playbackState.shuffle}
            repeat={playbackState.repeat}
            mute={playbackState.muted}
            seek={playbackState.progress}
            onTogglePlayback={togglePlayPause}
            onVolume={seekVolume}
            onSeek={seekPlaybackProgress}
            onMute={setMutedVolume}
            onNext={skipNextTrack}
            onPrevious={skipPrevTrack}
            onShuffle={setShuffleMode}
            onRepeat={setRepeatMode}
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
            <PlaylistScreen
              id={params.id}
              setSpotifyCurrentTrack={setLocalCurrentTrack}
            />
          )}
        </Route>
      </AppRouter>
      <audio
        onCanPlay={onLoadedData}
        onLoadedMetadata={onLoadedData}
        ref={audioElementRef}
        src={
          playbackState?.currentTrack &&
          `http://localhost:5000/tracks/play/${playbackState.currentTrack._id}`
        }
        onError={onError}
        onAbort={onAbort}
        preload='metadata'
      />
      {!bigPlayerSelected && (
        <footer className='app-player'>
          <PlayerFooter
            currentTrack={playbackState.currentTrack}
            onTogglePlayback={togglePlayPause}
            playing={playbackState.isPlaying}
            ready={playbackState.ready}
            progressCircumference={playbackState.progressCirumference}
          />

          {/* <SpotifyWebPlayer
            isActive={isActive}
            isPlaying={playbackState.play}
            togglePlayPause={togglePlayPause}
            currentTrack={playbackState.currentTrack}
            progressCirumference={playbackState.progressCirumference}
          /> */}
        </footer>
      )}
      {/* </Route> */}
      {/* </AppRouter> */}
    </div>
  )
}
