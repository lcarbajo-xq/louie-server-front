import './styles.scss'
import cover from '../../../assets/app-icon.png'
import { PlayerControls } from './PlayerFooterControls'

export const PlayerFooter = ({ songCover }) => {
  return (
    <div className='player'>
      <div className='player-metadata'>
        <div className='player-metadata-image'>
          <img src={songCover || cover} alt='cover' />
        </div>
        <div className='player-metadata-details'>
          <div className='player-metadata-details-artist'>Artist</div>
          <div className='player-metadata-details-song'>Song</div>
        </div>
      </div>
      <PlayerControls />
    </div>
  )
}
