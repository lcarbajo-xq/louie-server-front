import debounce from 'just-debounce-it'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DBACTIONS } from '../../actions/dbActions'
import { BASE_URLS } from '../../constants/endpoints'
import { circumference } from '../../constants/progressConstants'
import { useAppContext } from '../../context/AppContext'

export const usePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [audioSrc, setAudioSrc] = useState('')
  const [currentTime, setCurrentTime] = useState(0)
  const [circumferenceProgress, setCircumferenceProgress] = useState(0)
  const [{ currentTrack }, dispatch] = useAppContext()

  const audioRef = useRef()
  const progressRef = useRef()
  const animationRef = useRef()

  useEffect(() => {
    console.log(audioSrc)
    return () => {
      animationRef?.current && cancelAnimationFrame(animationRef.current)
    }
  }, [])

  useEffect(() => {
    setIsPlaying(false)
    setAudioSrc(currentTrack?._id ? `${BASE_URLS.play}${currentTrack._id}` : '')
    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [currentTrack])

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const seconds = Math.floor(audioRef.current.duration)
      setDuration(seconds)
      if (progressRef.current) {
        progressRef.current.max = seconds
      }
    }
  }

  const onChangeRange = () => {
    audioRef.current.currentTime = progressRef.current.value
    // changePlayerCurrentTime()
    console.log(audioRef.current.currentTime)
  }

  const togglePlayPause = () => {
    const prevIsPlaying = isPlaying
    setIsPlaying(!prevIsPlaying)
    audioRef.current.currentTime = 70
    if (!prevIsPlaying) {
      audioRef?.current?.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioRef?.current?.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }

  const changePlayerCurrentTime = () => {
    const newTime = (audioRef.current.currentTime / duration) * 100

    progressRef.current.style.setProperty('--seek-before-width', `${newTime}%`)
    setCurrentTime(progressRef.current.value)
  }

  const whilePlaying = () => {
    if (audioRef?.current?.duration) {
      const value = audioRef?.current?.currentTime / duration
      const currentProgressCircumference = Math.floor(value * circumference)
      progressRef.current.value = audioRef.current.currentTime
      setCircumferenceProgress(currentProgressCircumference)
      changePlayerCurrentTime()
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
  }

  const handlePlay = (trackClicked) => {
    if (trackClicked._id !== currentTrack?._id) {
      setIsPlaying(false)
      dispatch({
        type: DBACTIONS.SET_CURRENT_TRACK,
        payload: { track: trackClicked }
      })
    }
  }

  return {
    audioSrc,
    onLoadedMetadata,
    togglePlayPause,
    isPlaying,
    currentTime,
    audioRef,
    progressRef,
    circumferenceProgress,
    circumference,
    onChangeRange,
    handlePlay
  }
}
