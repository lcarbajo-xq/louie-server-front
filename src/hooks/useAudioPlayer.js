import { useEffect, useRef, useState } from 'react'
import { DBACTIONS } from '../actions/dbActions'
import { BASE_URLS } from '../constants/endpoints'
import { circumference } from '../constants/progressConstants'
import { useAppContext } from '../context/AppContext'

const trackList = [
  {
    _id: '6170349c8db56cf9cf24b497',
    name: 'Clutter (us, 1980)',
    artists: ['615b532ad4e3a6d7f3076d78'],
    artist: 'Bound & Gagged',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/01 Clutter (US, 1980).mp3',
    duration: 133.0938775510204,
    year: 2018,
    number: 1,
    updatedAt: '2021-10-20T15:24:12.834Z',
    createdAt: '2021-10-20T15:24:12.834Z',
    __v: 0
  },
  {
    _id: '6170349d8db56cf9cf24b4aa',
    name: "Mary's Got The Bug (uk, 1982)",
    artists: ['615b532bd4e3a6d7f3076d85'],
    artist: 'Twelve Cubic Feet',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: "music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/03 Mary's Got The Bug (UK, 1982).mp3",
    duration: 110.81142857142858,
    year: 2018,
    number: 3,
    updatedAt: '2021-10-20T15:24:13.851Z',
    createdAt: '2021-10-20T15:24:13.851Z',
    __v: 0
  },
  {
    _id: '6170349e8db56cf9cf24b4b1',
    name: 'Fontänen (se, 1981)',
    artists: ['615b532bd4e3a6d7f3076d8a'],
    artist: 'Sporten Är Död',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/04 Fontänen (SE, 1981).mp3',
    duration: 145.99836734693878,
    year: 2018,
    number: 4,
    updatedAt: '2021-10-20T15:24:14.219Z',
    createdAt: '2021-10-20T15:24:14.219Z',
    __v: 0
  },
  {
    _id: '6170349e8db56cf9cf24b4b8',
    name: 'Consume (dn, 1979)',
    artists: ['615b532bd4e3a6d7f3076d8f'],
    artist: 'Elektrochok',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/05 Consume (DN, 1979).mp3',
    duration: 159.66040816326532,
    year: 2018,
    number: 5,
    updatedAt: '2021-10-20T15:24:14.482Z',
    createdAt: '2021-10-20T15:24:14.482Z',
    __v: 0
  },
  {
    _id: '6170349e8db56cf9cf24b4bf',
    name: 'Lantin (be, 1980)',
    artists: ['615b532bd4e3a6d7f3076d94'],
    artist: "No Man's Land",
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/06 Lantin (BE, 1980).mp3',
    duration: 125.51836734693877,
    year: 2018,
    number: 6,
    updatedAt: '2021-10-20T15:24:14.772Z',
    createdAt: '2021-10-20T15:24:14.772Z',
    __v: 0
  },
  {
    _id: '6170349f8db56cf9cf24b4c6',
    name: 'ハプニング (jp, 1984)',
    artists: ['615b532bd4e3a6d7f3076d99'],
    artist: 'Kyah (キャ→)',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/07 ハプニング (JP, 1984).mp3',
    duration: 90.264,
    year: 2018,
    number: 7,
    updatedAt: '2021-10-20T15:24:15.041Z',
    createdAt: '2021-10-20T15:24:15.041Z',
    __v: 0
  },
  {
    _id: '6170349f8db56cf9cf24b4d4',
    name: 'Javna Kupatila (yu, 1981)',
    artists: ['615b532cd4e3a6d7f3076da3'],
    artist: 'Paraf',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/09 Javna Kupatila (YU, 1981).mp3',
    duration: 152.79020408163265,
    year: 2018,
    number: 9,
    updatedAt: '2021-10-20T15:24:15.653Z',
    createdAt: '2021-10-20T15:24:15.653Z',
    __v: 0
  },
  {
    _id: '6170349f8db56cf9cf24b4db',
    name: 'Doctor Spock (sp, 1981)',
    artists: ['615b532cd4e3a6d7f3076da8'],
    artist: 'Alaska Y Los Pegamoides',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/10 Doctor Spock (SP, 1981).mp3',
    duration: 142.81142857142856,
    year: 2018,
    number: 10,
    updatedAt: '2021-10-20T15:24:15.917Z',
    createdAt: '2021-10-20T15:24:15.917Z',
    __v: 0
  },
  {
    _id: '617034a08db56cf9cf24b4e2',
    name: 'Sado Maso (fr, 1979)',
    artists: ['615b532cd4e3a6d7f3076dad'],
    artist: 'Edith Nylon',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/11 Sado Maso (FR, 1979).mp3',
    duration: 173.79265306122448,
    year: 2018,
    number: 11,
    updatedAt: '2021-10-20T15:24:16.183Z',
    createdAt: '2021-10-20T15:24:16.183Z',
    __v: 0
  },
  {
    _id: '617034a08db56cf9cf24b4e9',
    name: 'Food Free Food (us, 1981)',
    artists: ['615b532cd4e3a6d7f3076db2'],
    artist: 'The Delinquents',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/12 Food Free Food (US, 1981).mp3',
    duration: 150.64816326530612,
    year: 2018,
    number: 12,
    updatedAt: '2021-10-20T15:24:16.445Z',
    createdAt: '2021-10-20T15:24:16.445Z',
    __v: 0
  },
  {
    _id: '617034a08db56cf9cf24b4f0',
    name: 'Zu Cool (de, 1981)',
    artists: ['615b532cd4e3a6d7f3076db7'],
    artist: 'Östro 430',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/13 Zu Cool (DE, 1981).mp3',
    duration: 163.5265306122449,
    year: 2018,
    number: 13,
    updatedAt: '2021-10-20T15:24:16.762Z',
    createdAt: '2021-10-20T15:24:16.762Z',
    __v: 0
  },
  {
    _id: '617034a18db56cf9cf24b4f7',
    name: 'Telephone (ch, 1981)',
    artists: ['615b532dd4e3a6d7f3076dbc'],
    artist: 'Technycolor',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/14 Telephone (CH, 1981).mp3',
    duration: 185.57387755102042,
    year: 2018,
    number: 14,
    updatedAt: '2021-10-20T15:24:17.032Z',
    createdAt: '2021-10-20T15:24:17.032Z',
    __v: 0
  },
  {
    _id: '617034a18db56cf9cf24b4fe',
    name: 'In Technicolor (us, 1981)',
    artists: ['615b532dd4e3a6d7f3076dc1'],
    artist: 'MYDOLLS',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/15 In Technicolor (US, 1981).mp3',
    duration: 154.01795918367347,
    year: 2018,
    number: 15,
    updatedAt: '2021-10-20T15:24:17.371Z',
    createdAt: '2021-10-20T15:24:17.371Z',
    __v: 0
  },
  {
    _id: '617034a18db56cf9cf24b505',
    name: 'Mi Ne Parolas (us, 1981)',
    artists: ['615b532dd4e3a6d7f3076dc6'],
    artist: 'IXNA',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '6165666d79056eb4bc0e5835',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/16 Mi Ne Parolas (US, 1981).mp3',
    duration: 164.96326530612245,
    year: 2018,
    number: 16,
    updatedAt: '2021-10-20T15:24:17.744Z',
    createdAt: '2021-10-20T15:24:17.744Z',
    __v: 0
  },
  {
    _id: '61715903593d57961c21f492',
    name: 'Sit Down (stand Up) (nz, 1981)',
    artists: ['615b532bd4e3a6d7f3076d80'],
    artist: 'Playthings',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/02 Sit Down (Stand Up) (NZ, 1981).mp3',
    duration: 131.84,
    year: 2018,
    number: 2,
    updatedAt: '2021-10-21T12:11:47.722Z',
    createdAt: '2021-10-21T12:11:47.722Z',
    __v: 0
  },
  {
    _id: '61715904593d57961c21f499',
    name: 'Bla-bla (nl, 1980)',
    artists: ['615b532cd4e3a6d7f3076d9e'],
    artist: 'Pink Plastic & Panties',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: '615b532ad4e3a6d7f3076d78',
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/08 Bla-Bla (NL, 1980).mp3',
    duration: 140.69551020408164,
    year: 2018,
    number: 8,
    updatedAt: '2021-10-21T12:11:48.136Z',
    createdAt: '2021-10-21T12:11:48.136Z',
    __v: 0
  }
]

