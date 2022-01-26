import { useEffect, useState } from 'react'
import * as Vibrant from 'node-vibrant'

export const useVibrantColor = ({ imageSrc = '' } = {}) => {
  const [vibrantColor, setVibrantColor] = useState('')
  useEffect(() => {
    getVibrantColor(imageSrc).then((colors) => setVibrantColor(colors))
  }, [])

  const getVibrantColor = async (img) => {
    const colorVibrant = await Vibrant.from(img)
      .quality(0)
      .maxColorCount(256)
      .getPalette()
      .then((palette) => palette.Vibrant._rgb.toString())

    return {
      dominantColor: `rgba(${colorVibrant},.6)`,
      dominantColorNoOpacity: colorVibrant
    }
  }

  return { ...vibrantColor, getVibrantColor }
}
