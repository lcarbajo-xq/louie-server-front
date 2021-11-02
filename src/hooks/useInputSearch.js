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
      searchResults?.artists?.length === 0 &&
      searchResults?.albums?.length === 0 &&
      searchResults?.tracks?.length === 0
    if (currentSearchQuery.length === 9) setIsEmpty(!hasNotResults)
    else {
      setIsEmpty(hasNotResults)
    }
  }, [searchResults])

  const handleInputChange = (e) => {
    setSearch(e.target.value)
    const newSearch = e.target.value
    dispatch({
      type: DBACTIONS.SET_SEARCH,
      payload: { search: newSearch }
    })
    if (newSearch.length > 3) {
      searchItems(newSearch).then((data) => {
        const { results } = data
        dispatch({
          type: DBACTIONS.SET_SEARCH_RESULTS,
          payload: { searchResults: results }
        })
      })
    }
  }

  return {
    handleInputChange,
    isEmpty,
    search,
    searchResults,
    currentSearchQuery
  }
}