export const useAudioPlayer = ({
  preload = true,
  autoplay = false,
  volume = 0.5,
  mute = false,
  loop = false,
  rate = 1.0
}) => {
  const [{ currentTrack }, dispatch] = useAppContext()
  const [audioIndex, setAudioIndex] = useState(0)
  const [audioSrc, setAudioSrc] = useState('')
  const [audioReady, setAudioReady] = useState(false)
  const [audioLoading, setAudioLoading] = useState(true)
  const [audioError, setAudioError] = useState('')
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioPaused, setAudioPaused] = useState(false)
  const [audioDuration, setAudioDuration] = useState(0)
  const [audioMute, setAudioMute] = useState(mute)
  const [audioLoop, setAudioLoop] = useState(loop)
  const [audioVolume, setAudioVolume] = useState(0)
  const [audioSeek, setAudioSeek] = useState(0)
  const [audioSeekCircumference, setAudioSeekCircumference] = useState(0)
  const [audioRate, setAudioRate] = useState(rate)

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
    setAudioSrc(
      trackList[audioIndex]?._id
        ? `${BASE_URLS.play}${trackList[audioIndex]._id}`
        : ''
    )
    return () => {
      cancelAnimationFrame(audioSeekRef.current)
    }
  }, [audioIndex])

  //Instance of load the Audio Element once it is created

  const onAbort = () => setAudioError('Abort Error')
  const onError = () => setAudioError('Error')
  const onLoadedData = () => {
    if (autoplay) {
      setAudioLoading(false)
      setAudioReady(true)
      setAudioDuration(audioElementRef?.current.duration)
      setAudioMute(mute)
      setAudioLoop(loop)
      setAudioPlaying(true)
    } else {
      setAudioLoading(false)
      setAudioReady(true)
      setAudioDuration(audioElementRef?.current.duration)
      setAudioMute(mute)
      setAudioLoop(loop)
    }
  }

  const onSetUpTrackList = (trackList) => {
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
      payload: trackList
    })
  }

  const onNext = () => {
    setAudioIndex((prev) => prev + 1)
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

  const onMute = () => {
    if (!audioElementRef?.current) return
    audioElementRef.current.muted = !audioMute
    setAudioMute(!audioMute)
  }
  const onLoop = () => {
    if (!audioElementRef?.current) return
    audioElementRef.current.loop = !audioLoop
    setAudioLoop(!audioLoop)
  }

  const onVolume = (e) => {
    if (!audioElementRef?.current) return
    const volume = parseFloat(e.target.value)
    setAudioVolume(volume)
    audioElementRef.current.volume = volume
  }

  const onRate = (e) => {
    if (!audioElementRef?.current) return
    const rate = parseFloat(e.target.value)
    setAudioRate(rate)
    audioElementRef.current.playbackRate = rate
  }

  const onSeek = (e) => {
    if (!audioElementRef?.current) return
    // if (!audioReady) return
    const seek = parseFloat(e.target.value)
    setAudioSeek(seek)
    audioElementRef.current.currentTime = seek
  }

  return {
    audioSrc,
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
    progressCircumference: audioSeekCircumference,
    audioElementRef,
    onTogglePlayback,
    onLoop,
    onError,
    onAbort,
    // onPlay,
    // onPause,
    onSetUpTrackList,
    onNext,
    onMute,
    onLoadedData,
    onVolume,
    onRate,
    onSeek
  }
}
