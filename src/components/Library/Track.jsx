import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/AppContext'
import { Dropdown } from '../Dropdown/Dropdown'
import { Tooltip } from '../Tooltip/Tooltip'
import { formatSeconds } from '../../helpers/playerHelpers'
import { AlbumImage } from '../Player/AlbumImage'
import { DBACTIONS } from '../../actions/dbActions'
import { getTracksFromAlbum } from '../../services/databaseService'

export const Track = ({ context, track, type, actions = true }) => {
  const [{ selectedTrack }, dispatch] = useAppContext()
  const [isHover, setIsHover] = useState(false)
  const [active, setIsActive] = useState(false)

  useEffect(() => {
    if (track.source && track.source === 'local') {
      setIsActive(track._id === selectedTrack._id)
    } else {
      setIsActive(track.id === selectedTrack.id)
    }
  }, [selectedTrack, track])

  const setCurrentTrack = () => {
    console.log(track)
    if (track.source) {
      dispatch({
        type: DBACTIONS.SET_CURRENT_TRACK,
        payload: { ...track }
      })
    } else {
      dispatch({
        type: DBACTIONS.SET_CURRENT_TRACK,
        payload: {
          ...track,
          contextUri:
            context?.contextUri || `spotify:album:${track.album.id}` || '',
          source: type
        }
      })
    }
    if (track.source === 'local') {
      getTracksFromAlbum(track.album._id).then((data) => {
        dispatch({
          type: DBACTIONS.SET_TRACK_LIST,
          payload: data.tracks
        })
      })
    }
  }

  return (
    <div className={`track${active ? ' isplaying' : ''}`}>
      {/* <div *ngIf="options.picture" appTooltip tooltip="{{ track.artist }} - {{ track.name }}" class="image">
    <img class="lazyloa
    d" [lazyLoad]="track?.album?.picture || '/assets/app-icon-text.png'" />
    </div> */}
      <div onClick={setCurrentTrack} className='track-metadata'>
        <div className='image'>
          <AlbumImage currentTrack={track} />
        </div>
        <div className='details'>
          <div className='overflow-text'>
            <div className='title'>{track.name}</div>
            <div className='subtitle'>
              {track?.artists ? track?.artists[0]?.name : track?.artist}
            </div>
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
          {type === 'database'
            ? formatSeconds(track.duration_ms)
            : formatSeconds(track.duration_ms / 1000)}
        </Tooltip>

        <div className={isHover ? 'opacityVisible' : 'opacityZero'}>
          {actions && (
            <div
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              className='actions'
            >
              <Dropdown
                id={track._id}
                dropdown
                hover={isHover}
                config={{ side: 'right' }}
              >
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
    </div>
  )
}
