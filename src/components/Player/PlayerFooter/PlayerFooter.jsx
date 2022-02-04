import { useEffect, useState } from 'react'
import { DBACTIONS } from '../../../actions/dbActions'
import { useAppContext } from '../../../context/AppContext'
import { useAudioPlayer } from '../../../hooks/useAudioPlayer'
import { useSpotifyPlayer } from '../../../hooks/useSpotifyPlayer'
import { MinifiedPlayer } from '../MinifiedPlayer'
import { NowPlayingPlayer } from '../NowPlayingPlayer/NowPlayingPlayer'
import './styles.scss'

export const PlayerFooter = () => {
  const [{ bigPlayerSelected, accessToken, selectedTrack }, dispatch] =
    useAppContext()
  const [loading, setLoading] = useState(false)
  const localPlayer = useAudioPlayer({
    autoplay: false
  })

  const spotifyPlayer = useSpotifyPlayer({
    token: accessToken,
    setLoading
  })

  useEffect(() => {
    if (
      selectedTrack?.source === 'local' &&
      spotifyPlayer?.playbackState?.isPlaying
    ) {
      spotifyPlayer?.togglePlayPause()
    }
  }, [selectedTrack])

  const player = selectedTrack?.source === 'local' ? localPlayer : spotifyPlayer

  const handleTogglePlayer = () => {
    dispatch({
      type: DBACTIONS.SET_BIG_PLAYER_UI,
      payload: true
    })
  }

  return (
    <footer className={`app-player${!bigPlayerSelected ? ' minified' : ''}`}>
      {selectedTrack?.source === 'local' && (
        <audio
          onCanPlay={localPlayer?.onLoadedData}
          onEnded={localPlayer?.onEnd}
          ref={localPlayer?.audioElementRef}
          src={
            selectedTrack &&
            `http://localhost:5000/tracks/play/${selectedTrack._id}`
          }
          onError={localPlayer?.onError}
          onAbort={localPlayer?.onAbort}
          preload='metadata'
        />
      )}
      {bigPlayerSelected ? (
        <NowPlayingPlayer player={player} isLoading={loading} />
      ) : (
        <MinifiedPlayer
          player={player}
          togglePlayer={handleTogglePlayer}
          isLoading={loading}
        />
      )}
    </footer>
  )
}
