import { Router, useLocation, useRouter } from 'wouter'

export const AuthRouter = ({ base, children }) => {
  const router = useRouter()
  const [parentLocation] = useLocation()

  const nestedBase = `${router.base}${base}`

  if (!parentLocation.startsWith(nestedBase)) return null

  return (
    <Router base={nestedBase} key={nestedBase}>
      {children}
    </Router>
  )
}
