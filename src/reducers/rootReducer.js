import { DBACTIONS } from '../actions/dbActions'

export const initialState = {
  artists: [],
  albums: [],
  playlists: [
    { name: 'Playlist 1' },
    { name: 'Playlist 2' },
    { name: 'Playlist 3' },
    { name: 'Playlist 4' },
    { name: 'Playlist 5' }
  ],
  page: {
    albums: 0,
    artists: 0
  },
  limit: 20
}

export const rootReducer = (state, action) => {
  switch (action.type) {
    case DBACTIONS.GET_ALBUMS_FROM_DATABASE: {
      const { albums } = state
      return {
        ...state,
        albums: albums.concat(action.payload)
      }
    }
    case DBACTIONS.GET_ARTISTS_FROM_DATABASE: {
      const { artists } = state
      return {
        ...state,
        artists: artists.concat(action.payload)
      }
    }
    case DBACTIONS.SET_NEXT_PAGE: {
      const { page, limit } = state
      return {
        ...state,
        page: { ...page, [action.payload]: page[action.payload] + limit }
      }
    }
    default:
      return state
  }
}
