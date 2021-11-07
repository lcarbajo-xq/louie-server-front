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
import { TrackList } from '../Library/TrackList'

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
                      if (playlist.private) {
                        return (
                          <div
                            key={`search-${playlist._id}`}
                            className='playlist'
                          >
                            {playlist.name}
                          </div>
                        )
                      }
                    })}
                    {home?.playlists?.map((playlist) => {
                      if (!playlist.private) {
                        return (
                          <div
                            key={`search-${playlist._id}`}
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

              {home?.tracks && <TrackList tracks={home.tracks} />}
            </>
          )
        )}
      </div>
    </section>
  )
}
