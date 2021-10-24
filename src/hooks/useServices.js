import { useEffect, useReducer, useState } from 'react'
import { getItemsFromDB } from '../services/databaseService'

import { DBACTIONS } from '../actions/dbActions'

import { initialState, rootReducer } from '../reducers/rootReducer'

const PAGES = ['albums', 'artists', 'playlists', 'tracks']

export const useServices = (activeTab = '') => {
  const [state, dispatch] = useReducer(rootReducer, initialState)
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
    const { limit, page } = state
    const activeTabPage = page[activeTab]

    activeTab !== 'search'
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
            console.log(data)
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
      if (
        state[activeTab]?.length === 0 ||
        updatePage ||
        activeTab === 'search'
      ) {
        setLoading(true)
        dispatchItemsFromDB()
        setLoading(false)
        setUpdatePage(false)
      }
    },
    [activeTab, updatePage]
  )

  return {
    state,
    loading,
    nextBlock,
    dispatchItemsFromDB
  }
}
