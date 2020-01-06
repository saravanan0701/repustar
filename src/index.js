import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Amplify from 'aws-amplify';
import { awsConfig } from './config';
import {store} from "./redux/store";


Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: awsConfig.cognito.REGION,
      userPoolId: awsConfig.cognito.USER_POOL_ID,
      identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: awsConfig.cognito.APP_CLIENT_ID
    },
    Storage: {
      region: awsConfig.s3.REGION,
      bucket: awsConfig.s3.BUCKET,
      identityPoolId: awsConfig.cognito.IDENTITY_POOL_ID
    },
    API: {
      endpoints: [
        {
          name: "notes",
          endpoint: awsConfig.apiGateway.URL,
          region: awsConfig.apiGateway.REGION
        },
      ]
    }
  });

ReactDOM.render(
    <Provider store={store}>
       <App />
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
