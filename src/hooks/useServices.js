import { useEffect, useState } from 'react'
import { getItemsFromDB } from '../services/databaseService'

import { DBACTIONS } from '../actions/dbActions'

import { useAppContext } from '../context/AppContext'

const PAGES = ['albums', 'artists', 'tracks']

export const useServices = (activeTab = '') => {
  const [state, dispatch] = useAppContext()
  const [loading, setLoading] = useState(false)
  const [updatePage, setUpdatePage] = useState(false)

  const nextBlock = () => {
    dispatch({
      type: DBACTIONS.SET_NEXT_PAGE,
      payload: activeTab
    })
    setUpdatePage(true)
  }

  const dispatchItemsFromDB = () => {
    const { limit, page, initialRequest } = state
    const activeTabPage = page[activeTab]

    initialRequest
      ? getItemsFromDB(activeTab, limit, activeTabPage).then((data) => {
          if (activeTab === 'albums') {
            dispatch({
              type: DBACTIONS.GET_ALBUMS_FROM_DATABASE,
              payload: data.albums
            })
          } else if (activeTab === 'artists')
            dispatch({
              type: DBACTIONS.GET_ARTISTS_FROM_DATABASE,
              payload: data.artists
            })
          // else if (activeTab === 'playlists')
          //   dispatch({
          //     type: DBACTIONS.GET_PLAYLISTS_FROM_DATABASE,
          //     payload: data.playlists
          //   })
        })
      : PAGES.map((p) => {
          getItemsFromDB(p, limit, page[p]).then((data) => {
            if (p === 'albums') {
              dispatch({
                type: DBACTIONS.GET_ALBUMS_FROM_DATABASE,
                payload: data.albums
              })
            } else if (p === 'artists')
              dispatch({
                type: DBACTIONS.GET_ARTISTS_FROM_DATABASE,
                payload: data.artists
              })
            // else if (p === 'playlists')
            //   dispatch({
            //     type: DBACTIONS.GET_PLAYLISTS_FROM_DATABASE,
            //     payload: data.playlists
            //   })
            else if (p === 'tracks')
              dispatch({
                type: DBACTIONS.GET_TRACKS_FROM_DATABASE,
                payload: data.tracks
              })
          })
        })
  }

  useEffect(
    function () {
      if (updatePage || !state.initialRequest) {
        setLoading(true)
        dispatchItemsFromDB()
        state.initialRequest = true
        setUpdatePage(false)
        setLoading(false)
      }
    },
    [activeTab, updatePage]
  )

  return {
    state,
    loading,
    dispatch,
    nextBlock,
    dispatchItemsFromDB
  }
}
