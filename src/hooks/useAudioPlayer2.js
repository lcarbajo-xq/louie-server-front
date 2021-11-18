import { useCallback, useEffect, useRef, useState } from 'react'
import { BASE_URLS } from '../constants/endpoints'
import { circumference } from '../constants/progressConstants'
import { useAppContext } from '../context/AppContext'

export const useAudioPlayer2 = ({
  // audioSrc = '',
  preload = true,
  autoplay = false,
  volume = 0.5,
  mute = false,
  loop = false,
  rate = 1.0
}) => {
  const [{ currentTrack }] = useAppContext()
  const [audioSrc, setAudioSrc] = useState('')
  // const [audio, setAudio] = useState(null)
  // const [audioReady, setAudioReady] = useState(false)
  // const [audioLoading, setAudioLoading] = useState(true)
  // const [audioError, setAudioError] = useState('')
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioPaused, setAudioPaused] = useState(false)
  const [audioDuration, setAudioDuration] = useState(0)
  // const [audioMute, setAudioMute] = useState(false)
  // const [audioLoop, setAudioLoop] = useState(false)
  const [audioVolume, setAudioVolume] = useState(0)
  const [audioSeek, setAudioSeek] = useState(0)
  const [audioSeekCircumference, setAudioSeekCircumference] = useState(0)
  // const [audioRate, setAudioRate] = useState(0)

  const audioSeekRef = useRef()
  const audioElementRef = useRef()

  useEffect(() => {
    return () => {
      audioSeekRef?.current && cancelAnimationFrame(audioSeekRef.current)
    }
  }, [])

  useEffect(() => {
    setAudioPlaying(false)
    setAudioSeek(0)
    setAudioSrc(currentTrack?._id ? `${BASE_URLS.play}${currentTrack._id}` : '')
    return () => {
      cancelAnimationFrame(audioSeekRef.current)
    }
  }, [currentTrack])

  //Instance of load the Audio Element once it is created

  const onAbort = () => setAudioError('Abort Error')
  const onError = () => setAudioError('Error')
  const onLoadedData = () => {
    console.log(audioElementRef.current)
    if (autoplay) {
      setAudioLoading(false)
      setAudioReady(true)
      setAudioDuration(duration)
      setAudioMute(mute)
      setAudioLoop(loop)
      setAudioPlaying(true)
    } else {
      setAudioLoading(false)
      setAudioReady(true)
      setAudioDuration(duration)
      setAudioMute(mute)
      setAudioLoop(loop)
    }
  }

  const onPlay = () => {
    setAudioPlaying(true)
    setAudioPaused(false)
  }

  const onPause = () => {
    setAudioPlaying(false)
    setAudioPaused(true)
  }

  const onEnd = () => {
    setAudioPlaying(false)
    setAudioPaused(false)
    setAudioSeek(0)
    setAudioLoading(false)
    setAudioError('')
  }

  // // Effect to jump between seconds of the currentTime of audio

  useEffect(() => {
    const animate = () => {
      const seek = audioElementRef?.current.currentTime
      const value = audioElementRef?.current.currentTime / audioDuration
      const seekCircumference = Math.floor(value * circumference)
      setAudioSeek(seek)
      setAudioSeekCircumference(seekCircumference)
      audioSeekRef.current = requestAnimationFrame(animate)
    }
    if (audioElementRef?.current && audioPlaying) {
      audioSeekRef.current = requestAnimationFrame(animate)
    }
    return () => {
      if (audioSeekRef.current) {
        window.cancelAnimationFrame(audioSeekRef.current)
      }
    }
  }, [audioElementRef?.current, audioPlaying, audioPaused])

  //Method to be called when we psuh play/pause button

  const onTogglePlayback = () => {
    if (!audioElementRef?.current) return
    const prevIsPlaying = audioPlaying
    setAudioDuration(audioElementRef.current.duration)
    setAudioPlaying(!prevIsPlaying)

    if (!prevIsPlaying) {
      setAudioPaused(false)
      audioElementRef?.current?.play()
    } else {
      setAudioPaused(true)
      audioElementRef?.current?.pause()
    }
  }

  // const handlePlay = () => {
  //   if (!audio) return
  //   audio.play()
  // }
  // const handlePause = () => {
  //   if (!audio) return
  //   audio.pause()
  // }

  // const onMute = () => {
  //   if (!audio) return
  //   audio.muted = !audioMute
  //   setAudioMute(!audioMute)
  // }
  // const onLoop = () => {
  //   if (!audio) return
  //   audio.loop = !audioLoop
  //   setAudioLoop(!audioLoop)
  // }

  const onVolume = (e) => {
    if (!audioElementRef?.current) return
    const volume = parseFloat(e.target.value)
    setAudioVolume(volume)
    audioElementRef.current.volume = volume
  }

  // const onRate = (e) => {
  //   if (!audio) return
  //   const rate = parseFloat(e.target.value)
  //   setAudioRate(rate)
  //   audio.playbackRate = rate
  // }

  const onSeek = (e) => {
    if (!audioElementRef?.current) return
    // if (!audioReady) return
    const seek = parseFloat(e.target.value)
    setAudioSeek(seek)
    audioElementRef.current.currentTime = seek
  }

  return {
    audioSrc,
    // ready: audioReady,
    // loading: audioLoading,
    // error: audioError,
    playing: audioPlaying,
    // paused: audioPaused,
    duration: audioDuration,
    // mute: audioMute,
    // loop: audioLoop,
    volume: audioVolume,
    seek: audioSeek,
    // rate: audioRate,
    progressCircumference: audioSeekCircumference,
    audioElementRef,
    // audioSrc,
    onTogglePlayback,
    // onPlay,
    // onPause,
    // onMute,
    // onLoop,
    onVolume,
    // onRate,
    onSeek
  }
}
