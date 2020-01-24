import * as React from 'react';

import { Modal, Button } from 'antd';
// import 'antd/dist/antd.css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/modal/style/index.css';


interface IProps {
    // show?: boolean;
    message?: string;
    title?: string;
    showCancel?: boolean;
    onOkHandle?: any;
}

interface IState {
    visible: boolean;
}


export default class ModalPopUpComponent extends React.Component<IProps, IState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            visible: true,
        };
    }

    showModal = () => {
        this.setState({
          visible: true,
        });
      };
    
      handleOk = (e: any) => {
        console.log(e);
        this.setState({
          visible: false,
        });
        if(this.props.onOkHandle){
            this.props.onOkHandle();
        }
      };
    
      handleCancel = (e: any) => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
    
    public render() {
        return (
            <Modal
                title={this.props.title}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={
                    this.props.showCancel
                        ? [
                            <Button key="back" onClick={this.handleCancel}>
                              Cancel
                            </Button>,
                            <Button key="submit" type="primary" onClick={this.handleOk}>
                              Ok
                            </Button>,
                          ]
                 : [
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                      Ok
                    </Button>,
                  ]
                }
                >
                <p>{this.props.message}</p>
            </Modal>
        );
    }
}