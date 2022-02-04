import { useEffect, useRef, useState } from 'react'
import { DBACTIONS } from '../actions/dbActions'
import { useAppContext } from '../context/AppContext'
import { formatAudioProgress } from '../helpers/playerHelpers'

const { requestAnimationFrame, cancelAnimationFrame, localStorage } = window

export const useAudioPlayer = ({ autoplay = false }) => {
  const [{ queue, selectedTrack }, dispatch] = useAppContext()
  const [playbackState, setPlaybackState] = useState({
    duration: 0,
    isFirst: false,
    isLast: false,
    isPlaying: autoplay,
    muted: false,
    progress: 0,
    rate: 1.0,
    progressCirumference: 0,
    ready: false,
    repeat: false,
    shuffle: false,
    updateTime: null
  })
  const [audioIndex, setAudioIndex] = useState(0)
  const [audioLoading, setAudioLoading] = useState(true)
  const [audioError, setAudioError] = useState('')
  const [volume, setVolume] = useState(1)

  const audioSeekRef = useRef()
  const audioElementRef = useRef()

  useEffect(() => {
    return () => {
      console.log('DESMONATNDO AUDIO PLAYER')
      audioSeekRef?.current && cancelAnimationFrame(audioSeekRef.current)
    }
  }, [])

  useEffect(() => {
    audioSeekRef?.current && cancelAnimationFrame(audioSeekRef.current)
    if (selectedTrack?.source === 'local') {
      if (selectedTrack?._id !== playbackState?.currentTrack?.id) {
        setLocalCurrentTrack(selectedTrack)
      }
    } else {
      setPlaybackState((state) => ({
        ...state,
        isPlaying: false
      }))
    }
  }, [selectedTrack])

  useEffect(() => {
    setPlaybackState((state) => ({
      ...state,
      progress: 0
    }))
    if (queue[audioIndex]) {
      // setAudioSrc(`${BASE_URLS.play}${queue[audioIndex]._id}`)
      dispatch({
        type: DBACTIONS.SET_CURRENT_TRACK,
        payload: queue[audioIndex]
      })
    }
  }, [audioIndex, queue])

  // Instance of load the Audio Element once it is created

  const onAbort = () => setAudioError('Abort Error')
  const onError = (err) => setAudioError('Error: ', err)
  const onLoadedData = () => {
    updatePlaybackState()
    setAudioLoading(false)
    if (playbackState.isPlaying) {
      play()
    }
  }

  const updatePlaybackState = () => {
    const { currentTime, duration } = audioElementRef?.current
    const { circularProgress } = formatAudioProgress(currentTime, duration)

    setPlaybackState((state) => {
      const newState = {
        ...state,
        duration,
        currentTrack: selectedTrack,
        ready: true,
        progress: currentTime,
        isFirst: audioIndex === 0,
        isLast: audioIndex === queue?.length - 1,
        progressCirumference: circularProgress
      }

      return newState
    })

    if (selectedTrack.source === 'local') {
      localStorage.setItem('current-track', JSON.stringify(selectedTrack))
    }
  }

  const updatePlayerProgress = () => {
    if (audioSeekRef.current) {
      cancelAnimationFrame(audioSeekRef.current)
    }
    if (audioElementRef?.current) {
      const { currentTime, duration } = audioElementRef?.current
      const { circularProgress } = formatAudioProgress(currentTime, duration)

      setPlaybackState((state) => ({
        ...state,
        progressCircumference: circularProgress,
        progress: currentTime
      }))
    }

    audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
  }

  const play = () => {
    setPlaybackState((state) => {
      return {
        ...state,
        isPlaying: true
      }
    })
    audioElementRef.current.play()

    audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
  }

  const pause = () => {
    setPlaybackState((state) => {
      return {
        ...state,
        isPlaying: false
      }
    })
    audioElementRef.current.pause()

    cancelAnimationFrame(audioSeekRef.current)
  }

  const togglePlayPause = () => {
    if (playbackState.isPlaying) {
      pause()
    } else {
      play()
    }
  }

  const setLocalCurrentTrack = (track) => {
    if (audioSeekRef?.current) {
      cancelAnimationFrame(audioSeekRef.current)
    }
    setPlaybackState((state) => ({
      ...state,
      currentTrack: track
    }))
  }

  const onSetUpTrackList = () => {
    // setAudioPlaying(true)
    // setAudioPaused(false)
    // tracks = trackList.map((track) => {
    //   return {
    //     ...track,
    //     ...{
    //       source: `${BASE_URLS.play}${track._id}`
    //     }
    //   }
    // })
    dispatch({
      type: DBACTIONS.SET_TRACK_LIST,
      payload: queue
    })
  }

  const skipNextTrack = () => {
    setAudioIndex((prev) => prev + 1)
    updatePlayerProgress()
  }

  const skipPrevTrack = () => {
    setAudioIndex((prev) => prev - 1)
    updatePlayerProgress()
  }

  const onEnd = () => {
    setPlaybackState((state) => ({
      ...state,
      isPlaying: false,
      progress: 0,
      progressCirumference: 0
    }))
    setAudioLoading(false)
    setAudioError('')
  }

  const setMutedVolume = () => {
    const { muted } = playbackState
    audioElementRef.current.muted = !muted
    setPlaybackState((state) => ({
      ...state,
      muted: !state.muted
    }))
  }

  const setRepeatMode = () => {
    const { repeat } = playbackState
    audioElementRef.current.loop = !repeat
    setPlaybackState((state) => ({
      ...state,
      repeat: !state.repeat
    }))
  }

  const setShuffleMode = () => {
    setPlaybackState((state) => ({
      ...state,
      shuffle: !state.shuffle
    }))
  }

  const seekVolume = (e) => {
    const volume = parseFloat(e.target.value)
    setVolume(volume)
    setPlaybackState((state) => ({
      ...state,
      muted: false
    }))
    audioElementRef.current.muted = false
    audioElementRef.current.volume = volume
  }

  const onRate = (e) => {
    const rate = parseFloat(e.target.value)
    setPlaybackState((state) => ({
      ...state,
      rate
    }))
    audioElementRef.current.playbackRate = rate
  }

  const seekPlaybackProgress = (e) => {
    if (audioSeekRef?.current) {
      cancelAnimationFrame(audioSeekRef.current)
    }

    const seek = parseFloat(e.target.value)

    audioElementRef.current.currentTime = seek
  }

  return {
    playbackState,
    loading: audioLoading,
    error: audioError,
    volume: volume,
    audioElementRef,
    queueTrackNumber: audioIndex,
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
    onSetUpTrackList,
    onLoadedData,
    onRate
  }
}
