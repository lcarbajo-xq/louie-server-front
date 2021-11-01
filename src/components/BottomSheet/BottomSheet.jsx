import './styles.scss'

export const BottomSheet = ({
  options = { title: 'Cola', maxHeight: '20vh' },
  children,
  visible = false
}) => {
  return (
    <>
      <div className={visible ? 'bottom-sheet-bg-overlay' : ''}></div>
      <div className='bottom-sheet-container'>
        <div>
          <div>
            {/* <ng-container *ngIf="header || options.title">
				<ng-container [ngTemplateOutlet]="header ? headerRef : basic" [ngTemplateOutletContext]="{item:this}">
				</ng-container>
				<ng-template #basic> */}
            <div className='bottom-sheet-header'>
              <h4 className='title'>{options?.title}</h4>
            </div>
          </div>

          <div
            class='bottom-sheet-content'
            style={{ maxHeight: options?.maxHeight }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
