import React, { useEffect, useState } from 'react'
import { Header } from '../../components/Header/Header'
import { TrackList } from '../../components/Library/TrackList'
import { getPlaylistFromDB } from '../../services/databaseService'
import cover from '../../assets/app-icon.png'

export const PlaylisScreen = ({ id }) => {
  const [playlistData, setPlaylistData] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getPlaylistFromDB(id).then((data) => {
      setPlaylistData({
        ...data
      })
      setLoading(false)
    })
  }, [])

  return (
    <>
      <Header
        title={`Playlist: ${playlistData?.playlist?.name} by ${playlistData?.playlist?.author?.id}`}
        static='true'
        back='true'
        transparent='true'
      />

      <div className='album-meta'>
        <div className='picture'>
          <img
            className='album-picture'
            src={playlistData?.playlist?.images[0] || cover}
          />
        </div>
        <div className='details'>
          {/* <div [routerLink]="['/', { outlets: { modal: ['modal', 'artists', album?.artist?._id] } }]"
           */}

          <div className='album-title'>{playlistData?.playlist?.name}</div>
          {/* <div>{{ tracks.length }} Songs; <i appTooltip tooltip="Duration" className="feather-clock"></i> {{ duration |
                    formatSeconds }}</div> */}
          <div className='album-artist'>
            <img
              className='artist-picture'
              src={playlistData?.authorImages[0]?.url || cover}
            />
            {playlistData?.playlist?.author?.id}
          </div>
          <div className='album-length'>{`${playlistData?.total} Songs`}</div>
          <div className='play-button'>Play</div>
        </div>
      </div>
      <TrackList
        contextUri={playlistData?.playlist?.uri}
        tracks={playlistData?.tracks}
        type='spotify'
      />
    </>
  )
}
