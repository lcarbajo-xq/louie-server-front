import React from 'react'
import { Link } from 'wouter'
import { DBACTIONS } from '../../../actions/dbActions'
import { circumference } from '../../../constants/progressConstants'
import { useAppContext } from '../../../context/AppContext'
import { PlayerControls } from './PlayerFooterControls'

export const PlayerFooterContainer = ({
  track,
  onTogglePlayback,
  progressCircumference,
  playing
}) => {
  const [, dispatch] = useAppContext()
  const handleTogglePlayer = () => {
    dispatch({
      type: DBACTIONS.SET_BIG_PLAYER_UI,
      payload: true
    })
  }
  return (
    <>
      <div onClick={handleTogglePlayer} className='player-metadata'>
        <div className='player-metadata-image'>
          <img
            // src={
            //   currentTrack
            //     ? `http://localhost:5000${currentTrack?.album.image[0]}`
            //     : cover
            // }
            src={
              track ? `http://localhost:5000${track?.album.image[0]}` : cover
            }
            alt='cover'
          />
        </div>
        <Link href='/player' className='player-metadata-details'>
          <div className='player-metadata-details-artist'>{track?.artist}</div>
          <div className='player-metadata-details-song'>{track?.name}</div>
        </Link>
        {/* <div className='player-metadata-details-song'>
          {duration && !isNaN(duration) && formatSeconds(duration)}
        </div> */}
      </div>
      <PlayerControls
        progress={progressCircumference}
        circumference={circumference}
        togglePlayPause={onTogglePlayback}
        isPlaying={playing}
      />
    </>
  )
}
