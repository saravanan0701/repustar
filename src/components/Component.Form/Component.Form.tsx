  
import './Component.Form.css';
import * as React from 'react';


export default class Form extends React.Component<any, any> {

  public render() {
    return (
      <div className='form_container'>
        {this.props.children}
      </div>
    );
  }
}