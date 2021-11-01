import './styles.scss'

export const Slider = ({ options, seekable, value, buffer }) => {
  return (
    <div
      className={`slider ${options.vertical ? 'vertical' : ''} ${
        options.autoSize ? 'auto-size' : ''
      } `}
    >
      <div
        style={
          options.vertical ? { height: buffer + '%' } : { width: buffer + '%' }
        }
        className='buffer'
      ></div>
      <div
        style={
          options.vertical ? { height: value + '%' } : { width: value + '%' }
        }
        className={`range ${seekable ? 'seekable' : ''}`}
      ></div>
    </div>
  )
}
