import React, { useEffect, useState } from 'react'
import { DBACTIONS } from '../actions/dbActions'
import { useAppContext } from '../context/AppContext'
import { searchItems } from '../services/databaseService'

export const useInputSearch = () => {
  const [{ currentSearchQuery, searchResults }, dispatch] = useAppContext()
  const [search, setSearch] = useState('')
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    const hasNotResults =
      search.length > 0 &&
      searchResults?.artists?.length === 0 &&
      searchResults?.albums?.length === 0 &&
      searchResults?.tracks?.length === 0 &&
      searchResults?.playlists?.length === 0
    setIsEmpty(hasNotResults)
  }, [searchResults])

  const handleInputChange = (e) => {
    const newSearch = e.target.value
    setSearch(newSearch)

    searchItems(newSearch).then((data) => {
      const { results } = data
      dispatch({
        type: DBACTIONS.SET_SEARCH_RESULTS,
        payload: { searchResults: results }
      })
    })
    dispatch({
      type: DBACTIONS.SET_SEARCH,
      payload: { search: newSearch }
    })
  }

  return {
    handleInputChange,
    isEmpty,
    search,
    searchResults,
    currentSearchQuery
  }
}
