import debounce from 'just-debounce-it'
import { useCallback, useEffect, useState } from 'react'
import { useLazyLoad } from '../../hooks/useLazyLoad'
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
          <a onClick={() => setActiveTab(tab)}>
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

export const Library = ({ setArtist }) => {
  const [activeTab, setActiveTab] = useState(tabs[0])

  const { elementRef, isLazyLoad } = useLazyLoad()

  const { libraryData, loading, nextBlock } = useServices(activeTab.title)

  const debounceLoadMore = useCallback(
    debounce(() => {
      nextBlock(activeTab.title)
    }, 1000),
    [activeTab]
  )

  useEffect(() => {
    if (isLazyLoad) {
      debounceLoadMore()
    }
  }, [isLazyLoad])

  return (
    !loading && (
      <>
        <Header title='Library'>
          <ActionTemplate tab={activeTab} />
        </Header>

        <div className='tabs'>
          {tabs.map((tab) => (
            <div
              className={`tab ${activeTab.id === tab.id ? 'active' : ''}`}
              key={tab.id}
              // href='/library'
              onClick={() => setActiveTab(tab)}
            >
              {tab.title}
            </div>
          ))}
        </div>

        <div className='relative'>
          <div className='library'>
            {!loading && activeTab.id === 1 && (
              <AlbumContent
                isLoading={loading}
                albums={libraryData?.albums}
                nextBlock={nextBlock}
              />
            )}

            {!loading && activeTab.id === 0 && (
              <ArtistContent
                isLoading={loading}
                nextBlock={nextBlock}
                artists={libraryData?.artists}
                setArtist={setArtist}
              />
            )}
            {!loading && activeTab.id === 2 && (
              <PlaylistContent
                isLoading={loading}
                playlists={libraryData?.playlists}
                nextBlock={nextBlock}
              />
            )}
            {!loading && <div className='visor' ref={elementRef}></div>}
          </div>
        </div>
      </>
    )
  )
}
