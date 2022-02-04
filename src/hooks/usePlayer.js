import { useEffect } from 'react/cjs/react.production.min'
import { useAudioPlayer } from './useAudioPlayer'
import { useSpotifyPlayer } from './useSpotifyPlayer'

export const usePlayer = ({ token, currentTrack }) => {
  const localPlayer = useAudioPlayer({
    autoplay: false,
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
  return {
    player: currentTrack?.source === 'local' ? localPlayer : spotifyPlayer
  }
}
