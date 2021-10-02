import { Link, useRoute } from 'wouter'

export const NavLink = ({ href, icon, title }) => {
  const [isActive] = useRoute(href)
  return (
    <>
      <Link href={href}>
        <a className={isActive ? 'active' : ''}>
          <span className='material-icons-round'>{icon}</span>
          <div className='title'>{title}</div>
        </a>
      </Link>
    </>
  )
}
