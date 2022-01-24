export const PlayerControls = ({
  isPlaying,
  togglePlayPause,
  progress,
  circumference
}) => {
  return (
    <div onClick={togglePlayPause} className='player-actions'>
      <div className='player-actions-action'>
        <span className='material-icons-round'>
          {isPlaying ? 'pause' : 'play_arrow'}
        </span>
        <svg height='40' width='40'>
          <circle
            className='progress-ring'
            cx='20'
            cy='20'
            r={19}
            strokeWidth='2'
            strokeDasharray={Math.floor(circumference)}
            strokeDashoffset={progress && progress}
            fillOpacity='0'
          />
        </svg>
      </div>
    </div>
  )
}
