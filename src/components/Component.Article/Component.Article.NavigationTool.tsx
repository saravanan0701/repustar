  
import './Component.Article.NavigationTool.css';
import * as React from 'react';

interface IProps {
    isPendingArticle?: boolean;
    articleLength?: any;
}

export default class ArticleNavigationTool extends React.Component<IProps, any> {

  public render() {
    return (
        <div className='articles_navigation_tool_container'>
            <a href='/work-bench-home' className='articles_navigation_tool_container--back_button'>  &lt; Back </a>
             
            <span className='articles_navigation_tool_container--article_count'> 
                    {this.props.articleLength} Articles { this.props.isPendingArticle ? 'Pending': 'Completed' }
            </span>
        </div>
    );
  }
}