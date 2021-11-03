import { useEffect, useRef, useState } from 'react'

export function useLazyLoad() {
  const [isLazyLoad, setIsLazyLoad] = useState(false)
  const elementRef = useRef()
  const observer = useRef()

  const onObserve = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio > 0.1) {
        setIsLazyLoad(true)
        observer.current.disconnect(elementRef.current)
      }
    })
  }

  useEffect(() => {
    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
      if (elementRef.current) {
        observer.current = new IntersectionObserver(onObserve, {
          threshold: [0.1]
        })
        observer.current.observe(elementRef.current)
      }
    })

    return () => observer && observer.current.disconnect(elementRef.current)
  }, [elementRef])

  return { isLazyLoad, elementRef }
}
