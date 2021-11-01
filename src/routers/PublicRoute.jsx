import React from 'react'
import { Redirect, Route } from 'wouter'

export const PublicRoute = ({
  component: Component,
  auth = false,
  ...rest
}) => {
  return <Route {...rest} rebder={(props) => <Redirect to='/' />} />
}
