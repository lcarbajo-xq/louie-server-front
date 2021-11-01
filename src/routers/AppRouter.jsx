import { Router, useRouter } from 'wouter'

export const AppRouter = ({ base = '', children }) => {
  const router = useRouter()

  const nestedBase = `${router.base}${base}`

  return (
    <>
      <Router base={nestedBase} key={nestedBase}>
        <main className='app-content'>{children}</main>
      </Router>
    </>
  )
}
