import './Layout.css';
import * as React from 'react';
import LayoutAuth from './Auth/Layout.Auth';
import LayoutDefault from './Default/Layout.Default';

export default class Layout extends React.Component<any, any> {
  // tslint:disable-next-line: variable-name
  static Auth = LayoutAuth;
  // tslint:disable-next-line: variable-name
  static Default = LayoutDefault;

  public render() {
    return (<React.Fragment>{this.props.children}</React.Fragment>);
  }
}
