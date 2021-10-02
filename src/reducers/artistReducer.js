import { DBACTIONS } from '../actions/dbActions'

export const artistReducer = (state, action) => {
  switch (action.type) {
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
        page: page + limit
      }
    }
    default:
      return state
  }
}
