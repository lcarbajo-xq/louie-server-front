import React from 'react'
import { Link } from 'wouter'

export const PlaylistCard = ({ playlist }) => {
  return (
    <Link
      href={`/library/playlist/${playlist._id}`}
      key={`search-${playlist._id}`}
      className={`playlist ${playlist.private ? 'inactive' : ''}`}
    >
      {playlist.name}
    </Link>
  )
}
