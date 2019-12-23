  
import './Component.Header.css';
import * as React from 'react';


export default class Header extends React.Component<any, any> {

  public render() {
    return (
      <div>
        <div className='header'>
           {this.props.children}
        </div>
      </div>
    );
  }
}