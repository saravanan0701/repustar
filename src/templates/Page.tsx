import * as React from 'react';
// import NotificationCenter from '../modules/Module.NotificationCenter/Module.NotificationCenter';

interface IProps {
  privateRoute: boolean;
}

class Page extends React.Component<IProps, any> {
  public componentDidMount() {
    const session = localStorage.getItem('zeuz_session');
    if (!session && this.props.privateRoute) {
      window.location.href = '/';
    }
  }

  public render() {
    return (
      <React.Fragment>
        {/* <NotificationCenter /> */}
        {this.props.children}
      </React.Fragment>
    );
  }
}

export default Page;