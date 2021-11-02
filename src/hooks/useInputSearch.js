import React, { useEffect, useState } from 'react'
import { DBACTIONS } from '../actions/dbActions'
import { useAppContext } from '../context/AppContext'
import { searchItems } from '../services/databaseService'

export const useInputSearch = () => {
  const [{ currentSearchQuery, searchResults }, dispatch] = useAppContext()
  const [search, setSearch] = useState('')

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

  return { handleInputChange, searchResults, search, currentSearchQuery }
}
