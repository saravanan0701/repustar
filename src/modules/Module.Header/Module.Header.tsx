import * as React from 'react';
import WorkbenchHeader from './Module.Header.Workbench/Module.Header.Workbench';
// import LayoutDefault from './Default/Layout.Default';


export default class Header extends React.Component<any, any> {
  // tslint:disable-next-line: variable-name
  static Workbench = WorkbenchHeader;
  
  public render() {
    return (<React.Fragment>{this.props.children}</React.Fragment>);
  }
}
