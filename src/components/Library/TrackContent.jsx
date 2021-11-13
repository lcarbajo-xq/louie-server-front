import React from 'react'
import { TrackList } from './TrackList'

export const TrackContent = ({ tracks, title = 'Tracks' }) => {
  return (
    <div className='tracks-wrapper'>
      <div className='title-wrapper'>
        <h3>{title}</h3>
        <div className='action'>
          <div className='play-button'>Play</div>
        </div>
      </div>

      <div className='grid'>{tracks && <TrackList tracks={tracks} />}</div>
    </div>
  )
}
