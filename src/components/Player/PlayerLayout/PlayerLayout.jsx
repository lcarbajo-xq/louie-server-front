import { PlayerControls } from './PlayerControls'
import './styles.scss'
import { prominent } from 'color.js'
import Backdrop from './Backdrop'

export const PlayerLayout = ({ cover = coverUrl }) => {
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
