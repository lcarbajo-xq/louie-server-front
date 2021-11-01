import { usePlayer } from '../usePlayer'
import { PlayerControls } from './PlayerControls'
import './styles.scss'
import { prominent } from 'color.js'
import Backdrop from './Backdrop'

prominent('js-logo.jpg', { amount: 1 }).then((color) => {
  console.log(color) // [241, 221, 63]
})
const coverUrl =
  'http://localhost:5000/albums/art/557216bf4cb8578f12bfd721a284d9f8.png'

export const PlayerLayout = ({ cover = coverUrl }) => {
  const {
    duration,
    onScrub,
    onScrubEnd,
    trackProgress,
    track,
    nextTrack,
    prevTrack,
    trackStyling,
    setIsPlaying,
    isPlaying
  } = usePlayer()

  const { title, artist, color } = track

  return (
    <div className='audio-player'>
      <div className='track-info'>
        <img
          className='artwork'
          src={cover}
          alt={`track artwork for ${title} by ${artist}`}
        />
        <h2 className='title'>{title}</h2>
        <h3 className='artist'>{artist}</h3>
        <PlayerControls
          nextTrack={nextTrack}
          prevTrack={prevTrack}
          isPlaying={isPlaying}
          onPlayOrPause={setIsPlaying}
        />
        <input
          type='range'
          value={trackProgress}
          step='1'
          min='0'
          max={duration ? duration : `${duration}`}
          className='progress'
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
      </div>
      <Backdrop activeColor={color} isPlaying={isPlaying} />
    </div>
  )
}
