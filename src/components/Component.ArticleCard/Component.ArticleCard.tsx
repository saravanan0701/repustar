  
import './Component.ArticleCard.css';
import * as React from 'react';
import AnchorTag from '../Component.AnchorTag/Component.AnchorTag';

interface IProps {
    article_image?: string;
    article_url?: string;
    article_title?: string;
    article_site_name?: string;
    is_target_blank?: boolean;
}

export default class ArticleCard extends React.Component<IProps, any> {

  public render() {
    return (
        <div className='card_container'>
            <div>
                <img src={this.props.article_image} alt='brand_logo' className='image_container'/>
            </div>
            <div className='article_content'>
                <AnchorTag url={this.props.article_url} isTargetBlank = {this.props.is_target_blank} linkText={this.props.article_site_name} />
                <span className='article_description'>
                    {this.props.article_title}
                </span>
            </div>
        </div>
    );
  }
}