import { useState } from 'react'
import { useAppContext } from '../../context/AppContext'
import { Dropdown } from '../Dropdown/Dropdown'
import { Tooltip } from '../Tooltip/Tooltip'
import { formatSeconds } from '../../helpers/playerHelpers'

export const Track = ({
  contextUri,
  track,
  type,
  actions = true,
  setSpotifyCurrentTrack
}) => {
  const [, dispatch] = useAppContext()
  const [isHover, setIsHover] = useState(false)

  const handlePlay = () => {
    console.log(track)
    if (track.source) {
      setSpotifyCurrentTrack(track)
    } else {
      setSpotifyCurrentTrack({
        ...track,
        contextUri,
        source: 'spotify'
      })
    }
  }

  return (
    <div key={`search-${track._id}`} className='track'>
      {/* <div *ngIf="options.picture" appTooltip tooltip="{{ track.artist }} - {{ track.name }}" class="image">
    <img class="lazyloa
    d" [lazyLoad]="track?.album?.picture || '/assets/app-icon-text.png'" />
    </div> */}
      <div onClick={() => handlePlay(track)} className='track-metadata'>
        <div className='image'>
          <img
            // className='lazyloadd'
            src={
              type === 'database'
                ? `http://localhost:5000${track?.album?.image[0]}` ||
                  '../../assets/app-icon.png'
                : track.album.image
            }
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
          {type === 'database'
            ? formatSeconds(track.duration)
            : formatSeconds(track.duration / 1000)}
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
