import * as React from 'react';
//import Styles from './Layout.Default.css';

interface IProps {
  title: string;
}

class LayoutDefault extends React.Component<IProps, any> {

  public componentDidMount() {
    const session = localStorage.getItem('repustar_token');
    if (!session) {
      window.location.href = '/';
    }
  }


  public render() {
    return (
      <div>
        <div>
          <title>Repustart Workbench | {this.props.title}</title>
        </div>
        <main>
            <div>
                {this.props.children}
            </div>
        </main>
      </div>
    );
  }
}

export default LayoutDefault;