import { BASE_URLS } from '../constants/endpoints'

const { fetch } = window

export const getItemsFromDB = async (name = '', limit = 20, page = 0) => {
  const url = `${BASE_URLS[name]}?limit=${limit}&skip=${page}`
  return fetch(url).then((json) => json.json())
}

export const getArtistFromDB = (id) => {
  const url = `http://localhost:5000/artists/${id}`
  return fetch(url).then((json) => json.json())
}

export const getAlbumFromDB = (id) => {
  const url = `http://localhost:5000/albums/${id}`
  return fetch(url).then((json) => json.json())
}

export const getPlaylistFromDB = (id) => {
  const url = `http://localhost:5000/playlists/${id}`
  return fetch(url).then((json) => json.json())
}

export const searchItems = (query) => {
  const url = `http://localhost:5000/search/?search=${query}`
  return fetch(url).then((json) => json.json())
}

export const fetchInitialData = async () => {
  const collections = ['tracks', 'albums', 'artists', 'playlists']
  let url
  const fetchData = await Promise.all(
    collections.map((collection) => {
      url = `http://localhost:5000/${collection}/random`
      return fetch(url).then((json) => json.json())
    })
  )
  return fetchData
}

export const getAccessToken = async () => {
  const url = 'http://localhost:5000/auth'
  return fetch(url).then((json) => json.json())
}

export const fetchLikedTracks = async () => {
  const url = 'http://localhost:5000/tracks/liked'
  return fetch(url).then((json) => json.json())
}

export const getTracksFromAlbum = async (context) => {
  const url = `http://localhost:5000/tracks/get/?skip=0&limit=20&album=${context}`
  return fetch(url).then((json) => json.json())
}
