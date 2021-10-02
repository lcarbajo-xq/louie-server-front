import { useEffect, useRef, useState } from 'react'

export function useLazyLoad({
  distance = '100px',
  once = true,
  externalRef
} = {}) {
  const [isVisible, setVisible] = useState(false)
  const lazyLoadRef = useRef()

  useEffect(() => {
    let observer

    const element = externalRef ? externalRef.current : lazyLoadRef.current
    const onChange = (entries, observer) => {
      const el = entries[0]
      if (el.isIntersecting) {
        setVisible(true)
        once && observer.disconnect()
      } else {
        !once && setVisible(false)
      }
    }

    Promise.resolve(
      typeof IntersectionObserver !== 'undefined'
        ? IntersectionObserver
        : import('intersection-observer')
    ).then(() => {
      observer = new IntersectionObserver(onChange, {
        rootMargin: distance
      })

      element && observer.observe(element)
    })

    return () => observer && observer.disconnect()
  })
  return { isVisible, lazyLoadRef }
}
