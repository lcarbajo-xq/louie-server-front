import { Link } from 'wouter'
import { useLazyLoad } from '../../hooks/useLazyLoad'

export const AlbumCard = ({ id, artist, name, imageURL }) => {
  const { isLazyLoad, elementRef } = useLazyLoad()

  return (
    <Link href={`/library/album/${id}`} key={id} className='column'>
      <img
        ref={elementRef}
        className={!isLazyLoad ? 'lazyload' : ''}
        src={isLazyLoad ? imageURL : ''}
        alt={`Album ${name} picture`}
      />
      <div className='column-details'>
        <div className='title'>{artist.name}</div>
        <div className='subtitle'>{name}</div>
      </div>
    </Link>
  )
}
