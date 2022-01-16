import { useEffect, useRef, useState } from 'react'
import { DBACTIONS } from '../actions/dbActions'
import { BASE_URLS } from '../constants/endpoints'
import { useAppContext } from '../context/AppContext'
import { formatAudioProgress } from '../helpers/playerHelpers'

const trackList = [
  {
    _id: '619dfd68256d6460062661d4',
    name: "Mary's Got The Bug (uk, 1982)",
    artists: [
      {
        _id: '615b532bd4e3a6d7f3076d85',
        name: 'Twelve Cubic Feet',
        hash: '098a6cff4dabbecd20e5e43a742cd18d',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:16:59.222Z',
        updatedAt: '2021-10-04T19:16:59.222Z',
        __v: 0
      }
    ],
    artist: 'Twelve Cubic Feet',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: "music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/03 Mary's Got The Bug (UK, 1982).mp3",
    duration: 110.81142857142858,
    year: 2018,
    number: 3,
    updatedAt: '2021-11-24T08:52:56.624Z',
    createdAt: '2021-11-24T08:52:56.624Z',
    __v: 0
  },
  {
    _id: '619dfd64256d64600626619c',
    name: 'Doctor Spock (sp, 1981)',
    artists: [
      {
        _id: '615b532cd4e3a6d7f3076da8',
        name: 'Alaska Y Los Pegamoides',
        hash: '80b6cf83584ffc59dd6cbb89fcc86fa5',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:17:00.388Z',
        updatedAt: '2021-10-04T19:17:00.388Z',
        __v: 0
      }
    ],
    artist: 'Alaska Y Los Pegamoides',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/10 Doctor Spock (SP, 1981).mp3',
    duration: 142.81142857142856,
    year: 2018,
    number: 10,
    updatedAt: '2021-11-24T08:52:52.587Z',
    createdAt: '2021-11-24T08:52:52.587Z',
    __v: 0
  },
  {
    _id: '619dfd64256d646006266195',
    name: 'Javna Kupatila (yu, 1981)',
    artists: [
      {
        _id: '615b532cd4e3a6d7f3076da3',
        name: 'Paraf',
        hash: 'bd415c329c4e38338134e8f7bd9a9815',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:17:00.118Z',
        updatedAt: '2021-10-04T19:17:00.118Z',
        __v: 0
      }
    ],
    artist: 'Paraf',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/09 Javna Kupatila (YU, 1981).mp3',
    duration: 152.79020408163265,
    year: 2018,
    number: 9,
    updatedAt: '2021-11-24T08:52:52.071Z',
    createdAt: '2021-11-24T08:52:52.071Z',
    __v: 0
  },
  {
    _id: '619dfd65256d6460062661a3',
    name: 'Sado Maso (fr, 1979)',
    artists: [
      {
        _id: '615b532cd4e3a6d7f3076dad',
        name: 'Edith Nylon',
        hash: 'fe43dc48f3741829a09cdf8ba11016cc',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:17:00.545Z',
        updatedAt: '2021-10-04T19:17:00.545Z',
        __v: 0
      }
    ],
    artist: 'Edith Nylon',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/11 Sado Maso (FR, 1979).mp3',
    duration: 173.79265306122448,
    year: 2018,
    number: 11,
    updatedAt: '2021-11-24T08:52:53.098Z',
    createdAt: '2021-11-24T08:52:53.098Z',
    __v: 0
  },
  {
    _id: '619dfd68256d6460062661cd',
    name: 'Lantin (be, 1980)',
    artists: [
      {
        _id: '615b532bd4e3a6d7f3076d94',
        name: "No Man's Land",
        hash: 'cfdf9a77b20e4169fb8a297f90733723',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:16:59.730Z',
        updatedAt: '2021-10-04T19:16:59.730Z',
        __v: 0
      }
    ],
    artist: "No Man's Land",
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/06 Lantin (BE, 1980).mp3',
    duration: 125.51836734693877,
    year: 2018,
    number: 6,
    updatedAt: '2021-11-24T08:52:56.138Z',
    createdAt: '2021-11-24T08:52:56.138Z',
    __v: 0
  },
  {
    _id: '619dfd67256d6460062661c6',
    name: 'Mi Ne Parolas (us, 1981)',
    artists: [
      {
        _id: '615b532dd4e3a6d7f3076dc6',
        name: 'IXNA',
        hash: 'bea73c1d5e242f77b830115d8be805dd',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:17:01.316Z',
        updatedAt: '2021-10-04T19:17:01.316Z',
        __v: 0
      }
    ],
    artist: 'IXNA',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/16 Mi Ne Parolas (US, 1981).mp3',
    duration: 164.96326530612245,
    year: 2018,
    number: 16,
    updatedAt: '2021-11-24T08:52:55.663Z',
    createdAt: '2021-11-24T08:52:55.663Z',
    __v: 0
  },
  {
    _id: '619dfd6a256d6460062661e9',
    name: 'Bla-bla (nl, 1980)',
    artists: [
      {
        _id: '615b532cd4e3a6d7f3076d9e',
        name: 'Pink Plastic & Panties',
        hash: 'b84cd3e56bf179954229cf0391a99735',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:16:59.985Z',
        updatedAt: '2021-10-04T19:16:59.985Z',
        __v: 0
      }
    ],
    artist: 'Pink Plastic & Panties',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
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
    updatedAt: '2021-11-24T08:52:58.474Z',
    createdAt: '2021-11-24T08:52:58.474Z',
    __v: 0
  },
  {
    _id: '619dfd66256d6460062661b1',
    name: 'Zu Cool (de, 1981)',
    artists: [
      {
        _id: '615b532cd4e3a6d7f3076db7',
        name: 'Östro 430',
        hash: 'd829dafdf572a494639fc2dc67955703',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:17:00.799Z',
        updatedAt: '2021-10-04T19:17:00.799Z',
        __v: 0
      }
    ],
    artist: 'Östro 430',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/13 Zu Cool (DE, 1981).mp3',
    duration: 163.5265306122449,
    year: 2018,
    number: 13,
    updatedAt: '2021-11-24T08:52:54.148Z',
    createdAt: '2021-11-24T08:52:54.148Z',
    __v: 0
  },
  {
    _id: '619dfd66256d6460062661b8',
    name: 'Telephone (ch, 1981)',
    artists: [
      {
        _id: '615b532dd4e3a6d7f3076dbc',
        name: 'Technycolor',
        hash: '55486a427cb878938d84a8624f469ee6',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:17:01.066Z',
        updatedAt: '2021-10-04T19:17:01.066Z',
        __v: 0
      }
    ],
    artist: 'Technycolor',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/14 Telephone (CH, 1981).mp3',
    duration: 185.57387755102042,
    year: 2018,
    number: 14,
    updatedAt: '2021-11-24T08:52:54.707Z',
    createdAt: '2021-11-24T08:52:54.707Z',
    __v: 0
  },
  {
    _id: '619dfd63256d64600626618e',
    name: 'ハプニング (jp, 1984)',
    artists: [
      {
        _id: '615b532bd4e3a6d7f3076d99',
        name: 'Kyah (キャ→)',
        hash: '779773f8b42a9721c3346b2060fdfd2b',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:16:59.854Z',
        updatedAt: '2021-10-04T19:16:59.854Z',
        __v: 0
      }
    ],
    artist: 'Kyah (キャ→)',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/07 ハプニング (JP, 1984).mp3',
    duration: 90.264,
    year: 2018,
    number: 7,
    updatedAt: '2021-11-24T08:52:51.578Z',
    createdAt: '2021-11-24T08:52:51.578Z',
    __v: 0
  },
  {
    _id: '619dfd6a256d6460062661e2',
    name: 'Sit Down (stand Up) (nz, 1981)',
    artists: [
      {
        _id: '615b532bd4e3a6d7f3076d80',
        name: 'Playthings',
        hash: 'db574def640b7cd25d90c217495a235a',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:16:59.077Z',
        updatedAt: '2021-10-04T19:16:59.077Z',
        __v: 0
      }
    ],
    artist: 'Playthings',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
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
    updatedAt: '2021-11-24T08:52:58.004Z',
    createdAt: '2021-11-24T08:52:58.004Z',
    __v: 0
  },
  {
    _id: '619dfd67256d6460062661bf',
    name: 'In Technicolor (us, 1981)',
    artists: [
      {
        _id: '615b532dd4e3a6d7f3076dc1',
        name: 'MYDOLLS',
        hash: '9776427d587e6ec301f2ef423343328c',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:17:01.188Z',
        updatedAt: '2021-10-04T19:17:01.188Z',
        __v: 0
      }
    ],
    artist: 'MYDOLLS',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/15 In Technicolor (US, 1981).mp3',
    duration: 154.01795918367347,
    year: 2018,
    number: 15,
    updatedAt: '2021-11-24T08:52:55.207Z',
    createdAt: '2021-11-24T08:52:55.207Z',
    __v: 0
  },
  {
    _id: '619dfd69256d6460062661db',
    name: 'Clutter (us, 1980)',
    artists: [
      {
        _id: '615b532ad4e3a6d7f3076d78',
        name: 'Bound & Gagged',
        hash: '0ef75e5b3c8231cc0aeb3c4d6ae2fa1c',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:16:58.796Z',
        updatedAt: '2021-10-04T19:16:58.796Z',
        __v: 0
      }
    ],
    artist: 'Bound & Gagged',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/01 Clutter (US, 1980).mp3',
    duration: 133.0938775510204,
    year: 2018,
    number: 1,
    updatedAt: '2021-11-24T08:52:57.363Z',
    createdAt: '2021-11-24T08:52:57.363Z',
    __v: 0
  },
  {
    _id: '619dfd65256d6460062661aa',
    name: 'Food Free Food (us, 1981)',
    artists: [
      {
        _id: '615b532cd4e3a6d7f3076db2',
        name: 'The Delinquents',
        hash: 'a0206116f75c62320d430240b551c057',
        image: [],
        tags: [],
        similar: [],
        createdAt: '2021-10-04T19:17:00.676Z',
        updatedAt: '2021-10-04T19:17:00.676Z',
        __v: 0
      }
    ],
    artist: 'The Delinquents',
    album: {
      _id: '617033bc9814148c5f86e602',
      name: 'Subnormal Girls – D.I.Y. / Post Punk 1979-1984 – Volume 3',
      hash: '557216bf4cb8578f12bfd721a284d9f8',
      artist: [],
      image: ['/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'],
      tags: [],
      bio: '',
      year: 2018,
      createdAt: '2021-10-20T15:20:28.879Z',
      updatedAt: '2021-10-20T15:20:28.879Z',
      __v: 0
    },
    genre: '615dbd4d9d9a088ea8527be4',
    path: 'music/Subnormal Girls – D.I.Y. _ Post Punk 1979-1984 – Volume 3/12 Food Free Food (US, 1981).mp3',
    duration: 150.64816326530612,
    year: 2018,
    number: 12,
    updatedAt: '2021-11-24T08:52:53.607Z',
    createdAt: '2021-11-24T08:52:53.607Z',
    __v: 0
  }
]

