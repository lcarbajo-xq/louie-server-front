import { Route } from 'wouter'
import { AppScreen } from './pages/App/AppScreen'
import { LoginScreen } from './pages/Login/LoginScreen'
import './styles/styles.scss'

function App() {
  return (
    <>
      <Route path='/' component={LoginScreen} />
      <AppScreen />
    </>
  )
}

export default App
