import { createContext, useContext, useEffect, useReducer } from 'react'
import { DBACTIONS } from '../actions/dbActions'
import {
  fetchInitialData,
  fetchLikedTracks,
  getAccessToken,
  getItemsFromDB,
  getTracksFromAlbum
} from '../services/databaseService'

const AppContext = createContext()

export const AppContextProvider = ({ initialState, reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const { tabs, library } = state
    fetchInitialData().then((data) => {
      dispatch({
        type: DBACTIONS.SET_INITIAL_STATE,
        payload: {
          albums: data[1].albums,
          artists: data[2].artists,
          // tracks: data[0].tracks,
          playlists: data[3].playlists
        }
      })
    })
    const { limit, page } = library

    getItemsFromDB('albums', limit, page.albums).then((data) => {
      dispatch({
        type: DBACTIONS.GET_ALBUMS_FROM_DATABASE,
        payload: data.albums
      })
    })
    getItemsFromDB('artists', limit, page.artists).then((data) => {
      dispatch({
        type: DBACTIONS.GET_ARTISTS_FROM_DATABASE,
        payload: data.artists
      })
    })
    getItemsFromDB('playlists', limit, page.playlists).then((data) => {
      dispatch({
        type: DBACTIONS.GET_PLAYLISTS_FROM_DATABASE,
        payload: data.playlists
      })
    })
    tabs.forEach((item) => {
      dispatch({
        type: DBACTIONS.SET_NEXT_PAGE,
        payload: item
      })
    })
    getAccessToken().then((data) => {
      dispatch({
        type: DBACTIONS.SET_ACCESS_TOKEN,
        payload: data.accessToken
      })
    })
    fetchLikedTracks().then((data) => {
      dispatch({
        type: DBACTIONS.GET_TRACKS_FROM_SPOTIFY,
        payload: data
      })
    })
    const selectedTrack = JSON.parse(
      window.localStorage.getItem('current-track')
    )
    if (selectedTrack) {
      dispatch({
        type: DBACTIONS.SET_CURRENT_TRACK,
        payload: selectedTrack
      })
      if (selectedTrack.source === 'local') {
        getTracksFromAlbum(selectedTrack.album._id).then((data) => {
          dispatch({
            type: DBACTIONS.SET_TRACK_LIST,
            payload: data.tracks
          })
        })
      }
    }
  }, [])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
