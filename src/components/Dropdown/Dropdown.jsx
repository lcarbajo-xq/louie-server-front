import { useEffect, useState } from 'react'

import './styles.scss'

// const basic = (items) => {
//   ;({ items })
// }
export const Dropdown = ({ children, hover, config }) => {
  const [isOpen, setIsOpen] = useState(!hover)
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    setIsOpen(!hover && hover)
  }, [hover])

  return (
    <div className='dropup' onMouseLeave={() => setIsOpen(false)}>
      <div
        onClick={toggleDropdown}
        className={`dropdown-action-item${isOpen ? ' active' : ''} `}
      >
        <i className='material-icons-outlined'>more_vert</i>
      </div>
      {hover && (
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
