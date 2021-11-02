import { ShinerComponent } from '../Shiner/ShinerComponent'
import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll'

import cover from '../../assets/app-icon.png'
import { Dropdown } from '../Dropdown/Dropdown'
import { formatSeconds } from '../../helpers/formatSeconds'

import { useServices } from '../../hooks/useServices'
import { DBACTIONS } from '../../actions/dbActions'
import { useInputSearch } from '../../hooks/useInputSearch'

import './styles.scss'
import { SearchPlaceholder } from './SearchPlaceholder'

const NoResults = () => <h3>No Results found</h3>

export const Search = ({ handlePlay }) => {
  const { state, loading } = useServices('search')

  const { search, isEmpty, handleInputChange, searchResults } = useInputSearch()

  return (
    <section className='app-route'>
      <div className='search-container'>
        <div className='search-component'>
          <input
            className='search-input'
            type='text'
            placeholder='Search Albums, Tracks or Artists'
            value={search}
            onChange={handleInputChange}
          />
        </div>
        {loading ? (
          <SearchPlaceholder />
        ) : isEmpty ? (
          <NoResults />
        ) : (
          <>
            <div className='playlists-wrapper'>
              <h3>Playlists</h3>

              <div className='playlists'>
                <HorizontalScroll>
                  {state?.playlists?.map((playlist) => {
                    if (playlist.liked) {
                      return (
                        <div key={`search-${playlist.id}`} className='playlist'>
                          {playlist.name}
                        </div>
                      )
                    }
                  })}
                  {state?.playlists?.map((playlist) => {
                    if (!playlist.liked) {
                      return (
                        <div key={`search-${playlist.id}`} className='playlist'>
                          {playlist.name}
                        </div>
                      )
                    }
                  })}
                </HorizontalScroll>
              </div>
            </div>
            <div className='artists-wrapper'>
              <h3>Artists</h3>
              <HorizontalScroll>
                <div className='artists'>
                  {searchResults?.artists?.map((artist) => (
                    <div key={`search-${artist._id}`} className='artist'>
                      <img
                        className={loading ? 'lazyload' : 'lazyloaded'}
                        src={
                          artist.image && artist.image[1] !== ''
                            ? artist.image[1]
                            : cover
                        }
                      />
                      <div className='column-details'>
                        <div className='title'>{artist.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </HorizontalScroll>
            </div>

            <div className='albums-wrapper'>
              <h3>Albums</h3>
              <HorizontalScroll>
                <div className='albums'>
                  {searchResults?.albums?.map((album) => (
                    <div key={`search-${album._id}`} className='album'>
                      <img
                        className={loading ? 'lazyload' : 'lazyloaded'}
                        src={
                          album.image && album.image[3] !== ''
                            ? album.image[3]
                            : cover
                        }
                      />
                      <div className='column-details'>
                        <div className='title'>{album.name}</div>
                        <div className='subtitle'>{album.artist.name}</div>
                      </div>
                    </div>
                  ))}
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
                {searchResults?.tracks?.map((track) => (
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
                    <div className='duration'>
                      {formatSeconds(track.duration)}
                    </div>

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
        )}
      </div>
    </section>
  )
}
