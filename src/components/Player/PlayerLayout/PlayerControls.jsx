import { Next } from './Next'
import { Pause } from './Pause'
import { Play } from './Play'
import { Prev } from './Prev'

export const PlayerControls = ({
  nextTrack,
  prevTrack,
  isPlaying,
  onPlayOrPause
}) => {
  const onPrevClick = () => {}

  const onNextClick = () => {}

  return (
    <div className='audio-controls'>
      <button
        type='button'
        className='prev'
        aria-label='Previous'
        onClick={prevTrack}
      >
        {/* <span className='material-icons-round'>skip_previous</span> */}
        <Prev />
      </button>
      {isPlaying ? (
        <button
          type='button'
          className='pause'
          onClick={() => onPlayOrPause(false)}
          aria-label='Pause'
        >
          <Pause />
        </button>
      ) : (
        <button
          type='button'
          className='play'
          onClick={() => onPlayOrPause(true)}
          aria-label='Play'
        >
          {/* <span className='material-icons-round'>play_arrow'</span> */}
          <Play />
        </button>
      )}
      <button
        type='button'
        className='next'
        aria-label='Next'
        onClick={nextTrack}
      >
        {/* <span className='material-icons-round'>skip_next</span> */}
        <Next />
      </button>
    </div>
  )
}
