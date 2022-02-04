import { Link } from 'wouter'
import { useVibrantColor } from '../../hooks/useVibrantColor'

export const PlaylistCard = ({ playlist }) => {
  const { dominantColorNoOpacity } = useVibrantColor({
    imageSrc: playlist?.images[0]?.url || '/src/assets/app-icon.png'
  })

  return (
    <div
      className='playlist-card'
      style={{
        background: `linear-gradient(90deg , rgba(${dominantColorNoOpacity}, .6), rgba(${dominantColorNoOpacity}, .5))`
      }}
    >
      <div className='playlist-card-wrap-image'>
        <img
          src={playlist?.images[0]?.url || '/src/assets/app-icon.png'}
          alt=''
        />
      </div>
      <div
        className={`playlist-card-wrap-info ${
          playlist.private ? 'inactive' : ''
        }`}
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
