import { useEffect, useReducer, useState } from 'react'
import { getItemsFromDB } from '../services/databaseService'

import { DBACTIONS } from '../actions/dbActions'

import { initialState, rootReducer } from '../reducers/rootReducer'

export const useServices = (activeTab) => {
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

    getItemsFromDB(activeTab, limit, activeTabPage).then((data) => {
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
      else if (activeTab === 'playlists')
        dispatch({
          type: DBACTIONS.GET_PLAYLISTS_FROM_DATABASE,
          payload: data.playlists
        })
    })
  }

  useEffect(
    function () {
      if (state[activeTab].length === 0 || updatePage) {
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
