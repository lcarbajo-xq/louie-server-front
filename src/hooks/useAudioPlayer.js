import { useCallback, useEffect, useRef, useState } from 'react'

export const useAudioPlayer = ({
  audioSrc,
  preload = true,
  autoplay = false,
  volume = 0.5,
  mute = false,
  loop = false,
  rate = 1.0
}) => {
  const [audio, setAudio] = useState(null)
  const [audioReady, setAudioReady] = useState(false)
  const [audioLoading, setAudioLoading] = useState(true)
  const [audioError, setAudioError] = useState('')
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioPaused, setAudioPaused] = useState(false)
  const [audioDuration, setAudioDuration] = useState(0)
  const [audioMute, setAudioMute] = useState(false)
  const [audioLoop, setAudioLoop] = useState(false)
  const [audioVolume, setAudioVolume] = useState(volume)
  const [audioSeek, setAudioSeek] = useState(rate)
  const [audioRate, setAudioRate] = useState(0)

  const audioSeekRef = useRef()

  // Instance of a new Audio setting up the initial values

  const newAudio = useCallback(
    ({
      audioSrc,
      autoplay = false,
      volume = 0.5,
      mute = false,
      loop = false,
      rate = 1.0
    }) => {
      const audioElement = new Audio(audioSrc)
      audioElement.autoplay = autoplay
      audioElement.volume = volume
      audioElement.muted = mute
      audioElement.loop = loop
      audioElement.playbackRate = rate
      return audioElement
    },
    []
  )

  //Instance of load the Audio Element once it is created

  const load = useCallback(
    ({ audioSrc, preload, autoplay, volume, mute, loop, rate }) => {
      const newAudioElement = newAudio({
        audioSrc,
        preload,
        autoplay,
        volume,
        mute,
        loop,
        rate
      })

      newAudioElement.addEventListener('abort', () =>
        setAudioError('Abort Error')
      )
      newAudioElement.addEventListener('error', () => setAudioError('Error'))
      newAudioElement.addEventListener('loadeddata', () => {
        if (autoplay) {
          setAudioLoading(false)
          setAudioReady(true)
          setAudioDuration(newAudioElement.duration)
          setAudioMute(mute)
          setAudioLoop(loop)
          setAudioPlaying(true)
        } else {
          setAudioLoading(false)
          setAudioReady(true)
          setAudioDuration(newAudioElement.duration)
          setAudioMute(mute)
          setAudioLoop(loop)
        }
      })

      newAudioElement.addEventListener('play', () => {
        setAudioPlaying(true)
        setAudioPaused(false)
      })

      newAudioElement.addEventListener('pause', () => {
        setAudioPlaying(false)
        setAudioPaused(true)
      })

      newAudioElement.addEventListener('ended', () => {
        setAudioPlaying(false)
        setAudioPaused(false)
        setAudioSeek(0)
        setAudioLoading(false)
        setAudioError('')
      })
      setAudio(newAudioElement)
    },
    [newAudio]
  )

  // This Effect will load the audio if we have Src and it has not been preloaded

  useEffect(() => {
    if (!audioSrc) return
    if (!preload) return
    load({ audioSrc, autoplay, volume, mute, loop, rate })
  }, [audioSrc, preload, autoplay, volume, mute, loop, rate, load])

  // Effect to jump between seconds of the currentTime of audio

  useEffect(() => {
    const animate = () => {
      const seek = audio?.currentTime
      setAudioSeek(seek)
      audioSeekRef.current = requestAnimationFrame(animate)
    }
    if (audio && audioPlaying) {
      audioSeekRef.current = requestAnimationFrame(animate)
    }
    return () => {
      if (audioSeekRef.current) {
        window.cancelAnimationFrame(audioSeekRef.current)
      }
    }
  }, [audio, audioPlaying, audioPaused])

  //Method to be called when we psuh play/pause button

  const onToggle = () => {
    if (!audio) return
    if (audioReady) audio.play()
    if (audioPlaying) audio.pause()
  }

  const onPlay = () => {
    if (!audio) return
    audio.play()
  }
  const onPause = () => {
    if (!audio) return
    audio.pause()
  }

  const onMute = () => {
    if (!audio) return
    audio.muted = !audioMute
    setAudioMute(!audioMute)
  }
  const onLoop = () => {
    if (!audio) return
    audio.loop = !audioLoop
    setAudioLoop(!audioLoop)
  }

  const onVolume = (e) => {
    if (!audio) return
    const volume = parseFloat(e.target.value)
    setAudioVolume(volume)
    audio.volume = volume
  }

  const onRate = (e) => {
    if (!audio) return
    const rate = parseFloat(e.target.value)
    setAudioRate(rate)
    audio.playbackRate = rate
  }

  const onSeek = (e) => {
    if (!audio) return
    if (!audioReady) return
    const seek = parseFloat(e.target.value)
    setAudioSeek(seek)
    audio.currentTime = seek
  }

  return {
    ready: audioReady,
    loading: audioLoading,
    error: audioError,
    playing: audioPlaying,
    paused: audioPaused,
    duration: audioDuration,
    mute: audioMute,
    loop: audioLoop,
    volume: audioVolume,
    seek: audioSeek,
    rate: audioRate,
    onToggle,
    onPlay,
    onPause,
    onMute,
    onLoop,
    onVolume,
    onRate,
    onSeek
  }
}
