import { useLocation, useRoute, useRouter } from 'wouter'
import { Dropdown } from '../Dropdown/Dropdown'
import './styles.scss'

export const Header = ({ title = '', children = null, ...rest }) => {
  const backClick = () => {
    window.history.back()
  }

  return (
    <div className='app-toolbar'>
      {/* Transparent STATIC */}
      <div className='back' onClick={backClick}>
        <i className='material-icons-outlined'>arrow_back</i>
      </div>
      <div className='title'>{title && title}</div>
      <div className='actions'>{children && children}</div>
    </div>
  )
}
