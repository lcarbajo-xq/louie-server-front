import './styles.scss'
import { PlayerPlaceholder } from './PlayerPlaceholder'
import { PlayerFooterContainer } from './PlayerFooterContainer'

export const PlayerFooter = ({
  currentTrack: track,
  onTogglePlayback,
  playing,
  ready,
  progressCircumference
}) => {
  return (
    <div className='player'>
      {ready ? (
        track && (
          <PlayerFooterContainer
            track={track}
            onTogglePlayback={onTogglePlayback}
            playing={playing}
            progressCircumference={progressCircumference}
          />
        )
      ) : (
        <PlayerPlaceholder />
      )}
    </div>
  )
}
