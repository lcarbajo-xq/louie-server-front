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
  const { elementRef: lastElementRef, isLazyLoad } = useLazyLoad()

  const debounceLoadMore = useCallback(
    debounce(() => {
      nextBlock('artists')
    }, 1000),
    []
  )

  useEffect(() => {
    if (isLazyLoad) {
      debounceLoadMore()
    }
  }, [isLazyLoad])

  return (
    <>
      {artists.map((artist) => {
        const imageURL =
          artist.image && artist.image[1] !== undefined
            ? artist.image[1]
            : cover
        console.log(imageURL)
        return (
          <div key={artist._id} onClick={() => setArtist(artist)}>
            <ArtistCard
              imageURL={imageURL}
              name={artist.name}
              id={artist._id}
              setArtist={setArtist}
            />
          </div>
        )
      })}
      <div ref={lastElementRef}></div>
    </>
  )
}
