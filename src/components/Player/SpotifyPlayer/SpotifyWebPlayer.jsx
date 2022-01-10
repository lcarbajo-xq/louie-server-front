import { Spinner } from '../../Spinner/Spinner'
import { PlayerControls } from '../PlayerFooter/PlayerFooterControls'
import './styles.scss'
import cover from '../../../assets/app-icon.png'
import { circumference } from '../../../constants/progressConstants'
import { useSpotifyPlayer } from '../../../hooks/useSpotifyPlayer'

export const SpotifyWebPlayer = ({ token }) => {
  const { currentTrack, isActive, isPaused, playbackState, togglePlayPause } =
    useSpotifyPlayer({ token })

  if (!isActive) {
    return (
      <>
        <div className='container'>
          <div className='main-wrapper'>
            <b>
              {' '}
              Instance not active. Transfer your playback using your Spotify app{' '}
            </b>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <div className='player'>
        <div className='player-metadata'>
          <div className='player-metadata-image'>
            <img
              src={currentTrack ? currentTrack?.album.images[0].url : cover}
              alt='cover'
            />
          </div>
          <div href='/player' className='player-metadata-details'>
            <div className='player-metadata-details-artist'>
              {currentTrack?.artists[0].name}
            </div>
            <div className='player-metadata-details-song'>
              {currentTrack?.name}
            </div>
          </div>
          {/* <div className='player-metadata-details-song'>
            {duration && !isNaN(duration) && formatSeconds(duration)}
          </div> */}
        </div>
        {currentTrack &&
          (isActive ? (
            <PlayerControls
              progress={playbackState.progressCirumference}
              circumference={circumference}
              togglePlayPause={togglePlayPause}
              isPlaying={!isPaused}
            />
          ) : (
            <Spinner />
          ))}
      </div>
    )
  }
}
