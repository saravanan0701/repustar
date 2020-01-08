import React from 'react';
import { Route, Redirect } from 'react-router';
export const PrivateRoute = ({ component: Component, ...rest }: any) => (
   <Route {...rest} render={props => (
        localStorage.getItem('repustar_token')
        ? <Component {...props} /> 
       : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
   )} />
)