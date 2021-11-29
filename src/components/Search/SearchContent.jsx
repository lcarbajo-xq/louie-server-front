import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll'
import { AlbumCard } from '../Library/AlbumCard'
import { ArtistCard } from '../Library/ArtistCard'
import { TrackContent } from '../Library/TrackContent'
import cover from '../../assets/app-icon.png'
import { Link } from 'wouter'

export const SearchContent = ({ title = 'Welcome!', content }) => {
  return (
    <>
      <h1 className='title'>{title}</h1>
      <div className='playlists-wrapper'>
        <h3>Playlists</h3>

        <div className='playlists-scroll'>
          <HorizontalScroll>
            {content?.playlists?.map((playlist) => {
              return (
                <Link
                  href={`/library/playlist/${playlist._id}`}
                  key={`search-${playlist._id}`}
                  className={`playlist ${playlist.private ? 'inactive' : ''}`}
                >
                  {playlist.name}
                </Link>
              )
            })}
          </HorizontalScroll>
        </div>
      </div>
      <div className='artists-wrapper'>
        <h3>Artists</h3>
        <HorizontalScroll>
          <div className='artists'>
            {content?.artists?.map((artist) => {
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
            {content?.albums?.map((album) => {
              const imageURL =
                album.image && album.image[5] !== '' ? album.image[5] : cover
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

      <TrackContent tracks={content?.tracks} />
    </>
  )
}
