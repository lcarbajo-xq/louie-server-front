import { useEffect, useState } from 'react'
import { ShinerComponent } from '../Shiner/ShinerComponent'
import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll'
import './styles.scss'
import cover from '../../assets/app-icon.png'
import { getItemsFromDB } from '../../services/databaseService'
import { useServices } from '../../hooks/useServices'
import { Dropdown } from '../Dropdown/Dropdown'
import { formatSeconds } from '../../helpers/formatSeconds'

// const playlists = [
//   { name: 'Playlist 1', id: 1, liked: false },
//   { name: 'Playlist 2', id: 2, liked: true },
//   { name: 'Playlist 3', id: 3, liked: true },
//   { name: 'Playlist 4', id: 4, liked: false },
//   { name: 'Playlist 5', id: 5, liked: false }
// ]

export const Search = () => {
  const { state } = useServices('search')
  const [loading, setLoading] = useState(false)

  return (
    <section className='app-route'>
      <div className='search-container'>
        <div className='search-component'>
          <input
            className='search-input'
            type='text'
            placeholder='Search Albums, Tracks or Artists'
          />
        </div>
        {loading && (
          <>
            <ShinerComponent
              margin='0px 0px 5px 0px'
              height='10px'
              width='100px'
            />
            <ShinerComponent
              margin='0px 0px 20px 0px'
              height='10px'
              width='100px'
            />
            <HorizontalScroll>
              <ShinerComponent
                margin='0px 0px 5px 0px'
                height='30px'
                width='100px'
              />
              <ShinerComponent
                margin='0px 0px 5px 10px'
                height='30px'
                width='100px'
              />
            </HorizontalScroll>
          </>
        )}

        <div className='playlists-wrapper'>
          <h3>Playlists</h3>

          <div className='playlists'>
            <HorizontalScroll>
              {state?.playlists.map((playlist) => {
                if (playlist.liked) {
                  return (
                    <div key={playlist.id} className='playlist'>
                      {playlist.name}
                    </div>
                  )
                }
              })}
              {state?.playlists.map((playlist) => {
                if (!playlist.liked) {
                  return (
                    <div key={playlist.id} className='playlist'>
                      {playlist.name}
                    </div>
                  )
                }
              })}
            </HorizontalScroll>
          </div>
        </div>
        {loading && (
          <>
            <div className='shine lines' />
            <div className='shine lines' />
            <HorizontalScroll>
              <div className='artists'>
                <div className='shine box'></div>
                <div className='shine box'></div>
                <div className='shine box'></div>
              </div>
            </HorizontalScroll>
          </>
        )}
        <div className='artists-wrapper'>
          <h3>Artists</h3>
          <HorizontalScroll>
            <div className='artists'>
              {state.artists?.map((artist) => (
                <div key={artist._id} className='artist'>
                  <img
                    className={loading ? 'lazyload' : 'lazyloaded'}
                    src={
                      artist.image && artist.image[1] !== ''
                        ? artist.image[1]
                        : cover
                    }
                  />
                  <div className='column-details'>
                    <div className='title'>{artist.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </HorizontalScroll>
        </div>
        {loading && (
          <>
            <div className='shine lines' />
            <div className='shine lines' />
            <HorizontalScroll>
              <div className='albums`'>
                <div className='shine box'></div>
                <div className='shine box'></div>
                <div className='shine box'></div>
              </div>
            </HorizontalScroll>
          </>
        )}
        <div className='albums-wrapper'>
          <h3>Albums</h3>
          <HorizontalScroll>
            <div className='albums'>
              {state?.albums.map((album) => (
                <div key={album._id} className='album'>
                  <img
                    className={loading ? 'lazyload' : 'lazyloaded'}
                    src={
                      album.image && album.image[3] !== ''
                        ? album.image[3]
                        : cover
                    }
                  />
                  <div className='column-details'>
                    <div className='title'>{album.name}</div>
                    <div className='subtitle'>{album.artist.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </HorizontalScroll>
        </div>
        {loading && (
          <>
            <div className='shine lines' />
            <div className='shine lines' />
            <div className='shine lines' />
          </>
        )}
        <div className='tracks-wrapper'>
          <div className='title-wrapper'>
            <h3>Tracks</h3>
            <div className='action'>
              <div className='play-button'>Play</div>
            </div>
          </div>

          <div className='grid'>
            {/* <div className="track {{ playerService.$track.getValue()._id === track._id ? 'playing' : '' }}"> */}
            {state.tracks.map((track) => (
              <div key={track._id} className='track'>
                {/* <div *ngIf="options.picture" appTooltip tooltip="{{ track.artist }} - {{ track.name }}" class="image">
<img class="lazyloa
d" [lazyLoad]="track?.album?.picture || '/assets/app-icon-text.png'" />
</div> */}
                <div className='image'>
                  <img
                    // className='lazyloadd'
                    src={`http://localhost:5000${
                      track?.album?.image[0] || '../../assets/app-icon.png'
                    }`}
                  />
                </div>

                <div className='details'>
                  <div className='overflow-text'>
                    <div className='title'>{track.name}</div>
                    <div className='subtitle'>{track.artist}</div>
                  </div>
                </div>

                {/* Tooltip */}

                <div
                  className='actions lossless'
                  // appTooltip
                  // tooltip='Lyrics availalbe'
                >
                  <i className='feather feather-list'></i>
                </div>
                <div className='actions lossless'>
                  {/* appTooltip tooltip='Lossless'> */}
                  <i className='feather feather-headphones'></i>
                </div>

                {/*  | formatSeconds} */}
                <div className='duration'>{formatSeconds(track.duration)}</div>

                <div className='actions'>
                  <Dropdown dropdown config={{ side: 'right' }}></Dropdown>

                  {/* <app-dropdown #dropdown [config]="{right: true, up: true}" [header]="headerTemplate">
<ng-template #headerTemplate let-item="item">
<div (click)="item.onToggle()" class="dropdown-action-item"><i class="material-icons-outlined">
more_vert
</i></div>
</ng-template>

<div class="dropdown-action-list">

<a (click)="onPlaylist()">Add to playlist</a>
<a (click)="onQueue()">Add to queue</a>

<a [routerLink]="['/', { outlets: { modal: ['modal','artists', track?.album?.artist?._id] } }]">More
from artist</a>
<a [routerLink]="['/', { outlets: { modal: ['modal','albums',track?.album?._id] } }]">Go to album</a>
<a target="_blank" href="{{httpService.API_ENDPOINT}}/tracks/play/{{ track._id }}"
download="{{track.name}}.mp3">Download</a>

<a *ngIf="track?.playlists?.length > 0" (click)="onRemoveFromPlaylist()">Remove from playlist</a>


</div>
</app-dropdown> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
