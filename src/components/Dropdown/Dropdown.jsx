import { useEffect, useState } from 'react'
import { DBACTIONS } from '../../actions/dbActions'
import { useAppContext } from '../../context/AppContext'
import './styles.scss'

const basic = (items) => {
  ;({ items })
}
export const Dropdown = ({ children, hover, config, id }) => {
  const [isOpen, setIsOpen] = useState(hover)
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  // useEffect(() => {

  // }, [])

  return (
    <div className='dropup' onMouseLeave={toggleDropdown}>
      <div
        onClick={toggleDropdown}
        className={`dropdown-action-item${hover ? ' active' : ''} `}
      >
        <i className='material-icons-outlined'>more_vert</i>
      </div>
      {hover && (
        <div
          id='dropup'
          className={`dropup-content${hover ? ' visible' : ''} ${
            config.side === 'right' ? ' right' : ' left'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
