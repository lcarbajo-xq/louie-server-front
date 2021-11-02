import { useEffect, useRef, useState } from 'react'
import { DBACTIONS } from '../../actions/dbActions'
import { BASE_URLS } from '../../constants/endpoints'
import { circumference } from '../../constants/progressConstants'
import { useAppContext } from '../../context/AppContext'

export const usePlayer = (track) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [, dispatch] = useAppContext()

  const id = track?._id

  const audioSrc = id ? `${BASE_URLS.play}${id}` : ''

  const audioRef = useRef()
  const animationRef = useRef()

  useEffect(() => {
    cancelAnimationFrame(animationRef.current)
    setIsPlaying(false)
    setCurrentTime(0)
    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [track])

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const seconds = Math.floor(audioRef.current.duration)
      setDuration(seconds)
    }
  }

  const togglePlayPause = () => {
    const prevIsPlaying = isPlaying
    setIsPlaying(!prevIsPlaying)

    if (!prevIsPlaying) {
      audioRef.current.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioRef.current.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }

  const whilePlaying = () => {
    const value = audioRef.current.currentTime / duration

    const currentProgressCircumference = Math.floor(value * circumference)
    setCurrentTime(currentProgressCircumference)
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const handlePlay = (trackClicked) => {
    if (trackClicked._id !== id) {
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
    audioRef,
    currentTime,
    circumference,
    handlePlay
  }
}
