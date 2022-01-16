import { useCallback, useEffect, useRef, useState } from 'react'
import { formatAudioProgress } from '../helpers/playerHelpers'
import { requestSpotifyEndpoint } from '../services/spotifyService'

export const useSpotifyPlayer = ({ token }) => {
  const [volume, setVolume] = useState(1)

  const [isActive, setIsActive] = useState(false)
  const [playbackState, setPlaybackState] = useState({
    isPlaying: false,
    muted: false,
    ready: false,
    shuffle: false,
    repeat: false,
    isFirst: false,
    isLast: false,
    progress: 0,
    progressCirumference: 0,
    duration: 0,
    updateTime: null
  })

  const audioSeekRef = useRef()
  const spotifyPlayerRef = useRef()

  const createSpotifySDKScript = useCallback(() => {
    const script = document.createElement('script')
    script.src = 'https://sdk.scdn.co/spotify-player.js'
    script.async = true

    document.body.appendChild(script)
  }, [])

  const initializeSpotifyWebPlayback = () => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      spotifyPlayerRef.current = new window.Spotify.Player({
        name: 'Louie Web Playback SDK',
        getOAuthToken: (cb) => {
          cb(token)
        },
        volume
      })

      const spotifyPlayer = spotifyPlayerRef.current

      spotifyPlayer.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id)

        const body = {
          device_ids: [device_id]
        }
        const options = {
          url: 'https://api.spotify.com/v1/me/player',
          method: 'PUT',
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          },
          data: body
        }
        setPlaybackState((state) => ({
          ...state,
          ready: true
        }))
        requestSpotifyEndpoint(options)
      })

      spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
        setPlaybackState((state) => ({
          ...state,
          ready: false
        }))
      })

      spotifyPlayer.addListener('player_state_changed', (state) => {
        if (!state) {
          return
        }

        updatePlaybackState()

        spotifyPlayer.getCurrentState().then((state) => {
          !state ? setIsActive(false) : setIsActive(true)
        })
      })

      spotifyPlayer.connect()
    }
  }

  const updatePlaybackState = () => {
    spotifyPlayerRef.current.getCurrentState().then((state) => {
      if (!state) {
        return
      }

      const {
        duration,
        context,
        position,
        paused,
        shuffle,
        repeat_mode,
        track_window
      } = state

      const { circularProgress } = formatAudioProgress(position, duration)

      const durationInSeconds = Math.floor(duration / 1000)
      const progressInSeconds = Math.floor(position / 1000)

      setPlaybackState((state) => ({
        ...state,
        isPlaying: !paused,
        shuffle: shuffle,
        currentTrack: {
          ...track_window.current_track,
          contextUri: context.uri
        },
        isFirst: track_window.previous_tracks.length === 0,
        isLast: track_window.next_tracks.length === 0,
        repeat: repeat_mode !== 0,
        progress: progressInSeconds,
        progressCirumference: circularProgress,
        duration: durationInSeconds,
        updateTime: performance.now()
      }))
    })
  }

  const updatePlayerProgress = () => {
    if (audioSeekRef.current) {
      cancelAnimationFrame(audioSeekRef.current)
    }
    updatePlaybackState()
    audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
  }

  const togglePlayPause = () => {
    spotifyPlayerRef.current
      .togglePlay()
      .then(() => {
        if (!playbackState.isPlaying) {
          updatePlayerProgress()
        } else {
          cancelAnimationFrame(audioSeekRef.current)
        }
        setPlaybackState((state) => ({ ...state, isPlaying: !state.isPlaying }))
      })
      .catch((error) => console.log(`ERROR: ${error}`))
  }

  const setSpotifyCurrentTrack = (track) => {
    if (audioSeekRef?.current) {
      cancelAnimationFrame(audioSeekRef)
    }
    const url = 'https://api.spotify.com/v1/me/player/play'

    const body = {
      context_uri: track.contextUri,
      offset: { uri: track.uri }
    }

    const options = {
      url,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      },
      data: body
    }

    requestSpotifyEndpoint(options).then((response) => {
      if (response?.status !== 204) {
        console.log(`ERROR: Something went wrong! Server response: ${response}`)
      } else {
        audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
      }
    })
  }

  const seekPlaybackProgress = (e) => {
    if (audioSeekRef?.current) {
      cancelAnimationFrame(audioSeekRef.current)
    }
    const seekInMS = e.target.value * 1000

    spotifyPlayerRef.current
      .seek(seekInMS)
      .then(() => {
        if (playbackState.isPlaying) {
          audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
        }
      })
      .catch((error) => console.log(`ERROR: ${error}`))
  }

  const skipNextTrack = () => {
    if (audioSeekRef?.current) {
      cancelAnimationFrame(audioSeekRef)
    }

    spotifyPlayerRef.current
      .nextTrack()
      .then(() => {
        updatePlayerProgress()
      })
      .catch((error) => console.log(`ERROR: ${error}`))
  }

  const skipPrevTrack = () => {
    if (audioSeekRef?.current) {
      cancelAnimationFrame(audioSeekRef)
    }

    spotifyPlayerRef.current
      .previousTrack()
      .then(() => {
        audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
      })
      .catch((error) => console.log(`ERROR: ${error}`))
  }

  const seekVolume = (e) => {
    const volumeRatio = e.target.value

    spotifyPlayerRef.current
      .setVolume(volumeRatio)
      .then(() => {
        setVolume(volumeRatio)
      })
      .catch((error) => console.log(`ERROR: ${error}`))
  }

  const setMutedVolume = () => {
    const { muted } = playbackState
    const newVolume = muted ? volume : 0

    spotifyPlayerRef.current
      .setVolume(newVolume)
      .then(() => {
        console.log(muted, volume)
        setPlaybackState((state) => ({
          ...state,
          muted: !state.muted
        }))
      })
      .catch((error) => console.log(`ERROR: ${error}`))
  }

  const setShuffleMode = () => {
    const state = playbackState.shuffle ? 'false' : 'true'
    const url = `https://api.spotify.com/v1/me/player/shuffle?state=${state}`
    const options = {
      url,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }

    requestSpotifyEndpoint(options)
      .then(() => {
        setPlaybackState((state) => ({
          ...state,
          shuffle: !state.shuffle
        }))
      })
      .catch((err) => console.log(err))
  }

  const setRepeatMode = () => {
    const state = playbackState.repeat ? 'off' : 'track'
    const url = `https://api.spotify.com/v1/me/player/repeat?state=${state}`
    const options = {
      url,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }
    requestSpotifyEndpoint(options)
      .then((response) => {
        if (response.status !== 204) {
          console.log('ERROR: ', response)
        }
        setPlaybackState((state) => ({
          ...state,
          repeat: !state.repeat
        }))
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (token) {
      createSpotifySDKScript()
      initializeSpotifyWebPlayback()
    }

    return () => {
      cancelAnimationFrame(audioSeekRef.current)
      spotifyPlayerRef.current?.disconnect()
    }
  }, [token])

  return {
    isActive,
    playbackState,
    volume,
    setSpotifyCurrentTrack,
    togglePlayPause,
    skipNextTrack,
    skipPrevTrack,
    seekPlaybackProgress,
    seekVolume,
    setMutedVolume,
    setShuffleMode,
    setRepeatMode
  }
}
