import { useEffect, useState } from 'react'
import { getItemsFromDB } from '../services/databaseService'

import { DBACTIONS } from '../actions/dbActions'

import { useAppContext } from '../context/AppContext'

const PAGES = ['albums', 'artists', 'tracks']

export const useServices = (activeTab = '') => {
  const [state, dispatch] = useAppContext()
  const [loading, setLoading] = useState(false)
  const [updatePage, setUpdatePage] = useState(false)

  const nextBlock = (name) => {
    dispatch({
      type: DBACTIONS.SET_NEXT_PAGE,
      payload: name
    })
    setUpdatePage(true)
  }

  // const getLibraryDataFromState = () => {
  //   console.log(activeTab)
  //   if (state?.library) setLibraryData(state.library)
  // }

  const dispatchItemsFromDB = () => {
    const { library } = state
    const { limit, page } = library
    const activeTabPage = page[activeTab]

    getItemsFromDB(activeTab, limit, activeTabPage).then((data) => {
      if (activeTab === 'albums') {
        dispatch({
          type: DBACTIONS.GET_ALBUMS_FROM_DATABASE,
          payload: data.albums
        })
      } else if (activeTab === 'artists') {
        dispatch({
          type: DBACTIONS.GET_ARTISTS_FROM_DATABASE,
          payload: data.artists
        })
      } else if (activeTab === 'playlists') {
        dispatch({
          type: DBACTIONS.GET_PLAYLISTS_FROM_DATABASE,
          payload: data.playlists
        })
      }
      setUpdatePage(false)
    })
  }

  useEffect(
    function () {
      if (updatePage) {
        setLoading(true)
        dispatchItemsFromDB()
        setLoading(false)
      }
    },
    [updatePage]
  )

  return {
    libraryData: state?.library,
    loading,
    nextBlock,
    dispatchItemsFromDB
  }
}
