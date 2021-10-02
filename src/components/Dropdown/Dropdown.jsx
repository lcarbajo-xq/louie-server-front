import { useState } from 'react'
import './styles.scss'

const basic = (items) => {
  ;({ items })
}
export const Dropdown = ({ children, config }) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='dropup'>
      <div onClick={() => setIsOpen(!isOpen)} className='dropdown-action-item'>
        <i className='material-icons-outlined'>more_vert</i>
      </div>
      <div
        id='dropup'
        className={`dropup-content${isOpen ? ' visible' : ''}${
          config.side === 'right' ? ' right' : 'left'
        }`}
      >
        {children}
      </div>
    </div>
  )
}
