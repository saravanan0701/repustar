  
//import * as Style from './Component.Form.css';
import * as React from 'react';


export default class Form extends React.Component<any, any> {

  public render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}