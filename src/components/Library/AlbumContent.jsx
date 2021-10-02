import debounce from 'just-debounce-it'
import React, { useCallback, useEffect, useRef } from 'react'
import { useLazyLoad } from '../../hooks/useLazyLoad'
import { useServices } from '../../hooks/useServices'
import { albumReducer } from '../../reducers/albumReducer'
import { Spinner } from '../Spinner/Spinner'

const initialState = {
  albums: [],
  page: 0,
  limit: 20,
  tabName: 'albums'
}

export const AlbumContent = React.memo(({ albums, cover }) => {
  const { state, loading, nextBlock } = useServices(initialState, albumReducer)

  const externalRef = useRef()
  const { isVisible } = useLazyLoad({ externalRef, once: false })

  const debounceLoadMore = useCallback(
    debounce(() => nextBlock(), 1000),
    []
  )

  useEffect(
    function () {
      if (isVisible) debounceLoadMore()
    },
    [isVisible]
  )

  if (!loading)
    return state.albums.map((album) => {
      const imageURL =
        album.image && album.image[5] !== '' ? album.image[5] : cover
      return (
        <div key={album._id} className='column'>
          <img className='lazyload' src={imageURL} />
          <div className='column-details'>
            <div className='title'>{album.artist.name}</div>
            <div className='subtitle'>{album.name}</div>
          </div>
          <div id='visor' className='visor' ref={externalRef}></div>
        </div>
      )
    })
  else return <Spinner />
})
