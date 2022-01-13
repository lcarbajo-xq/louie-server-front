import axios from 'axios'

export const requestSpotifyEndpoint = async (options) => {
  return await axios(options)
}
