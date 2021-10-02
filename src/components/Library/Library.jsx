import { useState } from 'react'
import { Link } from 'wouter'
import cover from '../../assets/app-icon.png'
import { Dropdown } from '../Dropdown/Dropdown'
import { Header } from '../Header/Header'

import { AlbumContent } from './AlbumContent'
import { ArtistContent } from './ArtistContent'
import './styles.scss'

const tabs = [
  {
    id: 0,
    title: 'artists',
    href: '/library/artists'
  },
  {
    id: 1,
    title: 'albums',
    href: '/library/albums'
  },
  {
    id: 2,
    title: 'playlists',
    href: '/library/playlists'
  }
]

const playlists = [
  { name: 'Playlist 1' },
  { name: 'Playlist 2' },
  { name: 'Playlist 3' },
  { name: 'Playlist 4' },
  { name: 'Playlist 5' }
]

const ActionTemplate = ({ tab }) => {
  return (
    <Dropdown dropdown config={{ side: 'right' }}>
      {tab.id === tabs[2].id ? (
        <div className='dropdown-action-list'>
          <a onClick={() => {}}>
            New Playlist<i className='material-icons-outlined'>add</i>
          </a>
        </div>
      ) : (
        <div className='dropdown-action-list'>
          <a>Sort by name</a>
          <a>Sort by date</a>
        </div>
      )}
    </Dropdown>
  )
}

export const Library = () => {
  const [activeTab, setActiveTab] = useState(tabs[1])

  return (
    <>
      <Header title='Library'>
        <ActionTemplate tab={activeTab} />
      </Header>

      <div className='tabs'>
        {tabs.map((tab) => (
          <Link
            className={`tab ${activeTab.id === tab.id ? 'active' : ''}`}
            key={tab.id}
            href='/home'
            onClick={() => setActiveTab(tab)}
          >
            {tab.title}
          </Link>
        ))}
      </div>

      <div className='relative'>
        <div className='library'>
          {activeTab.id === 1 && <AlbumContent cover={cover} />}
          {/* {loadingMore &&  */}

          {activeTab.id === 0 && <ArtistContent />}
          {/*  {activeTab.id === 2 && (
            <div className='playlists'>
              {playlists.map((playlist) => (
                <div key={playlist} className='playlist'>
                  <div className='playlist-name'>{playlist.name}</div>
                  <div className='playlist-actions'>
                    <Dropdown isOpen={true} dropdown config={{ side: 'right' }}>
                      <div className='dropdown-action-list'>
                        <a>Edit</a>
                        <a>Delete</a>
                      </div>
                    </Dropdown>
                  </div>
                </div>
              ))}
            </div>
          )} */}
        </div>
      </div>
    </>
  )
}
