import { useEffect, useState } from 'react'
import { Link, useRoute, useLocation } from 'wouter'

export const NavLink = ({ href, icon, title }) => {
  const [isActive, setIsActive] = useState(false)
  const [location] = useLocation()

  useEffect(() => {
    if (location.includes(href)) setIsActive(true)
    else setIsActive(false)
  }, [location])

  return (
    <>
      <Link to={href}>
        <a className={isActive ? 'active' : ''}>
          <span className='material-icons-round'>{icon}</span>
          <div className='title'>{title}</div>
        </a>
      </Link>
    </>
  )
}
