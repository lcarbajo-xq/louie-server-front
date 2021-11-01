import { Router, useRouter } from 'wouter'

export const LibraryRouter = ({ base = '', children }) => {
  const router = useRouter()

  const nestedBase = `${router.base}${base}`

  return (
    <>
      <Router base={nestedBase} key={nestedBase}>
        {children}
      </Router>
    </>
  )
}
