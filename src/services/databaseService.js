import { BASE_URLS } from '../constants/endpoints'

export const getItemsFromDB = async (name = '', limit = 20, page = 0) => {
  const url = `${BASE_URLS[name]}?limit=${limit}&skip=${page}`
  return fetch(url).then((json) => json.json())
}

export const getArtistFromDB = (id) => {
  const url = `http://localhost:5000/artists/${id}`
  return fetch(url).then((json) => json.json())
}

export const searchItems = (query) => {
  const url = `http://localhost:5000/search/?search=${query}`
  return fetch(url).then((json) => json.json())
}

export const fetchInitialData = async () => {
  const collections = ['tracks', 'albums', 'artists']
  let url
  const fetchData = await Promise.all(
    collections.map((collection) => {
      url = `http://localhost:5000/${collection}/random`
      return fetch(url).then((json) => json.json())
    })
  )

  return fetchData
}
