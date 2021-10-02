import { Route, Switch } from 'wouter'
import { LoginScreen } from './pages/Login/LoginScreen'
import { MainScreen } from './pages/Main/MainScreen'
import './styles/styles.scss'

function App() {
  return (
    <>
      <Switch>
        <Route path='/' component={LoginScreen} />
        <Route path='/home' component={MainScreen} />
      </Switch>
    </>
  )
}

export default App
