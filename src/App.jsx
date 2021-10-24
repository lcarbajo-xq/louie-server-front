import { Route, Switch } from 'wouter'
import { Search } from './components/Search/Search'
import { AppLayout } from './layouts/AppLayout'
import { LoginScreen } from './pages/Login/LoginScreen'
import './styles/styles.scss'

function App() {
  return (
    <>
      <Route path='/' component={LoginScreen} />
      <AppLayout />
    </>
  )
}

export default App
