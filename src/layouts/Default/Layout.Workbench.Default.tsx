import * as React from 'react';
import './Layout.Workbench.Default.css';
import Header from '../../modules/Module.Header/Module.Header';

interface IProps {
  title: string;
}

class LayoutWorkbenchDefault extends React.Component<IProps, any> {

  public componentDidMount() {
    // const session = localStorage.getItem('repustar_token');
    // if (!session) {
    //   window.location.href = '/';
    // }
  }


  public render() {
    return (
      <div>
        <div>
          <title>Repustart Workbench | {this.props.title}</title>
        </div>
        <main className='workbench_container'>
          <Header.WorkbenchHeader/>
          <div>
              {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}

export default LayoutWorkbenchDefault;