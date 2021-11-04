import { createContext, useContext, useEffect, useReducer } from 'react'
import { DBACTIONS } from '../actions/dbActions'
import { fetchInitialData } from '../services/databaseService'

const AppContext = createContext()

export const AppContextProvider = ({ initialState, reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    fetchInitialData().then((data) => {
      dispatch({
        type: DBACTIONS.SET_INITIAL_STATE,
        payload: {
          albums: data[1].albums,
          artists: data[2].artists,
          tracks: data[0].tracks
        }
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
