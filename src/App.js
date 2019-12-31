import React, { Component } from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import { history } from './helpers';
import { PrivateRoute } from './routes/PrivateRoute';
import { connect } from 'react-redux';
import { Login, WorkbenchHome, WorkbenchTags } from "./pages/";

class AppComponent extends Component {
	render() {
		return (
      <Router history={history}>
        <div>
            <Switch>
              <PrivateRoute exact path='/home' component={Login} />
              <Route exact path='/' component={Login} />
			  <Route exact path='/work-bench-home' component={WorkbenchHome} />
			  <Route exact path='/work-bench-tags-validation' component={WorkbenchTags} />
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