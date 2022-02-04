import debounce from 'just-debounce-it'
import { useCallback, useEffect, useRef } from 'react'

import { useLazyLoad } from '../../hooks/useLazyLoad'
import { PlaylistCard } from './PlaylistCard'

export const PlaylistContent = ({ playlists = [], nextBlock }) => {
  const externalRef = useRef()
  const { isVisible } = useLazyLoad({ externalRef, once: false })

  const debounceLoadMore = useCallback(
    debounce(() => {
      nextBlock('playlists')
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
  return (
    <div className='playlists-scroll'>
      {playlists.map((playlist, i) => {
        return <PlaylistCard playlist={playlist} key={playlist._id} />
      })}
      <div id='visor' className='visor' ref={externalRef}></div>
    </div>
  )
}
