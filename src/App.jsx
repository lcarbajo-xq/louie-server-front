import { Component, useState } from 'react'
import { Redirect, Route, Router, Switch } from 'wouter'
// import { PlayerLayout } from './components/Player/PlayerLayout/PlayerLayout'
import { AppContextProvider } from './context/AppContext'
import { useTheme } from './hooks/useTheme'
import { AppScreen } from './pages/App/AppScreen'
import { LoginScreen } from './pages/Login/LoginScreen'
// import { NowPlayingScreen } from './pages/NowPlaying/NowPlayingScreen'
import { initialState, rootReducer } from './reducers/rootReducer'
import { AuthRouter } from './routers/AuthRouter'

import './styles/styles.scss'

function App() {
  useTheme()
  const [auth, setAuth] = useState(false)
  return (
    <>
      <AppContextProvider initialState={initialState} reducer={rootReducer}>
        <Route path='/' component={LoginScreen} />
        <AuthRouter base='/app'>
          <AppScreen />
        </AuthRouter>
      </AppContextProvider>
      {/* <div>Hello</div> */}
    </>
  )
}

export default App
