import React from 'react'
import { Link } from 'wouter'
import { Dropdown } from '../../Dropdown/Dropdown'
import './styles.scss'
import cover from '../../../assets/app-icon.png'
import { Slider } from '../..//Slider/Slider'
import { BottomSheet } from '../..//BottomSheet/BottomSheet'
import { useAppContext } from '../../../context/AppContext'
import { formatSeconds } from '../../../helpers/playerHelpers'
import { DBACTIONS } from '../../../actions/dbActions'
import { useEffect, useMemo, useState } from 'react'
import { TrackList } from '../..//Library/TrackList'
import { AlbumImage } from '../AlbumImage'

export const NowPlayingPlayer = ({ player }) => {
  const [{ queue }, dispatch] = useAppContext()
  const [queueVisible, toggleQueueVisible] = useState(false)
  const [volumeClassName, setVolumeClassName] = useState('')

  const {
    playbackState,
    volume,
    togglePlayPause,
    seekPlaybackProgress,
    seekVolume,
    setShuffleMode,
    setRepeatMode,
    skipNextTrack,
    skipPrevTrack,
    setMutedVolume
  } = player

  const queueDuration = useMemo(() => {
    let queueLength = 0
    queue?.forEach((track) => {
      if (track.duration) {
        queueLength += track.duration
      }
    })
    return queueLength
  }, [queue])

  useEffect(() => {
    if (playbackState.muted === true || volume === 0)
      setVolumeClassName('feather-volume-x')
    else if (volume > 0 && volume <= 0.2) setVolumeClassName(' feather-volume')
    else if (volume < 0.5) setVolumeClassName('feather-volume-1')
    else if (volume >= 0.5) setVolumeClassName('feather-volume-2')
  }, [playbackState.muted, volume])

  const handleMute = () => {
    setMutedVolume()
  }

  const handleClickBack = () => {
    dispatch({
      type: DBACTIONS.SET_BIG_PLAYER_UI,
      payload: false
    })
  }

  const handleLikeTrack = () => {
    console.log('like')
  }

  const handleShuffle = () => {
    setShuffleMode()
  }

  const handleRepeat = () => {
    setRepeatMode()
  }

  const handleQueue = () => {
    toggleQueueVisible(!queueVisible)
  }

  const handleNextSong = () => {
    skipNextTrack()
  }

  const handlePrevSong = () => {
    skipPrevTrack()
  }

  return (
    <div className='container mx-auto'>
      <div className='playing'>
        <div className='playing-header'>
          <div className='playing-header-action'>
            <div
              onClick={handleClickBack}
              className='playing-header-action-item'
            >
              <i className='feather-chevron-down'></i>
            </div>
          </div>
          <div className='playing-header-playing'>
            <div className='title'>Now Playing</div>
          </div>
          <div className='playing-header-action'>
            <Dropdown config={{ side: 'right' }}>
              <div className='dropdown-action-list'>
                <Link href='#'>Lyrics</Link>
                <Link href='#'>Add to playlist</Link>

                <Link href='#'>More from artist</Link>
                <Link href='#'>Go to album</Link>
                <div className='divider no-margin'></div>

                <Link href='#'>Clear queue</Link>
              </div>
            </Dropdown>
          </div>
        </div>
        <div className='playing-carousel'>
          <div className='image-wrap'>
            <AlbumImage currentTrack={playbackState.currentTrack} />
          </div>
        </div>
        <div className='playing-track'>
          <div className='playing-track-details'>
            <div className='name'>
              <div className='overflow-text'>
                {playbackState.currentTrack?.name}
              </div>
            </div>

            <div className='artists'>
              {playbackState.currentTrack?.artists[0]?.name}
            </div>
          </div>

          <div className='playing-track-actions'>
            <div onClick={handleLikeTrack} className='active'>
              <i className='feather-heart'></i>
            </div>
          </div>
        </div>
        <div className='playing-progress'>
          <div className='playing-progress-slider'>
            <Slider
              // seekable
              // options={{ vertical: false, autosize: false }}
              // buffer={100}
              type='progress'
              handleChange={seekPlaybackProgress}
              value={playbackState.progress}
              max={playbackState.duration}
            />
            <div className='playing-progress-time'>
              <div className='current'>
                {!isNaN(playbackState.progress) &&
                  formatSeconds(playbackState.progress)}
              </div>

              <div className='total'>
                {!isNaN(playbackState.duration) &&
                  formatSeconds(playbackState.duration)}
              </div>
            </div>
          </div>
          {/* <app-slider [seekable]="!(buffering && playing)" [options]="{vertical: false, autoSize: false}"
  				[buffer]="buffer" [value]="progress" (valueChange)="onProgress($event)">
  			</app-slider>
                				<app-loading [loading]="buffering && playing"></app-loading>*/}
        </div>

        <div className='playing-controls'>
          <div
            onClick={handleShuffle}
            className={`playing-controls-control shuffle${
              playbackState.shuffle ? ' active' : ''
            }`}
          >
            <span className='material-icons-round '>shuffle</span>
          </div>
          <div className='playing-controls-control grow'>
            <div
              onClick={handlePrevSong}
              className={`skip${playbackState.isFirst ? ' disabled' : ''}`}
            >
              <span className='material-icons-round'>skip_previous</span>
            </div>

            <div onClick={togglePlayPause} className=' playback'>
              <span className='material-icons-round'>
                {playbackState.isPlaying ? 'pause' : 'play_arrow'}
              </span>
            </div>

            <div
              onClick={handleNextSong}
              className={`skip${playbackState.isLast ? ' disabled' : ''}`}
            >
              <span className='material-icons-round'>skip_next</span>
            </div>
          </div>

          <div
            onClick={handleRepeat}
            className={`playing-controls-control repeat${
              playbackState.repeat ? ' active' : ''
            }`}
          >
            <span className='material-icons-round'>repeat</span>
          </div>
        </div>
        <div className='playing-volume'>
          <div className='playing-volume-controls'>
            <div className='playing-volume-controls-level' onClick={handleMute}>
              <i className={volumeClassName} />
            </div>
            <div className='playing-volume-controls-slider'>
              {/* <app-slider [options]="{vertical: false, autoSize: false}" [value]="volume"
  					(valueChange)="onVolume($event)">
  				</app-slider> */}
              <Slider
                options={{ vertical: false, autosize: false }}
                type='volume'
                value={volume}
                handleChange={seekVolume}
              />
            </div>
          </div>
        </div>
        {!queueVisible ? (
          <div className='playing-queue'>
            <div className='playing-queue-header'>
              <div className='playing-queue-header-action'>
                <div
                  onClick={handleQueue}
                  className='playing-header-action-item'
                  style={{ paddingRight: '15px' }}
                >
                  <i className='material-icons-round'>keyboard_arrow_up</i>
                </div>
              </div>
              <div className='playing-queue-header-playing'>
                <div className='title'>Queue</div>
                <div className='subtitle'>
                  {`${queue?.length} Songs in queue | Duration: ${formatSeconds(
                    queueDuration
                  )}`}
                </div>
              </div>

              <div className='playing-queue-header-action'>
                <div className='playing-header-action-item'>
                  <i className='material-icons-round'>queue_music</i>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <BottomSheet handleQueue={handleQueue} visible={queueVisible}>
              <TrackList tracks={queue && queue} actions={false} />
            </BottomSheet>
          </>
        )}
      </div>
    </div>
  )
}
