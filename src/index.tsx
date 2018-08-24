import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import { AppModel } from './Models/AppModel';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'semantic-ui-css/semantic.min.css';

ReactDOM.render(
  <App model={new AppModel()} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
