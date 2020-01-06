import React from 'react';
import { Route, Redirect } from 'react-router';
export const PrivateRoute = ({ component: Component, ...rest }: any) => (
   <Route {...rest} render={props => (
        localStorage.getItem('CognitoIdentityServiceProvider.5rkh7p4uc10m5fp242v5td2qh3.707f8583-40a4-4b12-ab52-50ac8ab35efb.accessToken')
       ? <Component {...props} /> 
       : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
   )} />
)