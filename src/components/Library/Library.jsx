import { useState } from 'react'
import { Link } from 'wouter'
import { useServices } from '../../hooks/useServices'
import { Dropdown } from '../Dropdown/Dropdown'
import { Header } from '../Header/Header'

import { AlbumContent } from './AlbumContent'
import { ArtistContent } from './ArtistContent'
import { PlaylistContent } from './PlaylistContent'
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
  const [activeTab, setActiveTab] = useState(tabs[0])

  const { state, loading, nextBlock } = useServices(activeTab.title)

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
          {activeTab.id === 1 && !loading && (
            <AlbumContent albums={state.albums} nextBlock={nextBlock} />
          )}

          {activeTab.id === 0 && !loading && (
            <ArtistContent nextBlock={nextBlock} artists={state.artists} />
          )}
          {activeTab.id === 2 && !loading && (
            <PlaylistContent
              playlists={state.playlists}
              nextBlock={nextBlock}
            />
          )}
        </div>
      </div>
    </>
  )
}
