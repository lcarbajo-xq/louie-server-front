import { ShinerComponent } from '../../Shiner/ShinerComponent'
import cover from '../../../assets/app-icon.png'

export const PlayerPlaceholder = () => {
  return (
    <>
      <div className='player-metadata'>
        <div className='player-metadata-image'>
          <img src={cover} alt='cover' />
        </div>
        <span className='player-metadata-details'>
          <ShinerComponent
            margin='2px 0px 5px 0px'
            height='15px'
            width='100px'
          />
          <ShinerComponent
            margin='0px 0px 0px 0px'
            height='15px'
            width='120px'
          />
        </span>
      </div>
      <div className='player-actions'>
        <div className='player-actions-action'></div>
      </div>
    </>
  )
}
