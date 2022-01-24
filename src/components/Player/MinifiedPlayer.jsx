import { circumference } from '../../constants/progressConstants'
import { PlayerControls } from './PlayerFooter/PlayerFooterControls'
import { PlayerPlaceholder } from './PlayerFooter/PlayerPlaceholder'
import { PlayerMetadata } from './PlayerMetadata'

export const MinifiedPlayer = ({ player, togglePlayer }) => {
  const { togglePlayPause, playbackState } = player
  const { progressCircumference, isPlaying, currentTrack } = playbackState

  return (
    <div className='player'>
      {!currentTrack ? (
        <PlayerPlaceholder />
      ) : (
        <>
          <div onClick={togglePlayer} className='player-metadata'>
            <PlayerMetadata currentTrack={currentTrack} />
          </div>
          <PlayerControls
            progress={progressCircumference}
            circumference={circumference}
            togglePlayPause={togglePlayPause}
            isPlaying={isPlaying}
          />
        </>
      )}
    </div>
  )
}
