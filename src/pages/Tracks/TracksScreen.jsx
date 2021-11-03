import { Dropdown } from '../../components/Dropdown/Dropdown'
import { Header } from '../../components/Header/Header'
import { HorizontalScroll } from '../../components/HorizontalScroll/HorizontalScroll'
import { useAppContext } from '../../context/AppContext'
import { formatSeconds } from '../../helpers/formatSeconds'
import { useServices } from '../../hooks/useServices'
import './styles.scss'

export const TracksScreen = () => {
  //   const [state] = useAppContext()
  const { state } = useServices('search')
  return (
    <>
      <Header title='Tracks'>
        <Dropdown config={{ side: 'right' }}>
          <div className='dropdown-action-list'>
            <a>
              Play <i className='feather-play'></i>
            </a>
            <div className='divider no-margin'></div>

            <a>Sort by name</a>
            <a>Sort by date</a>

            <div className='divider no-margin'></div>

            <div className='divider no-margin'></div>
            <a>
              Favourites <i className='feather-heart'></i>
            </a>

            <a>Genre</a>

            <a>Playlist</a>

            <div className='divider no-margin'></div>
            <a>20</a>
          </div>
        </Dropdown>
      </Header>

      <div className='filters'>
        <HorizontalScroll>
          <div className='filter'>Limit: 20</div>
          {/* *ngIf="filter.liked" (click)="onLiked() */}
          <div className='filter'>
            Favourites <i className='feather-x'></i>
          </div>
          {/* *ngIf="filter.genre" (click)="onClearGenre()" */}
          <div className='filter'>
            Garage-Rock <i className='feather-x'></i>
          </div>
          {/* *ngIf="filter.playlist" (click)="onClearPlaylist()" */}
          <div className='filter'>
            Romantic Distortion<i className='feather-x'></i>
          </div>
        </HorizontalScroll>
      </div>
      <div className='tracks-wrapper'>
        <div className='title-wrapper'>
          <h3>Tracks</h3>
          <div className='action'>
            <div className='play-button'>Play</div>
          </div>
        </div>

        <div className='grid'>
          {/* <div className="track {{ playerService.$track.getValue()._id === track._id ? 'playing' : '' }}"> */}
          {state?.tracks?.map((track) => (
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
    </>
  )
}
