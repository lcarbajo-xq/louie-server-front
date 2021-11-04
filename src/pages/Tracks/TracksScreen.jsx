import { Dropdown } from '../../components/Dropdown/Dropdown'
import { Header } from '../../components/Header/Header'
import { HorizontalScroll } from '../../components/HorizontalScroll/HorizontalScroll'
import { TrackList } from '../../components/Library/TrackList'
import { useAppContext } from '../../context/AppContext'
import { formatSeconds } from '../../helpers/formatSeconds'
import './styles.scss'

export const TracksScreen = ({ handlePlay }) => {
  const [{ home }] = useAppContext()
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

      <TrackList tracks={home.tracks} handlePlay={handlePlay} />
    </>
  )
}
