//import Styles from './Layout.Auth.css';
import * as React from 'react';
//import Header from '../../../components/Component.Header/Component.Header';
import './Module.Header.Workbench.Secondary.css';


interface IProps {
  title?: string;
  pendingcount: number;
  completedcount: number;
  onLoadArticlesList?: any;
}

export default class WorkbenchSecondaryHeader extends React.Component<IProps, any> {
  public constructor(props: any) {
    super(props);
  }

  public componentDidMount() {
    // const session = localStorage.getItem('repustar_token');
    // if (session) {
    //   window.location.href = '/dashboard';
    // }
  }

  public loadArticles(articles_type: string){
    this.props.onLoadArticlesList(articles_type);
  }

  public render() {
    return (
      <React.Fragment>
        <div className='secondary_header'>
            <div className='secondary_header__left_panel'>
                <ul className='secondary_header__menu--ul'>
                    <li className='secondary_header__menu--list' onClick={() => this.loadArticles('pending_articles')}>
                        <span className='secondary_header__menu--list_item'>
                            {this.props.pendingcount} Pending Articles
                        </span>
                    </li>
                    <li className='secondary_header__menu--list' onClick={() => this.loadArticles('completed_articles')}>
                        <span className='secondary_header__menu--list_item'>
                            {this.props.completedcount} Completed Articles
                        </span>
                    </li>
                </ul>
            </div>
        </div>
      </React.Fragment>
    );
  }
}