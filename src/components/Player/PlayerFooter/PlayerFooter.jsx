import './styles.scss'
import cover from '../../../assets/app-icon.png'
import { PlayerControls } from './PlayerFooterControls'
import { useAppContext } from '../../../context/AppContext'
import { useEffect, useRef, useState } from 'react'
import { formatSeconds } from '../../../helpers/formatSeconds'
import { usePlayer } from '../usePlayer'
import { Link } from 'wouter'
import { DBACTIONS } from '../../../actions/dbActions'

export const PlayerFooter = () => {
  // const changeCurrentTime = () => {
  //   setCurrentTime(audioRef.current.currentTime / maxProgress)
  // }
  const [{ currentTrack }, dispatch] = useAppContext()
  const {
    isPlaying,
    togglePlayPause,
    circumferenceProgress,
    audioRef,
    audioSrc,
    onLoadedMetadata,
    circumference
  } = usePlayer(currentTrack)

  const handleTogglePlaye = () => {
    dispatch({
      type: DBACTIONS.SET_BIG_PLAYER_UI
    })
  }

  return (
    <div className='player'>
      <audio
        onLoadedMetadata={onLoadedMetadata}
        ref={audioRef}
        src={audioSrc}
        preload='metadata'
      />

      <div onClick={handleTogglePlaye} className='player-metadata'>
        <div className='player-metadata-image'>
          <img
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
      <PlayerControls
        progress={circumferenceProgress}
        circumference={circumference}
        togglePlayPause={togglePlayPause}
        isPlaying={isPlaying}
      />
    </div>
  )
}
