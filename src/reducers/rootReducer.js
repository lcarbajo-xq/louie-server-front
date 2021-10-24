import { DBACTIONS } from '../actions/dbActions'

export const initialState = {
  artists: [],
  albums: [],
  playlists: [
    { name: 'Playlist 1', id: 1, liked: false },
    { name: 'Playlist 2', id: 2, liked: true },
    { name: 'Playlist 3', id: 3, liked: true },
    { name: 'Playlist 4', id: 4, liked: false },
    { name: 'Playlist 5', id: 5, liked: false }
  ],
  tracks: [],
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
    case DBACTIONS.GET_TRACKS_FROM_DATABASE: {
      const { tracks } = state
      return {
        ...state,
        tracks: tracks.concat(action.payload)
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
