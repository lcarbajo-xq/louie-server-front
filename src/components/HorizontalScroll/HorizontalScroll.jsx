import './styles.scss'

export const HorizontalScroll = ({ children }) => {
  return (
    <div className='horizontal-scroll'>
      <div className='horizontal-scroll-container'>
        <div className='horizontal-scroll-container-inside'>{children}</div>
      </div>
    </div>
  )
}
