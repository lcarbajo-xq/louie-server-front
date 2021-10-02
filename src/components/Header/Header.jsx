import { Dropdown } from '../Dropdown/Dropdown'
import './styles.scss'

export const Header = ({ title, children }) => {
  return (
    <div className='app-toolbar'>
      {/* Transparent STATIC */}
      <div className='back'>
        <i className='material-icons-outlined'>arrow_back</i>
      </div>
      <div className='title'>{title}</div>
      <div className='actions'>{children}</div>
    </div>
  )
}
