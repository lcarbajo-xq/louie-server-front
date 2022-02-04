import { AlbumImage } from './AlbumImage'

export const PlayerMetadata = ({ currentTrack }) => {
  return (
    <>
      <div className='player-metadata-image'>
        <AlbumImage currentTrack={currentTrack} />
      </div>
      {/* <Link href='/player' className='player-metadata-details'> */}
      <div className='player-metadata-details'>
        <div className='player-metadata-details-artist'>
          {currentTrack?.source === 'local'
            ? currentTrack?.artist
            : currentTrack?.artists[0]?.name}
        </div>
        <div className='player-metadata-details-song'>{currentTrack?.name}</div>
      </div>
      {/* <div className='player-metadata-details-song'>
      {duration && !isNaN(duration) && formatSeconds(duration)}
      </div> */}
    </>
  )
}
