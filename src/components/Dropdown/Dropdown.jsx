import { useEffect, useState } from 'react'
import { DBACTIONS } from '../../actions/dbActions'
import { useAppContext } from '../../context/AppContext'
import './styles.scss'

const basic = (items) => {
  ;({ items })
}
export const Dropdown = ({ children, config, id }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [state, dispatch] = useAppContext()

  useEffect(() => {
    return () => handleUnmountDropdown()
  }, [])

  useEffect(() => {
    if (state.activeDropdown === id) {
      setIsOpen(true)
    } else {
      setIsOpen(false)
    }
  }, [state?.activeDropdown])

  const handleUnmountDropdown = () => {
    dispatch({
      type: DBACTIONS.SET_ACTIVE_DROPDOWN,
      payload: { dropdownElement: null }
    })
  }

  const handleDropdownClick = () => {
    if (!isOpen) {
      dispatch({
        type: DBACTIONS.SET_ACTIVE_DROPDOWN,
        payload: { dropdownElement: id }
      })
    } else {
      dispatch({
        type: DBACTIONS.SET_ACTIVE_DROPDOWN,
        payload: { dropdownElement: null }
      })
    }
  }

  return (
    <div className='dropup'>
      <div onClick={handleDropdownClick} className='dropdown-action-item'>
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
