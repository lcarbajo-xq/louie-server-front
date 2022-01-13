import { circumference } from '../constants/progressConstants'

export function formatSeconds(timeInSeconds) {
  const seconds = Math.floor(timeInSeconds % 60)
  const minutes = Math.floor(timeInSeconds / 60)
  const stringMinutes = String(minutes).padStart(2, '0')
  const stringSeconds = String(seconds).padStart(2, '0')
  return `${stringMinutes}:${stringSeconds}`
}

export function formatAudioProgress(progress, duration) {
  const seekProgress = progress / duration
  const circularProgress = Math.floor(seekProgress * circumference)
  return { circularProgress }
}
