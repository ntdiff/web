import * as React from 'react';
import * as _ from 'lodash';
import { observer } from 'mobx-react';
import { Grid, Dropdown } from 'semantic-ui-react';

import { AppModel } from './Models/AppModel';
import { AppStore } from './Stores/AppStore';

import Iframe from 'react-iframe';

import './App.css';

interface IProps {
  model: AppModel;
}

@observer
class App extends React.Component<IProps> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Dropdown
                fluid={true}
                search={true}
                lazyLoad={true}
                selection={true}
                options={AppStore.descriptor.version}
                value={this.props.model.versionLeft}
                onChange={(e, { value }) => this.props.model.versionLeft = value as string} />

              <Dropdown
                fluid={true}
                search={true}
                lazyLoad={true}
                selection={true}
                options={AppStore.descriptor.filename}
                value={this.props.model.filenameLeft}
                onChange={(e, { value }) => {
                  this.props.model.filenameLeft = value as string;
                  this.props.model.filenameRight = value as string;
                }} />

              <Dropdown
                fluid={true}
                search={true}
                lazyLoad={true}
                selection={true}
                minCharacters={3}
                options={AppStore.descriptor.type}
                value={this.props.model.typeLeft}
                onChange={(e, { value }) => {
                  this.props.model.typeLeft = value as string;
                  this.props.model.typeRight = value as string;
                }} />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                fluid={true}
                search={true}
                lazyLoad={true}
                selection={true}
                options={AppStore.descriptor.version}
                value={this.props.model.versionRight}
                onChange={(e, { value }) => this.props.model.versionRight = value as string} />

              <Dropdown
                fluid={true}
                search={true}
                lazyLoad={true}
                selection={true}
                options={AppStore.descriptor.filename}
                value={this.props.model.filenameRight}
                onChange={(e, { value }) => this.props.model.filenameRight = value as string} />

              <Dropdown
                fluid={true}
                search={true}
                lazyLoad={true}
                selection={true}
                minCharacters={3}
                options={AppStore.descriptor.type}
                value={this.props.model.typeRight}
                onChange={(e, { value }) => this.props.model.typeRight = value as string} />
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Iframe url={this.props.model.url} />
      </div>
    );
  };
}

export default App;
