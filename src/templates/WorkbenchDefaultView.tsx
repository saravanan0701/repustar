import * as React from 'react';
import Layout from '../layouts/Layout';
import Page from './Page';

export abstract class WorkbenchDefaultView<IProps, IState> extends React.Component<IProps, IState> {

  abstract setPageTitle() : string;
  abstract renderContent():  React.ReactNode;
  abstract setPrivateRoute() : boolean;

  public render() {
    return (
      <Page privateRoute={this.setPrivateRoute()}>
        <Layout.WorkbenchDefault title={this.setPageTitle()}>
          {this.renderContent()}
        </Layout.WorkbenchDefault>
      </Page >
    );
  }
}