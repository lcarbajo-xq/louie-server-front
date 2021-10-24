import React from 'react'
import { Router, Route } from 'wouter'
import { Library } from '../components/Library/Library'
import { Search } from '../components/Search/Search'

export const LibraryRouter = () => {
  return (
    <>
      <Route path='/library' component={Library} />
      <Route path='/home' component={Search} />
    </>
  )
}
