import { useEffect, useRef, useState } from 'react'
import melodic from '../../assets/songs/melodic.mp3'
import { average } from 'color.js'

const initialTracks = [
  {
    title: 'Melodic Techno',
    artist: 'Zen Mantra',
    audioSrc: melodic,
    image:
      'http://localhost:5000/albums/art/557216bf4cb8578f12bfd721a284d9f8.png',
    color: ''
  },
  {
    title: 'Melodic Techno Mis',
    artist: 'Zen Mantra 2',
    audioSrc: melodic,
    image:
      'http://localhost:5000/albums/art/557216bf4cb8578f12bfd721a284d9f8.png',
    color: ''
  }
]

const BASE_URL = 'http://localhost:5000/tracks/play/'

export const usePlayer = (tracks = []) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [trackId, setTrackId] = useState(null)
  const [trackProgress, setTrackProgress] = useState(0)

  const audioSrc = `${BASE_URL}${trackId}`
  const audioRef = useRef(new Audio())

  const intervalRef = useRef()
  const isReady = useRef(false)

  const { duration } = audioRef.current

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : '0%'
  const trackStyling = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
`

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current)

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        nextTrack()
      } else {
        setTrackProgress(audioRef.current.currentTime)
      }
    }, [1000])
  }

  const onScrub = (value) => {
    // Clear any timers already running
    clearInterval(intervalRef.current)
    audioRef.current.currentTime = value
    setTrackProgress(value)
  }

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true)
    }
    startTimer()
  }

  // const nextTrack = () => {
  //   if (trackIndex < tracks.length - 1) {
  //     setTrackIndex(trackIndex + 1)
  //   } else {
  //     setTrackIndex(0)
  //   }
  // }

  // const prevTrack = () => {
  //   //Set disable button

  //   if (trackIndex - 1 < 0) {
  //     setTrackIndex(tracks.length - 1)
  //   } else {
  //     setTrackIndex(trackIndex - 1)
  //   }
  // }

  useEffect(
    function () {
      if (isPlaying) {
        audioRef.current.play()
        startTimer()
      } else {
        clearInterval(intervalRef.current)
        audioRef.current.pause()
      }
    },
    [isPlaying]
  )

  useEffect(
    function () {
      // average(tracks[trackIndex].image, { amount: 1, format: 'hex' }).then(
      //   (color) => {
      //     tracks[trackIndex].color = color
      //   }
      // )
      audioRef.current.pause()

      audioRef.current = new Audio(audioSrc)
      setTrackProgress(audioRef.current.currentTime)

      if (isReady.current) {
        audioRef.current.play()
        setIsPlaying(true)
        startTimer()
      } else {
        // Set the isReady ref as true for the next pass
        isReady.current = true
      }
    },
    [trackId]
  )

  useEffect(function () {
    // Pause and clean up on unmount
    return () => {
      audioRef.current.pause()
      clearInterval(intervalRef.current)
    }
  }, [])

  return {
    // prevTrack,
    // nextTrack,
    // duration,
    // trackProgress,
    // onScrub,
    // onScrubEnd,
    // // track: tracks[trackIndex],
    // trackStyling,,
    setTrackId,
    setIsPlaying,
    isPlaying
  }
}
