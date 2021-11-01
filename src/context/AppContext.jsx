import { createContext, useContext, useReducer } from 'react'

const AppContext = createContext()

export const AppContextProvider = ({ initialState, reducer, children }) => (
  <AppContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AppContext.Provider>
)

export const useAppContext = () => useContext(AppContext)
