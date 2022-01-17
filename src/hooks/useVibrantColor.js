import { useEffect, useState } from 'react'
import * as Vibrant from 'node-vibrant'

export const useVibrantColor = ({ imageSrc = '' }) => {
  const [dominantColor, setDominantColor] = useState('')
  useEffect(() => {
    Vibrant.from(imageSrc)
      .getPalette()
      .then((palette) => {
        setDominantColor(`rgba(${palette.Vibrant._rgb.toString()},.6)`)
      })
  }, [])
  return {
    dominantColor
  }
}
