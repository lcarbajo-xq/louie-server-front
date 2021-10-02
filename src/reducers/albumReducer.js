import { DBACTIONS } from '../actions/dbActions'

export const albumReducer = (state, action) => {
  switch (action.type) {
    case DBACTIONS.GET_ALBUMS_FROM_DATABASE: {
      const { albums } = state
      return {
        ...state,
        albums: albums.concat(action.payload)
      }
    }
    case DBACTIONS.SET_NEXT_PAGE: {
      const { page, limit } = state
      return {
        ...state,
        page: page + limit
      }
    }
    default:
      return state
  }
}
