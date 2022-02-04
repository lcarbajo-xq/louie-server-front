import { Track } from './Track'

export const TrackList = ({
  context,
  tracks,
  title = 'Tracks',
  type = 'spotify'
}) => {
  return (
    <div className='tracks-wrapper'>
      <div className='title-wrapper'>
        <h3>{title}</h3>
        <div className='play-button'>Play</div>
      </div>

      <div className='grid track-list'>
        {tracks !== undefined &&
          tracks?.map((track, i) => (
            <Track
              key={track.id ? i + track.id : i + track._id}
              context={context}
              type={type}
              track={track}
            />
          ))}
      </div>
    </div>
  )
}
