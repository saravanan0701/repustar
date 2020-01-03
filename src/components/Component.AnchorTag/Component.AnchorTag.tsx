  
// import './Component.AnchorTag.css';
import * as React from 'react';

interface IProps {
    url?: string;
    linkText?: string;
    isTargetBlank?: boolean;
}

export default class AnchorTag extends React.Component<IProps, any> {

  public render() {
    if(this.props.url){
        return(
            <a href={this.props.url} target={this.props.linkText ? '_blank' : ''} className='article_site'>{this.props.linkText}</a>
        )
    }else {
        return(
            <a target={this.props.linkText ? '_blank' : ''} className='article_site'>{this.props.linkText}</a>
        )
    }
  }
}