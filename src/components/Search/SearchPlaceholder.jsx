import { HorizontalScroll } from '../HorizontalScroll/HorizontalScroll'
import { ShinerComponent } from '../Shiner/ShinerComponent'

export const SearchPlaceholder = () => {
  return (
    <>
      <div className='playlists-wrapper'>
        <h3>fetching Data</h3>
        <ShinerComponent margin='0px 0px 5px 0px' height='10px' width='100px' />
        <ShinerComponent
          margin='0px 0px 20px 0px'
          height='10px'
          width='100px'
        />
        <HorizontalScroll>
          <ShinerComponent
            margin='0px 0px 5px 0px'
            height='30px'
            width='100px'
          />
          <ShinerComponent
            margin='0px 0px 5px 10px'
            height='30px'
            width='100px'
          />
        </HorizontalScroll>
      </div>
      <div className='artists-wrapper'>
        <div className='shine lines' />
        <div className='shine lines' />
        <HorizontalScroll>
          <div className='artists'>
            <div className='shine box'></div>
            <div className='shine box'></div>
            <div className='shine box'></div>
          </div>
        </HorizontalScroll>
      </div>
      <div className='albums-wrapper'>
        <div className='shine lines' />
        <div className='shine lines' />
        <HorizontalScroll>
          <div className='albums`'>
            <div className='shine box'></div>
            <div className='shine box'></div>
            <div className='shine box'></div>
          </div>
        </HorizontalScroll>
      </div>
      <div className='tracks-wrapper'>
        <div className='shine lines' />
        <div className='shine lines' />
        <div className='shine lines' />
      </div>
    </>
  )
}
