import * as React from 'react';
import * as _ from 'lodash';
import * as qs from 'qs';
import Axios from 'axios';
import { observable, autorun } from 'mobx';
import { observer } from 'mobx-react';
import { Grid, Dropdown } from 'semantic-ui-react';

import { AppModel } from './Models/AppModel';
import { AppStore } from './Stores/AppStore';

import { MonacoDiffEditor } from 'react-monaco-editor';

import './App.css';

interface IProps {
  model: AppModel;
}

@observer
class App extends React.Component<IProps> {
  @observable public sourceLeft: string = '';
  @observable public sourceRight: string = '';

  private disposeSourceLeft: any;
  private disposeSourceRight: any;

  public constructor(props: IProps) {
    super(props);
  }

  public componentDidMount() {
    if (location.hash !== '') {
      this.props.model.deserialize(qs.parse(location.hash.substring(1)));
    }

    this.disposeSourceLeft = autorun(async() => {
      Axios.get<any>(this.props.model.sourceLeftUrl).then(response => {
        location.hash = qs.stringify(this.props.model.serialize());
        this.sourceLeft = response.data;
      });
    });

    this.disposeSourceRight = autorun(async() => {
      Axios.get<any>(this.props.model.sourceRightUrl).then(response => {
        location.hash = qs.stringify(this.props.model.serialize());
        this.sourceRight = response.data;
      });
    });
  }

  public componentWillUnmount() {
    this.disposeSourceLeft();
    this.disposeSourceRight();
  }

  public render() {
    return (
      <div>
        <Grid style={{height: '100vh'}}>
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
          <Grid.Row columns={1} style={{height: '100%'}}>
            <Grid.Column>
              <MonacoDiffEditor
                language="c"
                original={this.sourceLeft}
                value={this.sourceRight}
                />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  };
}

export default App;
