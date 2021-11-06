import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll'
import { Dropdown } from '../Dropdown/Dropdown'
import { SearchPlaceholder } from './SearchPlaceholder'
import { ArtistCard } from '../Library/ArtistCard'
import { AlbumCard } from '../Library/AlbumCard'
import { useAppContext } from '../../context/AppContext'
import { formatSeconds } from '../../helpers/formatSeconds'
import { useInputSearch } from '../../hooks/useInputSearch'
import cover from '../../assets/app-icon.png'

import './styles.scss'

const NoResults = () => <h3>No Results found</h3>

export const Search = ({ handlePlay }) => {
  const [{ home }] = useAppContext()

  const loading = false

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
          !search.length !== '' && (
            <>
              <div className='playlists-wrapper'>
                <h3>Playlists</h3>

                <div className='playlists'>
                  <HorizontalScroll>
                    {home?.playlists?.map((playlist) => {
                      if (playlist.liked) {
                        return (
                          <div
                            key={`search-${playlist.id}`}
                            className='playlist'
                          >
                            {playlist.name}
                          </div>
                        )
                      }
                    })}
                    {home?.playlists?.map((playlist) => {
                      if (!playlist.liked) {
                        return (
                          <div
                            key={`search-${playlist.id}`}
                            className='playlist'
                          >
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
                    {home?.artists?.map((artist) => {
                      const imageURL =
                        artist.image && artist.image[1] !== undefined
                          ? artist.image[1]
                          : cover
                      return (
                        <ArtistCard
                          key={artist._id}
                          imageURL={imageURL}
                          name={artist.name}
                          id={artist._id}
                        />
                      )
                    })}
                  </div>
                </HorizontalScroll>
              </div>

              <div className='albums-wrapper'>
                <h3>Albums</h3>
                <HorizontalScroll>
                  <div className='albums'>
                    {home?.albums?.map((album) => {
                      const imageURL =
                        album.image && album.image[5] !== ''
                          ? album.image[5]
                          : cover
                      return (
                        <AlbumCard
                          key={album._id}
                          id={album._id}
                          imageURL={imageURL}
                          artist={album.artist}
                          name={album.name}
                        />
                      )
                    })}
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
                  {home?.tracks?.map((track) => (
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
                            track?.album?.image[0] ||
                            '../../assets/app-icon.png'
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
          )
        )}
      </div>
    </section>
  )
}
