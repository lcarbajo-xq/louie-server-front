import './styles.scss'
import cover from '../../assets/app-icon.png'

export const Player = ({ isPlaying, songCover }) => {
  return (
    <div className='player'>
      <div className='player-metadata'>
        <div className='player-metadata-image'>
          <img src={songCover || cover} alt='cover' />
        </div>
        <div className='player-metadata-details'>
          <div className='player-metadata-details-artist'>Artist</div>
          <div className='player-metadata-details-song'>Song</div>
        </div>
      </div>
      <div className='player-actions'>
        <div className='player-actions-action'>
          <span className='material-icons-round'>
            {isPlaying ? 'pause' : 'play_arrow'}
          </span>
          <svg height='40' width='40'>
            <circle
              className='progress-ring'
              cx='20'
              cy='20'
              r='19'
              strokeWidth='2'
              strokeDasharray='circumference'
              strokeDashoffset='radialProgress'
              // [attr.stroke-dasharray]="circumference" [attr.stroke-dashoffset]="radialProgress"
              fillOpacity='0'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
