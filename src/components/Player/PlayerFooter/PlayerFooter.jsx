import './styles.scss'
import cover from '../../../assets/app-icon.png'
import { PlayerControls } from './PlayerFooterControls'
import { useAppContext } from '../../../context/AppContext'
import { Link } from 'wouter'
import { DBACTIONS } from '../../../actions/dbActions'
import { circumference } from '../../../constants/progressConstants'
import { Spinner } from '../../Spinner/Spinner'

export const PlayerFooter = ({
  currentTrack,
  onTogglePlayback,
  playing,
  ready,
  progressCircumference
}) => {
  const [_, dispatch] = useAppContext()

  const handleTogglePlayer = () => {
    dispatch({
      type: DBACTIONS.SET_BIG_PLAYER_UI,
      payload: true
    })
  }

  return (
    <div className='player'>
      <div onClick={handleTogglePlayer} className='player-metadata'>
        <div className='player-metadata-image'>
          <img
            // src={
            //   currentTrack
            //     ? `http://localhost:5000${currentTrack?.album.image[0]}`
            //     : cover
            // }
            src={
              currentTrack
                ? `http://localhost:5000${currentTrack?.album.image[0]}`
                : cover
            }
            alt='cover'
          />
        </div>
        <Link href='/player' className='player-metadata-details'>
          <div className='player-metadata-details-artist'>
            {currentTrack?.artist}
          </div>
          <div className='player-metadata-details-song'>
            {currentTrack?.name}
          </div>
        </Link>
        {/* <div className='player-metadata-details-song'>
          {duration && !isNaN(duration) && formatSeconds(duration)}
        </div> */}
      </div>
      {currentTrack &&
        (ready ? (
          <PlayerControls
            progress={progressCircumference}
            circumference={circumference}
            togglePlayPause={onTogglePlayback}
            isPlaying={playing}
          />
        ) : (
          <Spinner />
        ))}
    </div>
  )
}
