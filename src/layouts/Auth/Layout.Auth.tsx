//import Styles from './Layout.Auth.css';
import * as React from 'react';

interface IProps {
  title?: string;
}

export default class LayoutAuth extends React.Component<IProps, any> {
  public constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    const session = localStorage.getItem('repustar_token');
    if (session) {
      window.location.href = '/dashboard';
    }
  }

  public render() {
    return (
      <React.Fragment>
        <div>
          <title>Repustar | {this.props.title}</title>
        </div>
        <div>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}