import './styles.scss'

export const ShinerComponent = ({
  margin = '',
  width = '',
  height = '',
  children
}) => {
  return (
    <div style={{ width, height, margin }} className='shiner'>
      {children}
    </div>
  )
}
