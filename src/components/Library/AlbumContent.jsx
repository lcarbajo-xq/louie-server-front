import debounce from 'just-debounce-it'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import cover from '../../assets/app-icon.png'
import { useLazyLoad } from '../../hooks/useLazyLoad'
import { AlbumCard } from './AlbumCard'

export const AlbumContent = React.memo(
  ({ albums = [], nextBlock, isLoading }) => {
    const { elementRef: lastElementRef, isLazyLoad } = useLazyLoad()

    const debounceLoadMore = useCallback(
      debounce(() => {
        nextBlock()
      }, 1000),
      []
    )

    useEffect(() => {
      if (isLazyLoad) {
        debounceLoadMore()
      }
    }, [isLazyLoad])

    return (
      <>
        {albums.map((album) => {
          const imageURL =
            album.image && album.image[5] !== '' ? album.image[5] : cover
          return (
            <AlbumCard
              key={album._id}
              id={album._id}
              imageURL={imageURL}
              artist={album.artist}
              name={album.name}
            />
          )
        })}
      </>
    )
  }
)
