import './Layout.css';
import * as React from 'react';
import LayoutAuth from './Auth/Layout.Auth';
import LayoutWorkbenchDefault from './Default/Layout.Workbench.Default';

export default class Layout extends React.Component<any, any> {
  // tslint:disable-next-line: variable-name
  static Auth = LayoutAuth;
  // tslint:disable-next-line: variable-name
  static WorkbenchDefault = LayoutWorkbenchDefault;

  public render() {
    return (<React.Fragment>{this.props.children}</React.Fragment>);
  }
}
