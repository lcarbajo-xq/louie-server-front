import { createContext, useContext, useEffect, useReducer } from 'react'
import { DBACTIONS } from '../actions/dbActions'
import {
  fetchInitialData,
  getAccessToken,
  getItemsFromDB
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
          tracks: data[0].tracks,
          playlists: data[3].playlists
        }
      })
    })
    const { limit, page } = library

    getItemsFromDB('albums', limit, page['albums']).then((data) => {
      dispatch({
        type: DBACTIONS.GET_ALBUMS_FROM_DATABASE,
        payload: data.albums
      })
    })
    getItemsFromDB('artists', limit, page['artists']).then((data) => {
      dispatch({
        type: DBACTIONS.GET_ARTISTS_FROM_DATABASE,
        payload: data.artists
      })
    })
    getItemsFromDB('playlists', limit, page['playlists']).then((data) => {
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
  }, [])

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
