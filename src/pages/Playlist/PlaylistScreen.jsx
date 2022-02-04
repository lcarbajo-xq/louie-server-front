import React, { useEffect, useState } from 'react'
import { Header } from '../../components/Header/Header'
import { TrackList } from '../../components/Library/TrackList'
import { getPlaylistFromDB } from '../../services/databaseService'
import cover from '../../assets/app-icon.png'

export const PlaylistScreen = ({ id, setSpotifyCurrentTrack }) => {
  const [playlistData, setPlaylistData] = useState(null)
  const [, setLoading] = useState(false)

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
            src={playlistData?.playlist?.images[0].url || cover}
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
            <div>{playlistData?.playlist?.author?.name}</div>
          </div>
          <div className='album-length'>{`${playlistData?.total} Songs`}</div>
        </div>
      </div>
      <TrackList
        setSpotifyCurrentTrack={setSpotifyCurrentTrack}
        contextUri={playlistData?.playlist?.uri}
        context={{
          contextUri: playlistData?.playlist?.uri,
          contextSource: 'spotify'
        }}
        tracks={playlistData?.tracks}
        type='spotify'
      />
    </>
  )
}
