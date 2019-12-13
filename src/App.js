import React, { Component } from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import { history } from './helpers';
import { PrivateRoute } from './routes/PrivateRoute';
import { connect } from 'react-redux';
import { Login} from "./pages/";

class AppComponent extends Component {
	render() {
		return (
      <Router history={history}>
        <div>
            <Switch>
              <PrivateRoute exact path='/home' component={Login} />
              <Route exact path='/' component={Login} />
            </Switch>
        </div>
      </Router>
		);
	}
}

const mapStateToProps = (state) =>{
	const { loggingIn } = state.auth;
	return {
		loggingIn
  };
}

const App = connect(
	mapStateToProps, 
	null, 
	null, 
	{
		pure: false

	}
)(AppComponent);

export default App;