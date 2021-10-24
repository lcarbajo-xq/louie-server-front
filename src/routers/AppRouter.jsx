import { Route, Router, Switch } from 'wouter'
import { Library } from '../components/Library/Library'
import { Search } from '../components/Search/Search'
import { LibraryRouter } from './LibraryRouter'

export const AppRouter = () => {
  return (
    <main className='app-content'>
      <Route path='/app/library' component={Library} />
      <Route path='/app/home' component={Search} />
    </main>
  )
}
