import { Link } from 'wouter'
import { Dropdown } from '../../components/Dropdown/Dropdown'
import './styles.scss'
import cover from '../../assets/app-icon.png'
import { Slider } from '../../components/Slider/Slider'
import { BottomSheet } from '../../components/BottomSheet/BottomSheet'
import { useAppContext } from '../../context/AppContext'
import { formatSeconds } from '../../helpers/playerHelpers'
import { DBACTIONS } from '../../actions/dbActions'
import { useEffect, useMemo, useState } from 'react'
import { TrackList } from '../../components/Library/TrackList'

export const NowPlayingScreen = ({
  ready,
  currentTrack,
  playing,
  duration,
  volume,
  seek,
  mute,
  repeat,
  shuffle,
  trackNumber,
  onTogglePlayback,
  onVolume,
  onSeek,
  onMute,
  onNext,
  onPrevious,
  onShuffle,
  onRepeat,
  isLast,
  isFirst
}) => {
  const [{ queue }, dispatch] = useAppContext()
  const [queueVisible, toggleQueueVisible] = useState(false)
  const [volumeClassName, setVolumeClassName] = useState('')

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
    return () =>
      dispatch({
        type: DBACTIONS.SET_BIG_PLAYER_UI,
        payload: false
      })
  }, [])

  useEffect(() => {
    if (mute === true || volume === 0) setVolumeClassName('feather-volume-x')
    else if (volume > 0 && volume <= 0.2) setVolumeClassName(' feather-volume')
    else if (volume < 0.5) setVolumeClassName('feather-volume-1')
    else if (volume >= 0.5) setVolumeClassName('feather-volume-2')
  }, [volume, mute])

  const handleMute = () => {
    onMute()
  }

  const handleClickBack = () => {
    window.history.back()
  }

  const handleLikeTrack = () => {
    console.log('like')
  }

  const handleShuffle = () => {
    onShuffle()
  }

  const handleRepeat = () => {
    onRepeat()
  }

  const handleQueue = () => {
    toggleQueueVisible(!queueVisible)
  }

  const handleNextSong = () => {
    onNext()
  }

  const handlePrevSong = () => {
    onPrevious()
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
            {/* <img
              src={
                currentTrack?.album?.images[0].url
                  ? currentTrack?.album?.images[0].url
                  : cover
              }
            /> */}
            <img
              src={
                currentTrack?.album?.image[0]
                  ? `http://localhost:5000${currentTrack.album.image[0]}`
                  : cover
              }
            />
          </div>
        </div>
        <div className='playing-track'>
          <div className='playing-track-details'>
            <div className='name'>
              <div className='overflow-text'>{currentTrack?.name}</div>
            </div>

            <div className='artists'>{currentTrack?.artists[0]?.name}</div>
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
            className={`playing-controls-control shuffle${
              shuffle ? ' active' : ''
            }`}
          >
            <span className='material-icons-round '>shuffle</span>
          </div>
          <div className='playing-controls-control grow'>
            <div
              onClick={handlePrevSong}
              className={`skip${isFirst ? ' disabled' : ''}`}
            >
              <span className='material-icons-round'>skip_previous</span>
            </div>

            <div onClick={onTogglePlayback} className=' playback'>
              <span className='material-icons-round'>
                {playing ? 'pause' : 'play_arrow'}
              </span>
            </div>

            <div
              onClick={handleNextSong}
              className={`skip${isLast ? ' disabled' : ''}`}
            >
              <span className='material-icons-round'>skip_next</span>
            </div>
          </div>

          <div
            onClick={handleRepeat}
            className={`playing-controls-control repeat${
              repeat ? ' active' : ''
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
