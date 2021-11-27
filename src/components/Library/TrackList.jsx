import { useEffect } from 'react'
import { DBACTIONS } from '../../actions/dbActions'
import { useAppContext } from '../../context/AppContext'
import { formatSeconds } from '../../helpers/formatSeconds'
import { Dropdown } from '../Dropdown/Dropdown'
import { Tooltip } from '../Tooltip/Tooltip'

export const TrackList = ({ tracks, actions = true, title = 'Tracks' }) => {
  const [, dispatch] = useAppContext()

  const handleUnmountDropdown = () => {
    dispatch({
      type: DBACTIONS.SET_ACTIVE_DROPDOWN,
      payload: { dropdownElement: null }
    })
  }

  const handlePlay = (track) => {
    dispatch({
      type: DBACTIONS.SET_CURRENT_TRACK,
      payload: { track }
    })
  }

  useEffect(() => {
    return () => handleUnmountDropdown()
  }, [])

  return tracks?.map((track) => (
    <div key={`search-${track._id}`} className='track'>
      {/* <div *ngIf="options.picture" appTooltip tooltip="{{ track.artist }} - {{ track.name }}" class="image">
    <img class="lazyloa
    d" [lazyLoad]="track?.album?.picture || '/assets/app-icon-text.png'" />
    </div> */}
      <div onClick={() => handlePlay(track)} className='track-metadata'>
        <div className='image'>
          <img
            // className='lazyloadd'
            src={`http://localhost:5000${
              track?.album?.image[0] || '../../assets/app-icon.png'
            }`}
          />
        </div>
        <div className='details'>
          <div className='overflow-text'>
            <div className='title'>{track.name}</div>
            <div className='subtitle'>{track.artist}</div>
          </div>
        </div>
      </div>
      <div className='track-actions'>
        <Tooltip className='actions lossless' tooltip='lyrics available'>
          <i className='feather feather-list'></i>
        </Tooltip>
        <Tooltip className='actions lossless' tooltip='Lossless'>
          <i className='feather feather-headphones' />
        </Tooltip>

        <Tooltip className='duration' tooltip='duration'>
          {formatSeconds(track.duration)}
        </Tooltip>
        {actions && (
          <div className='actions'>
            <Dropdown id={track._id} dropdown config={{ side: 'right' }}>
              <div className='dropdown-action-list'>
                <a>Add to playlist</a>
                <a>Add to queue</a>

                <a>More from artist</a>
                <a>Go to album</a>
                <a>Download</a>

                <a>Remove from playlist</a>
              </div>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  ))
}
