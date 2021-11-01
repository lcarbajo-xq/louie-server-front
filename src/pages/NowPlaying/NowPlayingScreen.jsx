import { Link } from 'wouter'
import { Dropdown } from '../../components/Dropdown/Dropdown'
import { Header } from '../../components/Header/Header'
import './styles.scss'
import cover from '../../assets/app-icon.png'
import { Slider } from '../../components/Slider/Slider'
import { BottomSheet } from '../../components/BottomSheet/BottomSheet'

export const NowPlayingScreen = () => {
  return (
    <div className='container mx-auto'>
      <div className='playing'>
        <div className='playing-header'>
          <div className='playing-header-action'>
            <div className='playing-header-action-item'>
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
            <img src={cover} />
          </div>
        </div>
        <div className='playing-track'>
          <div className='playing-track-details'>
            <div className='name'>
              <div className='overflow-text'>Techno Trap</div>
            </div>

            <div className='artists'>Zen Mantra</div>
          </div>

          <div className='playing-track-actions'>
            <div className='active'>
              <i className='feather-heart'></i>
            </div>
          </div>
        </div>
        <div className='playing-progress'>
          <div className='playing-progress-slider'>
            {/* <input
              type='range'
              value={0}
              step='1'
              min='0'
              max={500}
              className='progress'
              onChange={(e) => {}}
            /> */}
            <Slider
              seekable
              options={{ vertical: false, autosize: false }}
              buffer={100}
              value={0}
            />
            <div className='playing-progress-time'>
              <div className='current'>00 | 00</div>

              <div className='total'>99 | 99</div>
            </div>
          </div>
          {/* <app-slider [seekable]="!(buffering && playing)" [options]="{vertical: false, autoSize: false}"
					[buffer]="buffer" [value]="progress" (valueChange)="onProgress($event)">
				</app-slider> 
                				<app-loading [loading]="buffering && playing"></app-loading>*/}
        </div>

        <div className='playing-controls'>
          <div className='playing-controls-control active'>
            <span className='material-icons-round '>shuffle</span>
          </div>
          <div className='playing-controls-control grow'>
            <div className=' skip disabled'>
              <span className='material-icons-round'>skip_previous</span>
            </div>

            <div className=' playback'>
              <span className='material-icons-round'>
                {true ? 'pause' : 'play_arrow'}
              </span>
            </div>

            <div className='skip'>
              <span className='material-icons-round'>skip_next</span>
            </div>
          </div>

          <div className='playing-controls-control repeat'>
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
              {/* <input
                type='range'
                value={0}
                step='1'
                min='0'
                max={20}
                onChange={(e) => {}}
              /> */}
              <Slider
                options={{ vertical: false, autosize: false }}
                value={0}
              />
            </div>
          </div>
        </div>
        <div className='playing-queue'>
          <div className='playing-queue-header'>
            <div className='playing-queue-header-action'>
              <div
                className='playing-header-action-item'
                style={{ paddingRight: '15px' }}
              >
                <i className='material-icons-round'>keyboard_arrow_up</i>
              </div>
            </div>
            <div className='playing-queue-header-playing'>
              <div className='title'>Queue</div>
              <div className='subtitle'>12 Songs in queue 12 | 11</div>
            </div>

            <div className='playing-queue-header-action'>
              <div className='playing-header-action-item'>
                <i className='material-icons-round'>queue_music</i>
              </div>
            </div>
          </div>
        </div>
        <BottomSheet>
          <div className='playing-header'>
            <div className='playing-header-action'>
              <div className='playing-header-action-item'>
                <i className='feather-chevron-down'></i>
              </div>
            </div>

            <div className='playing-header-playing'>
              <div className='title'>12</div>
              <div className='subtitle'>Songs in queue</div>
            </div>

            <div className='playing-header-action'>
              <div className='playing-header-action-item'>
                <i className='feather feather-trash'></i>
              </div>
            </div>
          </div>
        </BottomSheet>
      </div>
    </div>
  )
}
