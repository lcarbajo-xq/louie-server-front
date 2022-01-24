import React from 'react'

export const AlbumImage = ({ currentTrack }) => {
  const srcFromSource =
    currentTrack?.source === 'local'
      ? `http://localhost:5000${currentTrack?.album?.image[0]}`
      : currentTrack?.album?.images[0].url

  const src = srcFromSource ?? '/src/assets/app-icon.png'
  return <img src={src} alt='cover' />
}
