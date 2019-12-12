import React, { Component } from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';
//import { PrivateRoute } from './routes/PrivateRoute';

import { Login } from "./pages/";

import { connect } from 'react-redux';

class AppComponent extends Component {
	// componentDidMount(){
	// 	const { dispatch } = this.props;
	// }
	render() {
		return (
			<HashRouter>
				<Switch>
					<Route exact 
						path='/login' 
						component={Login} 
					/>

					{ /* Dashboard */ }
					{/* <PrivateRoute exact 
						path='/' 
						component={DashboardPage} 
					/> */}


					{/* 404 url: called when nothing elase has been called */}
					{/* <Route component={Page404}></Route> */}
				</Switch>
			</HashRouter>
		);
	}
}

// const mapStateToProps = (state) =>{
// 	const { loggingIn } = state.authentication;
// 	return {
// 		loggingIn
// 	};
// }

const App = connect(
	null, 
	null, 
	null, 
	{
		pure: false

	}
)(AppComponent);

export default App;