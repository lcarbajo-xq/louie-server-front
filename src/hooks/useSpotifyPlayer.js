import { useCallback, useEffect, useRef, useState } from 'react'
import { circumference } from '../constants/progressConstants'
import axios from 'axios'
import { useAppContext } from '../context/AppContext'

// const track = {
//   name: '',
//   album: {
//     images: [{ url: '' }]
//   },
//   artists: [{ name: '' }]
// }

const formatAudioProgress = (progress, duration) => {
  const seekProgress = progress / duration
  const circularProgress = Math.floor(seekProgress * circumference)
  return { circularProgress }
}

export const useSpotifyPlayer = ({ token }) => {
  const [{ currentTrack: spotifyTrack }] = useAppContext()

  const [volume, setVolume] = useState(1)
  const [playback, setPlayback] = useState(0)
  const [playInfo, setPlayInfo] = useState({
    album: {},
    artists: [],
    name: '',
    id: ''
  })

  const [currentTrack, setCurrentTrack] = useState(spotifyTrack)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [playbackState, setPlaybackState] = useState({
    play: false,
    shuffle: false,
    repeat: false,
    progress: 0,
    progressCirumference: 0,
    total_time: 0,
    updateTime: null
  })

  const audioSeekRef = useRef()
  const spotifyPlayerRef = useRef()

  const requestSpotifyEndpoint = async (options) => {
    return await axios(options)
  }

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
        volume: 0.5
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
        console.log(options)
        requestSpotifyEndpoint(options)
      })

      spotifyPlayer.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id)
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
      const { duration, position, paused, shuffle, repeat_mode, track_window } =
        state

      const { circularProgress } = formatAudioProgress(position, duration)

      setPlaybackState((state) => ({
        ...state,
        play: !paused,
        shuffle: shuffle,
        repeat: repeat_mode !== 0,
        progress: position,
        progressCirumference: circularProgress,
        total_time: duration,
        updateTime: performance.now()
      }))
      setCurrentTrack(track_window.current_track)
      setIsPaused(paused)
    })
  }

  const updatePlayerProgress = () => {
    updatePlaybackState()
    audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
  }

  const togglePlayPause = () => {
    const url = playbackState.play
      ? 'https://api.spotify.com/v1/me/player/pause'
      : 'https://api.spotify.com/v1/me/player/play'

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
          console.log(
            `ERROR: Something went wrong! Server response: ${response}`
          )
        } else {
          if (!playbackState.play) {
            audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
          } else {
            cancelAnimationFrame(audioSeekRef.current)
          }
          setPlaybackState((state) => ({ ...state, play: !state.play }))
        }
      })
      .catch((error) => console.log(`ERROR: ${error}`))
  }

  const setSpotifyCurrentTrack = () => {
    if (spotifyTrack) {
      if (audioSeekRef?.current) {
        cancelAnimationFrame(audioSeekRef)
      }
      const url = 'https://api.spotify.com/v1/me/player/play'

      const body = {
        context_uri: spotifyTrack.contextUri,
        offset: { uri: spotifyTrack.uri }
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

      console.log(options)

      requestSpotifyEndpoint(options).then((response) => {
        if (response?.status !== 204) {
          console.log(
            `ERROR: Something went wrong! Server response: ${response}`
          )
        } else {
          audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
        }
      })
    }
  }

  const skipNextTrack = () => {
    if (audioSeekRef?.current) {
      cancelAnimationFrame(audioSeekRef)
    }
    const url = 'https://api.spotify.com/v1/me/player/next'

    const options = {
      url,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }

    requestSpotifyEndpoint(options)
      .then((response) => {
        if (response.status !== 204) {
          console.log(
            `ERROR: Something went wrong! Server response: ${response.status}`
          )
        }
        audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
      })
      .catch((error) => console.log(`ERROR: ${error}`))
  }

  useEffect(() => {
    createSpotifySDKScript()
    initializeSpotifyWebPlayback()

    return () => {
      cancelAnimationFrame(audioSeekRef.current)
      spotifyPlayerRef.current.disconnect()
    }
  }, [token])

  useEffect(() => {
    setSpotifyCurrentTrack()
  }, [spotifyTrack])

  return {
    isActive,
    isPaused,
    currentTrack,
    playbackState,
    togglePlayPause,
    skipNextTrack
  }
}
