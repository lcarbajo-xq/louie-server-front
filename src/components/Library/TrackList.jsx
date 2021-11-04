import { formatSeconds } from '../../helpers/formatSeconds'
import { Dropdown } from '../Dropdown/Dropdown'

export const TrackList = ({ tracks, handlePlay }) => {
  return (
    <div className='tracks-wrapper'>
      <div className='title-wrapper'>
        <h3>Tracks</h3>
        <div className='action'>
          <div className='play-button'>Play</div>
        </div>
      </div>

      <div className='grid'>
        {/* <div className="track {{ playerService.$track.getValue()._id === track._id ? 'playing' : '' }}"> */}
        {tracks?.map((track) => (
          <div
            key={`search-${track._id}`}
            onClick={() => handlePlay(track)}
            className='track'
          >
            {/* <div *ngIf="options.picture" appTooltip tooltip="{{ track.artist }} - {{ track.name }}" class="image">
    <img class="lazyloa
    d" [lazyLoad]="track?.album?.picture || '/assets/app-icon-text.png'" />
    </div> */}
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

            {/* Tooltip */}

            <div
              className='actions lossless'
              // appTooltip
              // tooltip='Lyrics availalbe'
            >
              <i className='feather feather-list'></i>
            </div>
            <div className='actions lossless'>
              {/* appTooltip tooltip='Lossless'> */}
              <i className='feather feather-headphones'></i>
            </div>

            {/*  | formatSeconds} */}
            <div className='duration'>{formatSeconds(track.duration)}</div>

            <div className='actions'>
              <Dropdown dropdown config={{ side: 'right' }}>
                <div className='dropdown-action-list'>
                  <button>Add to playlist</button>
                  <a>Add to queue</a>

                  <a>More from artist</a>
                  <a>Go to album</a>
                  <a>Download</a>

                  <a>Remove from playlist</a>
                </div>
              </Dropdown>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
