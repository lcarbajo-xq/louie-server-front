import './styles.scss'

export const Spinner = () => {
  return (
    <div className='loading'>
      <div className='spinner'>
        <div className='bounce1'></div>
        <div className='bounce2'></div>
      </div>
    </div>
  )
}
