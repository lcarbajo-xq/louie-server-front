import { useEffect, useMemo, useRef, useState } from 'react'
import './styles.scss'

export const Slider = ({
  options,
  seekable,
  buffer,
  max = 1,
  handleChange,
  value,
  type
}) => {
  const progressRef = useRef()

  const [isDragging, setDragging] = useState(false)
  const [hasStartedDragging, setStartedDragging] = useState(false)
  const progressValue = useMemo(() => (value / max) * 100, [value, max])

  useEffect(() => {
    const property =
      type === 'progress'
        ? '--seek-before-width-progress'
        : '--seek-before-width-volume'

    document.documentElement.style.setProperty(property, `${progressValue}%`)
  }, [value])

  useEffect(() => {}, [value])

  return (
    // <div
    //   className={`slider ${options.vertical ? 'vertical' : ''} ${
    //     options.autoSize ? 'auto-size' : ''
    //   } `}
    //   onMouseUp={handleMouseUp}
    //   onMouseDown={handleMouseDown}
    //   onMouseMove={handleMouseMove}
    //   onClick={handleMonClick}
    // >
    //   <div
    //     style={
    //       options.vertical ? { height: buffer + '%' } : { width: buffer + '%' }
    //     }
    //     className='buffer'
    //   ></div>
    //   <div
    //     style={
    //       options.vertical ? { height: value + '%' } : { width: value + '%' }
    //     }
    //     className={`range ${seekable ? 'seekable' : ''}`}
    //   ></div>
    // </div>
    <div ref={progressRef}>
      <input
        type='range'
        className={type === 'progress' ? 'progressbar' : 'volume'}
        step={0.1}
        min={0}
        max={max}
        value={value}
        onChange={handleChange}
        onMouseDown={() => {
          setStartedDragging(true)
        }}
        onMouseUp={(e) => {
          if (hasStartedDragging && isDragging) {
            setStartedDragging(false)
            setDragging(false)
            handleChange(e)
          }
        }}
        onMouseMove={() => {
          if (hasStartedDragging) {
            setDragging(true)
          }
        }}
      />
    </div>
  )
}
