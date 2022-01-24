import { useEffect } from 'react'
import { DBACTIONS } from '../../../actions/dbActions'
import { useAppContext } from '../../../context/AppContext'
import { useAudioPlayer } from '../../../hooks/useAudioPlayer'
import { useSpotifyPlayer } from '../../../hooks/useSpotifyPlayer'
import { MinifiedPlayer } from '../MinifiedPlayer'
import { NowPlayingPlayer } from '../NowPlayingPlayer/NowPlayingPlayer'
import './styles.scss'

export const PlayerFooter = ({ currentTrack, token }) => {
  const [{ bigPlayerSelected }, dispatch] = useAppContext()
  const localPlayer = useAudioPlayer({
    autoplay: true,
    track: currentTrack
  })

  const spotifyPlayer = useSpotifyPlayer({
    token
  })

  useEffect(() => {
    if (currentTrack?.source === 'spotify') {
      spotifyPlayer?.setSpotifyCurrentTrack(currentTrack)
    } else if (spotifyPlayer?.playbackState?.isPlaying) {
      spotifyPlayer?.togglePlayPause()
    }
  }, [currentTrack])

  const player = currentTrack?.source === 'local' ? localPlayer : spotifyPlayer

  const handleTogglePlayer = () => {
    dispatch({
      type: DBACTIONS.SET_BIG_PLAYER_UI,
      payload: true
    })
  }

  return (
    <footer className={`app-player${!bigPlayerSelected ? ' minified' : ''}`}>
      <audio
        onCanPlay={localPlayer?.onLoadedData}
        onLoadedMetadata={localPlayer?.onLoadedData}
        onEnded={localPlayer?.onEnd}
        ref={localPlayer?.audioElementRef}
        src={
          currentTrack &&
          `http://localhost:5000/tracks/play/${currentTrack._id}`
        }
        onError={localPlayer?.onError}
        onAbort={localPlayer?.onAbort}
        preload='metadata'
      />
      {bigPlayerSelected ? (
        <NowPlayingPlayer player={player} />
      ) : (
        <MinifiedPlayer player={player} togglePlayer={handleTogglePlayer} />
      )}
    </footer>
  )
}
