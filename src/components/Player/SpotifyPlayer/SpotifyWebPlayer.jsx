import { Spinner } from '../../Spinner/Spinner'
import { PlayerControls } from '../PlayerFooter/PlayerFooterControls'
import { circumference } from '../../../constants/progressConstants'
import { useAppContext } from '../../../context/AppContext'
import { DBACTIONS } from '../../../actions/dbActions'
import { Link } from 'wouter'
import SpotifyIcon from '../../Icons/SpotifyIcon'
import cover from '../../../assets/app-icon.png'
import './styles.scss'

export const SpotifyWebPlayer = ({
  currentTrack,
  progressCirumference,
  isPlaying,
  togglePlayPause,
  isActive
}) => {
  const [, dispatch] = useAppContext()

  const handleTogglePlayer = () => {
    dispatch({
      type: DBACTIONS.SET_BIG_PLAYER_UI,
      payload: true
    })
  }

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
        <div className='player-metadata' onClick={handleTogglePlayer}>
          <div className='player-metadata-image'>
            <img
              src={currentTrack ? currentTrack?.album.images[0].url : cover}
              alt='cover'
            />
          </div>
          <Link href='/player' className='player-metadata-details'>
            <div className='player-metadata-details-artist'>
              {currentTrack?.artists[0].name}
            </div>
            <div className='player-metadata-details-song'>
              {currentTrack?.name}
            </div>
          </Link>
          {/* <div className='player-metadata-details-song'>
            {duration && !isNaN(duration) && formatSeconds(duration)}
          </div> */}
          <div className='player-icon'>
            <SpotifyIcon />
          </div>
        </div>

        {currentTrack &&
          (isActive ? (
            <PlayerControls
              progress={progressCirumference}
              circumference={circumference}
              togglePlayPause={togglePlayPause}
              isPlaying={isPlaying}
            />
          ) : (
            <Spinner />
          ))}
      </div>
    )
  }
}
