import { DBACTIONS } from '../actions/dbActions'

export const initialState = {
  tabs: ['artists', 'albums'],
  activeDropdown: null,
  currentSearchQuery: '',
  searchResults: null,
  home: {
    playlists: [
      { name: 'Playlist 1', id: 1, liked: false },
      { name: 'Playlist 2', id: 2, liked: true },
      { name: 'Playlist 3', id: 3, liked: true },
      { name: 'Playlist 4', id: 4, liked: false },
      { name: 'Playlist 5', id: 5, liked: false }
    ]
  },
  currentTrack: null,
  library: {
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
}

export const rootReducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case DBACTIONS.SET_INITIAL_STATE: {
      const { albums, artists, tracks } = action.payload
      return {
        ...state,
        home: {
          ...state.home,
          albums,
          artists,
          tracks
        }
      }
    }
    case DBACTIONS.GET_ALBUMS_FROM_DATABASE: {
      const { albums } = state.library
      return {
        ...state,
        library: {
          ...state.library,
          albums: albums.concat(action.payload)
        }
      }
    }
    case DBACTIONS.GET_ARTISTS_FROM_DATABASE: {
      const { artists } = state.library
      return {
        ...state,
        library: {
          ...state.library,
          artists: artists.concat(action.payload)
        }
      }
    }
    case DBACTIONS.GET_TRACKS_FROM_DATABASE: {
      const { tracks } = state.library
      return {
        ...state,
        library: {
          ...state.library,
          tracks: tracks.concat(action.payload)
        }
      }
    }
    case DBACTIONS.SET_NEXT_PAGE: {
      const { page, limit } = state.library
      return {
        ...state,
        library: {
          ...state.library,
          page: { ...page, [action.payload]: page[action.payload] + limit }
        }
      }
    }
    case DBACTIONS.SET_CURRENT_TRACK: {
      const { track } = action.payload
      return {
        ...state,
        currentTrack: track
      }
    }
    case DBACTIONS.SET_SEARCH: {
      const { search } = action.payload
      return {
        ...state,
        currentSearchQuery: search
      }
    }
    case DBACTIONS.SET_SEARCH_RESULTS: {
      const { searchResults } = action.payload
      return {
        ...state,
        searchResults
      }
    }
    case DBACTIONS.SET_ACTIVE_DROPDOWN: {
      const { dropdownElement } = action.payload
      return {
        ...state,
        activeDropdown: dropdownElement
      }
    }
    default:
      return state
  }
}
