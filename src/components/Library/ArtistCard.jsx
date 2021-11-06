import { Link } from 'wouter'
import { useLazyLoad } from '../../hooks/useLazyLoad'

export const ArtistCard = ({ name, imageURL, id }) => {
  const { isLazyLoad, elementRef } = useLazyLoad()

  return (
    <Link href={`/library/artist/${id}`} className='column'>
      <img
        width='170'
        height='170'
        ref={elementRef}
        className={!isLazyLoad ? 'lazyload' : ''}
        src={isLazyLoad ? imageURL : ''}
        alt={`Artist ${name} picture`}
      />

      <div className='column-details'>
        <div className='title'>{name}</div>
      </div>
    </Link>
  )
}
