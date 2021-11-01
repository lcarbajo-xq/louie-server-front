import { Route, Router, Switch, useRouter } from 'wouter'
import { Library } from '../components/Library/Library'
// import { Search } from '../components/Search/Search'
import { AppScreen } from '../pages/App/AppScreen'
import { LoginScreen } from '../pages/Login/LoginScreen'
import { LibraryRouter } from './LibraryRouter'

export const AuthRouter = ({ base, children }) => {
  const router = useRouter()

  const nestedBase = `${router.base}${base}`

  return (
    <Router base={nestedBase} key={nestedBase}>
      {children}

      {/* <Route path='/app/library' component={Library} />
      <Route path='/app/home' component={Search} /> */}
    </Router>
  )
}
