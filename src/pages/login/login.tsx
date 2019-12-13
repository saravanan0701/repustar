import * as React from 'react';
import Layout from '../../layouts/Layout';
import Form from '../../components/Component.Form/Component.Form';
import { withRouter } from 'react-router';
import { RepositorieAuth } from '../../repositories/Repositorie.Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginAction } from '../../redux/redux.auth/redux.auth.action';
import ErrorCodes from '../../ErrorCodes';
import { IError } from '../../interfaces/Interface.Error';

interface IProps {
  userDetails?: any;
  doHandleLoginResponse?: any;
}

interface IState {
  username: string;
  password: string;
  rememberMe: boolean;
  error: boolean;
  errorMessage: string;
}

class Login extends React.Component<IProps, IState> {
  private repositories = new RepositorieAuth();
  public constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
      rememberMe: false,
      error: false,
      errorMessage: '',
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  public handleKeyDown(e:any) {
    if (e.key === 'Enter') {
      this.doLogin(this.state.username, this.state.password);
    }
  }

  public doLogin(username: string, password: string) {
    this.repositories.login(username, password).then((response) => {
      this.setState({ error: false, errorMessage: '' });
      
      this.props.doHandleLoginResponse(response.data);
      
      //Redirect to dashboard
      //Router.pushRoute('/dashboard');
      
    }).catch((error: IError) => {
      console.log('error ', error);
      if (error.Error === ErrorCodes.AUTH_INVALID_LOGIN) {
        this.setState({
          error: true,
          errorMessage: 'Your login credentials are wrong. Please try again.',
        });
      } else {
        this.setState({ error: true, errorMessage: '' });
      }
    });
  }

  public render() {
    return (
      <Layout.Auth title="Login">
        <Form>
            <p>Login Form</p>
            <button 
              onClick={() => this.doLogin('allen', 'allen')}
            >Submit</button>
        </Form>
      </Layout.Auth>
    );
  }
}

const mapStateToProps = (state: any): IProps => ({
  userDetails: state.auth,
});

const mapDispatchToProps = (dispatch: any): IProps => ({
  doHandleLoginResponse: bindActionCreators(loginAction, dispatch),
});

export default withRouter(connect<IProps, IProps>(
  mapStateToProps,
  mapDispatchToProps,
)(Login));