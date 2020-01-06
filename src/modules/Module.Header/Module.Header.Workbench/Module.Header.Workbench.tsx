//import Styles from './Layout.Auth.css';
import * as React from 'react';
//import Header from '../../../components/Component.Header/Component.Header';
import './Module.Header.Workbench.css';
import repustar_logo from '../../../static/repustar_logo.svg';
import menu_down from '../../../static/menu_down.svg';
import user_icon from '../../../static/user.svg';
import { Auth } from "aws-amplify";
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

interface IProps {
  title?: string;
  history?: any;
}

class WorkbenchHeader extends React.Component<IProps, any> {
  public constructor(props: any) {
    super(props);
  }

  public handleLogout() {
    Auth.signOut();
    //userHasAuthenticated(false);
    this.props.history.push("/");
  }

  public componentDidMount() {
    // const session = localStorage.getItem('repustar_token');
    // if (session) {
    //   window.location.href = '/dashboard';
    // }
  }

  public render() {
    return (
      <React.Fragment>
        <div>
          <title>Repustar | {this.props.title}</title>
        </div>
        <div className='header'>
            <div className='header__left_panel'>
                <img src={repustar_logo} alt='brand_logo' className='header__brand_logo'/>
                <span className='header__module_name'>
                    ANNOTATION WORKBENCH
                </span>
            </div>
            <div className='header__menu_panel'>
                <ul className='header__menu--ul'>
                    <li className='header__menu--list'>
                        <span>
                          <a href='/work-bench-home' className='header__menu--list_item'>Home</a>
                          <hr className='header__menu--selected_item'></hr> 
                        </span>
                    </li>
                    <li className='header__menu--list'>
                        <span className='header__menu--list_item'>
                          Help
                        </span>
                    </li>
                </ul>
            </div>

            <div className='header__right_panel'>
                <span className='header__logout' onClick={() => this.handleLogout()}>Logout</span>
                {/* <img src={user_icon} alt='user_icon' className='header__user_icon'/>
                <img src={menu_down} alt='profile_drop_down' className='header__menu_drop_down'/> */}
            </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: any): IProps => ({});

const mapDispatchToProps = (dispatch: any): IProps => ({});

export default withRouter(connect<IProps, IProps>(
  mapStateToProps,
  mapDispatchToProps,
)(WorkbenchHeader));