import React, { Component } from 'react';
import { Router, Switch, Route} from 'react-router-dom';
import { history } from './helpers';
import { PrivateRoute } from './routes/PrivateRoute';
import { connect } from 'react-redux';
import { Login, WorkbenchHome, WorkbenchTags, MergeTags } from "./pages/";
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ReduxToastr from 'react-redux-toastr';

class AppComponent extends Component {
	render() {
		return (
      <Router history={history}>
        <div>
			<ReduxToastr
				timeOut={2000}
				newestOnTop={false}
				preventDuplicates
				position="bottom-right"
				getState={(state) => state.toastr} 
				transitionIn="fadeIn"
				transitionOut="fadeOut"
				progressBar={false}
				closeOnToastrClick={false}/>
            <Switch>
              <PrivateRoute exact path='/home' component={Login} />
              <Route exact path='/' component={Login} />
			  <PrivateRoute exact path='/work-bench-home' component={WorkbenchHome} />
			  <PrivateRoute exact path='/work-bench-tags-validation' component={WorkbenchTags} />
			  <PrivateRoute exact path='/merge-tags' component={MergeTags} />
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