import debounce from 'just-debounce-it'
import { useCallback, useEffect, useRef } from 'react'
import { useLazyLoad } from '../../hooks/useLazyLoad'
import { Dropdown } from '../Dropdown/Dropdown'

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
    <div className='playlists'>
      {playlists.map((playlist) => (
        <div key={playlist._id} className='playlist'>
          <div className='playlist-name'>{playlist.name}</div>

          <Dropdown isOpen={true} dropdown config={{ side: 'right' }}>
            <div className='dropdown-action-list'>
              <a>Edit</a>
              <a>Delete</a>
            </div>
          </Dropdown>
        </div>
      ))}
      <div id='visor' className='visor' ref={externalRef}></div>
    </div>
  )
}
