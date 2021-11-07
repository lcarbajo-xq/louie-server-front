import React, { useRef, useState } from 'react'
import './styles.scss'

export const Tooltip = ({ className, tooltip, children, delay = 400 }) => {
  const [activeTooltip, setActiveTooltip] = useState(false)
  const tipInterval = useRef()

  const showTip = () => {
    if (tipInterval.current) clearInterval(tipInterval.current)
    tipInterval.current = setInterval(() => {
      setActiveTooltip(true)
    }, delay)
  }

  const hideTip = () => {
    clearInterval(tipInterval.current)
    setActiveTooltip(false)
  }

  return (
    <>
      <div className={className} onMouseEnter={showTip} onMouseLeave={hideTip}>
        {children}
        <div
          daata-tooltip={tooltip}
          className={`tooltip${activeTooltip ? ' visible' : ''}`}
        >
          {tooltip}
        </div>
      </div>
    </>
  )
}
