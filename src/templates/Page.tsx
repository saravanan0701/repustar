import * as React from 'react';

interface IProps {
  privateRoute: boolean;
}

class Page extends React.Component<IProps, any> {
  public componentDidMount() {
    // const session = localStorage.getItem('repustar_token');
    // if (!session && this.props.privateRoute) {
    //   window.location.href = '/';
    // }
  }

  public render() {
    return (
      <React.Fragment>
         {this.props.children}
      </React.Fragment>
    );
  }
}

export default Page;