export const useAudioPlayer = ({ autoplay = true }) => {
  const [{ queue }, dispatch] = useAppContext()
  const [playbackState, setPlaybackState] = useState({
    duration: 0,
    isFirst: false,
    isLast: false,
    isPlaying: false,
    muted: false,
    progress: 0,
    rate: 1.0,
    progressCirumference: 0,
    ready: false,
    repeat: false,
    shuffle: false,
    updateTime: null
  })
  const [audioSrc, setAudioSrc] = useState('')
  const [audioIndex, setAudioIndex] = useState(0)
  const [audioLoading, setAudioLoading] = useState(true)
  const [audioError, setAudioError] = useState('')
  const [volume, setVolume] = useState(1)

  const audioSeekRef = useRef()
  const audioElementRef = useRef()

  useEffect(() => {
    audioElementRef.current.volume = volume
    return () => {
      audioSeekRef?.current && cancelAnimationFrame(audioSeekRef.current)
    }
  }, [])

  useEffect(() => {
    setPlaybackState((state) => ({
      ...state,
      progress: 0
    }))
    if (queue[audioIndex]) {
      setAudioSrc(`${BASE_URLS.play}${queue[audioIndex]._id}`)
      dispatch({
        type: DBACTIONS.SET_CURRENT_TRACK,
        payload: { track: queue[audioIndex] }
      })
      setIsLast(audioIndex === queue.length - 1)
    }
  }, [audioIndex, queue])

  //Instance of load the Audio Element once it is created

  const onAbort = () => setAudioError('Abort Error')
  const onError = (err) => setAudioError('Error: ', err)
  const onLoadedData = () => {
    updatePlaybackState()
    setAudioLoading(false)
    if (autoplay) {
      play()
    }
  }

  const updatePlaybackState = () => {
    const { currentTime, duration } = audioElementRef?.current
    const { circularProgress } = formatAudioProgress(currentTime, duration)
    setPlaybackState((state) => ({
      ...state,
      duration,
      isPlaying: autoplay,
      ready: true,
      progress: currentTime,
      isFirst: audioIndex === 0,
      isLast: audioIndex === queue?.length - 1,
      progressCirumference: circularProgress
    }))
  }

  const updatePlayerProgress = () => {
    if (audioSeekRef.current) {
      cancelAnimationFrame(audioSeekRef.current)
    }
    const { currentTime, duration } = audioElementRef?.current
    const { circularProgress } = formatAudioProgress(currentTime, duration)
    setPlaybackState((state) => ({
      ...state,
      progressCirumference: circularProgress,
      progress: currentTime
    }))
    audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
  }

  const play = () => {
    audioElementRef.current.play()
    audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
  }

  const pause = () => {
    audioElementRef.current.pause()
    cancelAnimationFrame(audioSeekRef.current)
  }

  const togglePlayPause = () => {
    if (playbackState.isPlaying) {
      pause()
    } else {
      play()
    }
    setPlaybackState((state) => {
      console.log(state.isPlaying)
      return {
        ...state,
        isPlaying: !state.isPlaying
      }
    })
  }

  const setLocalCurrentTrack = (track) => {
    if (audioSeekRef?.current) {
      cancelAnimationFrame(audioSeekRef.current)
    }
    setPlaybackState((state) => ({
      ...state,
      currentTrack: track
    }))
    // audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
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

  // // Effect to jump between seconds of the currentTime of audio

  //Method to be called when we psuh play/pause button

  // const animate = () => {
  //   const seek = audioElementRef?.current.currentTime
  //   const value = audioElementRef?.current.currentTime / audioDuration
  //   const seekCircumference = Math.floor(value * circumference)
  //   setAudioSeek(seek)
  //   setAudioSeekCircumference(seekCircumference)
  //   audioSeekRef.current = requestAnimationFrame(animate)
  // }

  // const onTogglePlayback = () => {
  //   if (!audioElementRef?.current) return
  //   const prevIsPlaying = audioPlaying
  //   setAudioDuration(audioElementRef.current.duration)
  //   setAudioPlaying(!prevIsPlaying)

  //   if (!prevIsPlaying) {
  //     handlePlay()
  //   } else {
  //     handlePause()
  //   }
  // }

  // const handlePlay = () => {
  //   setAudioPaused(false)
  //   setAudioPlaying(true)
  //   audioElementRef?.current?.play()
  //   audioSeekRef.current = requestAnimationFrame(animate)
  // }
  // const handlePause = () => {
  //   setAudioPaused(true)
  //   setAudioPlaying(false)
  //   audioElementRef?.current?.pause()
  //   cancelAnimationFrame(audioSeekRef.current)
  // }

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

    if (playbackState.isPlaying) {
      audioSeekRef.current = requestAnimationFrame(updatePlayerProgress)
    }
  }

  return {
    audioSrc,
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
    // onPlay,
    // onPause,
    onSetUpTrackList,
    onLoadedData,
    onRate
  }
}
