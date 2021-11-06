import debounce from 'just-debounce-it'
import { useCallback, useEffect, useRef } from 'react'
import { useLazyLoad } from '../../hooks/useLazyLoad'
import cover from '../../assets/app-icon.png'
import { ArtistCard } from './ArtistCard'

export const ArtistContent = ({
  artists = [],
  nextBlock,
  isLoading,
  setArtist
}) => {
  return (
    <>
      {artists.map((artist) => {
        const imageURL =
          artist.image && artist.image[1] !== undefined
            ? artist.image[1]
            : cover
        return (
          <div key={artist._id} onClick={() => setArtist(artist)}>
            <ArtistCard
              imageURL={imageURL}
              name={artist.name}
              id={artist._id}
            />
          </div>
        )
      })}
    </>
  )
}
