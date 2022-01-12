import { Track } from './Track'

export const TrackList = ({
  contextUri,
  tracks,
  setSpotifyCurrentTrack,
  actions = true,
  title = 'Tracks',
  type = 'database'
}) => {
  // const handleUnmountDropdown = () => {
  //   dispatch({
  //     type: DBactions.SET_ACTIVE_DROPDOWN,
  //     payload: { dropdownElement: null }
  //   })
  // }

  // useEffect(() => {
  //   return () => handleUnmountDropdown()
  // }, [])

  return (
    <div className='tracks-wrapper'>
      <div className='title-wrapper'>
        <h3>{title}</h3>
        <div className='action'>
          <div className='play-button'>Play</div>
        </div>
      </div>
      <div className='grid'>
        {tracks !== undefined &&
          tracks?.map((track, i) => (
            <Track
              setSpotifyCurrentTrack={setSpotifyCurrentTrack}
              key={track._id + i}
              contextUri={contextUri}
              type={type}
              track={track}
            />
          ))}
      </div>
    </div>
  )
}
