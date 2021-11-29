import debounce from 'just-debounce-it'
import { useCallback, useEffect, useRef } from 'react'
import { Link } from 'wouter'
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
    <div className='grid'>
      {playlists.map((playlist) => (
        <Link
          href={`/library/playlist/${playlist._id}`}
          key={playlist._id}
          className='playlist'
        >
          <div className='playlist-meta'>
            <div className='image'>
              <img
                // className='lazyload'
                src={playlist.images[0] || '../../assets/app-icon.png'}
              />
            </div>
            <div className='playlist-name'>{playlist.name}</div>
          </div>

          <div className='playlist-actions'>
            <Dropdown id={playlist._id} dropdown config={{ side: 'right' }}>
              <div className='dropdown-action-list'>
                <a>Edit</a>
                <a>Delete</a>
              </div>
            </Dropdown>
          </div>
        </Link>
      ))}
      <div id='visor' className='visor' ref={externalRef}></div>
    </div>
  )
}
