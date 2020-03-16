import * as React from 'react';
import Layout from '../../layouts/Layout';
import Form from '../../components/Component.Form/Component.Form';
import { withRouter } from 'react-router';
import { RepositorieAuth } from '../../repositories/Repositorie.Auth';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginAction } from '../../redux/redux.auth/redux.auth.action';
import { IError } from '../../interfaces/Interface.Error';
import './login.css';

interface IProps {
  userDetails?: any;
  doHandleLoginResponse?: any;
  history?: any;
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
      this.doLogin();
    }
  }

  public doLogin() {
    this.repositories.login(this.state.username, this.state.password).then((response: any) => {
      localStorage.setItem('user_id', response.username);
      localStorage.setItem('repustar_token', response.signInUserSession.accessToken.jwtToken)
      this.props.history.push('/work-bench-home');
    }).catch((error: IError) => {
      // Notification for failed login
    });
  }

  public render() {
    return (
      <Layout.Auth title="Login">
        <Form>
            <span className='auth_title'>Login</span>
            <span className='auth_subtext'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>

            <div className='auth_input_container'>
              <input type='text'
                className='auth_input'
                placeholder='Email'
                onChange={(e) => this.setState({ username: e.currentTarget.value })}
                ></input>
              <input type='password'
                className='auth_input'
                placeholder='Password'
                onChange={(e) => this.setState({ password: e.currentTarget.value })}
                onKeyDown={(e) => this.handleKeyDown(e)}
                ></input>
            </div>
            <button
              className='auth_action_button'
              onClick={() => this.doLogin()}
            >Login</button>
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
