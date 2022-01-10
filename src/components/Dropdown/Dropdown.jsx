import { useEffect, useState } from 'react'
import { DBACTIONS } from '../../actions/dbActions'
import { useAppContext } from '../../context/AppContext'
import './styles.scss'

const basic = (items) => {
  ;({ items })
}
export const Dropdown = ({ children, config, id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className='dropup' onMouseLeave={toggleDropdown}>
      <div
        onClick={toggleDropdown}
        className={`dropdown-action-item${isOpen ? ' active' : ''} `}
      >
        <i className='material-icons-outlined'>more_vert</i>
      </div>
      {isOpen && (
        <div
          id='dropup'
          className={`dropup-content${isOpen ? ' visible' : ''} ${
            config.side === 'right' ? ' right' : ' left'
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}
