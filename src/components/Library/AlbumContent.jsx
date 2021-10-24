import debounce from 'just-debounce-it'
import React, { useCallback, useEffect, useRef } from 'react'
import { useLazyLoad } from '../../hooks/useLazyLoad'
import cover from '../../assets/app-icon.png'

export const AlbumContent = React.memo(
  ({ albums = [], nextBlock, isLoading }) => {
    const externalRef = useRef()
    const { isVisible } = useLazyLoad({ externalRef, once: false })

    const debounceLoadMore = useCallback(
      debounce(() => {
        nextBlock('albums')
      }, 1000),
      []
    )

    useEffect(
      function () {
        if (isVisible) {
          debounceLoadMore()
        }
      },
      [isVisible]
    )

    return albums.map((album) => {
      const imageURL =
        album.image && album.image[5] !== '' ? album.image[5] : cover
      return (
        <div key={album._id} className='column'>
          <img className={isLoading ? 'lazyload' : ''} src={imageURL} />
          <div className='column-details'>
            <div className='title'>{album.artist.name}</div>
            <div className='subtitle'>{album.name}</div>
          </div>
          <div id='visor' className='visor' ref={externalRef}></div>
        </div>
      )
    })
  }
)
