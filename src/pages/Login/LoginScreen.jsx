import { Route, useLocation } from 'wouter'
import logo from '../../assets/logo.png'
import { AppScreen } from '../App/AppScreen'
import './styles.scss'

export const LoginScreen = ({ setAuth }) => {
  const [location, setLocation] = useLocation()
  return (
    <div className='login'>
      <div className='login-container'>
        <div className='logo'>
          <img src={logo} alt='logo' />
        </div>

        <div className='login-text'>Enter to a new music experience</div>
        <form>
          <div className='login-input'>
            <input placeholder='Enter Your Login Credentials' type='text' />
          </div>

          <button onClick={() => setLocation('/app')}>
            Login
            <i className='feather-arrow-right' />
          </button>
        </form>
      </div>
      <Route path='/app' component={AppScreen} />
    </div>
  )
}
