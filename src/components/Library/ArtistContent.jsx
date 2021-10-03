import debounce from 'just-debounce-it'
import { useCallback, useEffect, useRef } from 'react'
import { useLazyLoad } from '../../hooks/useLazyLoad'
import cover from '../../assets/app-icon.png'

export const ArtistContent = ({ artists = [], nextBlock }) => {
  const externalRef = useRef()
  const { isVisible } = useLazyLoad({ externalRef, once: false })

  const debounceLoadMore = useCallback(
    debounce(() => {
      nextBlock('artists')
    }, 1000),
    []
  )

  useEffect(
    function () {
      if (isVisible) debounceLoadMore()
    },
    [isVisible]
  )

  return artists.map((artist) => {
    const imageURL =
      artist.image && artist.image[1] !== '' ? artist.image[1] : cover
    return (
      <div key={artist._id} className='column'>
        <img width='170' height='170' className='lazyload' src={imageURL} />

        <div className='column-details'>
          <div className='title'>{artist.name}</div>
        </div>
        <div id='visor' className='visor' ref={externalRef}></div>
      </div>
    )
  })
}
