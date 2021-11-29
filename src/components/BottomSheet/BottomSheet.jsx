import { DBACTIONS } from '../../actions/dbActions'
import { useAppContext } from '../../context/AppContext'
import { Header } from '../Header/Header'
import './styles.scss'

const BttomSheetHeader = ({ handleQueue }) => {
  const [{ queue }, dispatch] = useAppContext()
  const handleRemovePlaylist = () => {
    dispatch({
      type: DBACTIONS.SET_TRACK_LIST,
      payload: []
    })
  }

  return (
    <div className='playing-header'>
      <div className='playing-header-action'>
        <div onClick={handleQueue} className='playing-header-action-item'>
          <i className='feather-chevron-down'></i>
        </div>
      </div>

      <div className='playing-header-playing'>
        <div className='title'>{queue.length}</div>
        <div className='subtitle'>Songs in queue</div>
      </div>

      <div onClick={handleRemovePlaylist} className='playing-header-action'>
        <div className='playing-header-action-item'>
          <i className='feather feather-trash'></i>
        </div>
      </div>
    </div>
  )
}
export const BottomSheet = ({
  options = { title: 'Cola' },
  children,
  handleQueue,
  visible = false
}) => {
  const handleExpand = () => {}

  return (
    <>
      <div className={visible ? 'bottom-sheet-bg-overlay' : ''}></div>
      <div className='bottom-sheet-container'>
        {/* <ng-container *ngIf="header || options.title">
				<ng-container [ngTemplateOutlet]="header ? headerRef : basic" [ngTemplateOutletContext]="{item:this}">
				</ng-container>
				<ng-template #basic> */}
        <div className='bottom-sheet-header'>
          <BttomSheetHeader handleQueue={handleQueue} />
          {/* <h4 className='title'>{options?.title}</h4> */}
        </div>

        <div className='bottom-sheet-content'>{children}</div>
      </div>
    </>
  )
}
