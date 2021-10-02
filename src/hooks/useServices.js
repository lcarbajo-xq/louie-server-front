import { useEffect, useReducer, useState } from 'react'
import { getItemsFromDB } from '../services/databaseService'

import { DBACTIONS } from '../actions/dbActions'

export const useServices = (initialState = {}, reducer) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loading, setLoading] = useState(false)

  const nextBlock = () => {
    dispatch({
      type: DBACTIONS.SET_NEXT_PAGE
    })
  }

  const dispatchItemsFromDB = () => {
    const { tabName, limit, page } = state

    getItemsFromDB(tabName, limit, page).then((data) => {
      if (tabName === 'albums') {
        const { albums } = data
        dispatch({
          type: DBACTIONS.GET_ALBUMS_FROM_DATABASE,
          payload: albums
        })
      } else if (tabName === 'artists')
        dispatch({
          type: DBACTIONS.GET_ARTISTS_FROM_DATABASE,
          payload: data.artists
        })
      else if (tabName === 'playlists')
        dispatch({
          type: DBACTIONS.GET_PLAYLISTS_FROM_DATABASE,
          payload: data.playlists
        })
    })
  }

  useEffect(
    function () {
      setLoading(true)
      dispatchItemsFromDB()
      setLoading(false)
    },
    [state.page]
  )

  return {
    state,
    loading,
    nextBlock,
    dispatchItemsFromDB
  }
}
