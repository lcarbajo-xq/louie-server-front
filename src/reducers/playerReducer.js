import { PLAYERACTIONS } from '../actions/playerActions'

const initialCurrentlyPlaying = {
  trackId: '',
  paused: false
}

const playerReducer = (state = initialCurrentlyPlaying, action) => {
  switch (action.type) {
    case PLAYERACTIONS.SET_CURRENT_SONG:
      return {
        ...state,
        trackId: action.payload
      }
    case PLAYERACTIONS.SET_PAUSED_SONG:
      return { ...state, paused: !state.paused }
    case PLAYERACTIONS.SET_CURRENT_TIME:
      return { ...state, currentTime: action.payload }

    default:
      return state
  }
}
