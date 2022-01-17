import React from 'react'
import { Link } from 'wouter'

export const PlaylistCard = ({ playlist }) => {
  return (
    <div className='playlist-card'>
      <div className='playlist-card-wrap-image'>
        <img src={playlist.images[0] || '/src/assets/app-icon.png'} alt='' />
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
