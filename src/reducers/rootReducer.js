import { DBACTIONS } from '../actions/dbActions'

export const initialState = {
  tabs: ['artists', 'albums', 'playlists'],
  bigPlayerSelected: false,
  activeDropdown: null,
  currentSearchQuery: '',
  searchResults: null,
  home: {},
  queue: [],
  library: {
    artists: [],
    albums: [],
    playlists: [],
    tracks: [],
    page: {
      albums: 0,
      artists: 0,
      playlists: 0
    },
    limit: 20
  }
}

export const rootReducer = (state, action) => {
  console.log(action.type)
  switch (action.type) {
    case DBACTIONS.SET_INITIAL_STATE: {
      const { albums, artists, tracks, playlists } = action.payload
      return {
        ...state,
        home: {
          ...state.home,
          albums,
          artists,
          tracks,
          playlists
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
    case DBACTIONS.GET_PLAYLISTS_FROM_DATABASE: {
      const { playlists } = state.library
      return {
        ...state,
        library: {
          ...state.library,
          playlists: playlists.concat(action.payload)
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
    case DBACTIONS.GET_TRACKS_FROM_SPOTIFY: {
      const { tracks } = action.payload
      return {
        ...state,
        library: {
          ...state.library,
          tracks
        },
        home: {
          ...state.home,
          tracks
        }
      }
    }
    case DBACTIONS.SET_CURRENT_TRACK: {
      return {
        ...state,
        selectedTrack: { ...action.payload }
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

      if (dropdownElement === state.activeDropdown) {
        return {
          ...state,
          activeDropdown: null
        }
      } else {
        return {
          ...state,
          activeDropdown: dropdownElement
        }
      }
    }
    case DBACTIONS.SET_BIG_PLAYER_UI: {
      return {
        ...state,
        bigPlayerSelected: action.payload
      }
    }
    case DBACTIONS.SET_TRACK_LIST: {
      return {
        ...state,
        queue: action.payload
      }
    }
    case DBACTIONS.SET_ACCESS_TOKEN: {
      return {
        ...state,
        accessToken: action.payload
      }
    }
    case DBACTIONS.SET_PLAYER_STATE: {
      return {
        ...state,
        player: action.payload
      }
    }
    default:
      return state
  }
}
