import { Link } from 'wouter'
import { Dropdown } from '../../components/Dropdown/Dropdown'
import { Header } from '../../components/Header/Header'
import './styles.scss'
import cover from '../../assets/app-icon.png'
import { Slider } from '../../components/Slider/Slider'
import { BottomSheet } from '../../components/BottomSheet/BottomSheet'
import { useAppContext } from '../../context/AppContext'
import { formatSeconds } from '../../helpers/formatSeconds'
import { usePlayer } from '../../components/Player/usePlayer'
import { useAudioPlayer } from '../../hooks/useAudioPlayer'
import { BASE_URLS } from '../../constants/endpoints'
import { DBACTIONS } from '../../actions/dbActions'
import { useEffect, useMemo, useState } from 'react'
import { TrackList } from '../../components/Library/TrackList'

export const NowPlayingScreen = () => {
  const [{ currentTrack, home }, dispatch] = useAppContext()
  const [queueVisible, toggleQueueVisible] = useState(false)
  const [queueDuuration, setQueueDuration] = useState(0)
  // const {
  //   currentTime,
  //   isPlaying,
  //   togglePlayPause,
  //   audioRef,
  //   progressRef,
  //   onChangeRange,
  //   audioSrc,
  //   onLoadedMetadata
  // } = usePlayer()

  const audioSrc = currentTrack?._id
    ? `${BASE_URLS.play}${currentTrack._id}`
    : ''

  const {
    ready,
    loading,
    error,
    playing,
    paused,
    duration,
    mute,
    loop,
    volume,
    seek,
    rate,
    onTogglePlayback,
    onPlay,
    onPause,
    onMute,
    onLoop,
    onVolume,
    onRate,
    onSeek
  } = useAudioPlayer({
    audioSrc,
    preload: true,
    autoplay: false,
    volume: 0.5,
    mute: false,
    loop: false,
    rate: 1.0
  })

  const queueDuration = useMemo(() => {
    let queueLength = 0
    home?.tracks.forEach((track) => {
      if (track.duration) {
        console.log(track.duration)
        queueLength += track.duration
        console.log(queueLength)
      }
    })
    return queueLength
  }, [home?.tracks])

  const handleClickBack = () => {
    dispatch({
      type: DBACTIONS.SET_BIG_PLAYER_UI
    })
    window.history.back()
  }

  const handleLikeTrack = () => {
    console.log('like')
  }

  const handleShuffle = () => {
    console.log('Shuffle')
  }

  const handleRepeat = () => {
    console.log('Repeat')
  }

  const handleQueue = () => {
    console.log('Queue')
    toggleQueueVisible(!queueVisible)
  }

  const handleNextSong = () => {
    console.log('Next')
  }

  const handlePrevSong = () => {
    console.log('Previous')
  }

  const handleDrag = (e) => {
    console.log(e)
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
            <img
              src={
                currentTrack.album.image[0]
                  ? `http://localhost:5000${currentTrack.album.image[0]}`
                  : cover
              }
            />
          </div>
        </div>
        <div className='playing-track'>
          <div className='playing-track-details'>
            <div className='name'>
              <div className='overflow-text'>{currentTrack.name}</div>
            </div>

            <div className='artists'>{currentTrack.artist}</div>
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
              handleChange={onSeek}
              value={seek}
              max={duration}
            />
            <div className='playing-progress-time'>
              <div className='current'>
                {!isNaN(seek) && formatSeconds(seek)}
              </div>

              <div className='total'>
                {!isNaN(duration) && formatSeconds(duration)}
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
            className='playing-controls-control shuffle active'
          >
            <span className='material-icons-round '>shuffle</span>
          </div>
          <div className='playing-controls-control grow'>
            <div onClick={handlePrevSong} className='skip disabled'>
              <span className='material-icons-round'>skip_previous</span>
            </div>

            <div onClick={onTogglePlayback} className=' playback'>
              <span className='material-icons-round'>
                {ready && playing ? 'pause' : 'play_arrow'}
              </span>
            </div>

            <div onClick={handleNextSong} className='skip'>
              <span className='material-icons-round'>skip_next</span>
            </div>
          </div>

          <div
            onClick={handleRepeat}
            className='playing-controls-control repeat'
          >
            <span className='material-icons-round'>repeat</span>
          </div>
        </div>
        <div className='playing-volume'>
          <div className='playing-volume-controls'>
            <div className='playing-volume-controls-level'>
              {/* <i *ngIf="volume === 0" class="feather-volume-x"></i>
  				<i *ngIf="volume <= 20 && volume > 0" class="feather-volume"></i>
  				<i *ngIf="volume < 50 && volume > 20" class="feather-volume-1"></i>
  				<i *ngIf="volume >= 50" class="feather-volume-2"></i> */}
              <i className='feather-volume-x' />
            </div>
            <div className='playing-volume-controls-slider'>
              {/* <app-slider [options]="{vertical: false, autoSize: false}" [value]="volume"
  					(valueChange)="onVolume($event)">
  				</app-slider> */}
              <Slider
                options={{ vertical: false, autosize: false }}
                type='volume'
                value={volume}
                handleChange={onVolume}
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
                  {`${
                    home?.tracks.length
                  } Songs in queue | Duration: ${formatSeconds(queueDuration)}`}
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
              <TrackList tracks={home?.tracks} actions={false} />
            </BottomSheet>
          </>
        )}
      </div>
    </div>
  )
}
