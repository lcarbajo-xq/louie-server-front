import { Link } from 'wouter'
import { useVibrantColor } from '../../hooks/useVibrantColor'

export const PlaylistCard = ({ playlist }) => {
  const { dominantColor } = useVibrantColor({ imageSrc: playlist.images[0] })
  return (
    <div className='playlist-card'>
      <div className='playlist-card-wrap-image'>
        <img src={playlist.images[0] || '/src/assets/app-icon.png'} alt='' />
      </div>
      <div
        className={`playlist-card-wrap-info ${
          playlist.private ? 'inactive' : ''
        }`}
        style={{ backgroundColor: dominantColor }}
      >
        <Link
          href={`/library/playlist/${playlist._id}`}
          key={`search-${playlist._id}`}
          className={`playlist-info-title ${
            playlist.private ? 'inactive' : ''
          }`}
        >
          <p> {playlist.name}</p>
        </Link>
      </div>
    </div>
  )
}
