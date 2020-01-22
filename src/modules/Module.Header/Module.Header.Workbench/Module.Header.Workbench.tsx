//import Styles from './Layout.Auth.css';
import * as React from 'react';
//import Header from '../../../components/Component.Header/Component.Header';
import './Module.Header.Workbench.css';
import repustar_logo from '../../../static/repustar_logo.svg';
import { Auth } from "aws-amplify";
import { withRouter } from 'react-router';
import { NavLink } from 'react-router-dom';
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
    localStorage.removeItem('user_id');
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
              <div className='header__menu--ul'>
                <div className='header__menu--list'>
                  <NavLink to="/work-bench-home" activeClassName="selected" className='header__menu--list_item'>
                    Articles
                  </NavLink>
                </div>
                {/* <div className='header__menu--list'>
                  <NavLink to="/merge-tags" activeClassName="selected" className='header__menu--list_item'>
                    Merge tags
                  </NavLink>
                </div> */}
              </div>
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