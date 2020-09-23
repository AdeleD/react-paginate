import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App';

window.React = React;

ReactDOM.render(
  <App url={'http://localhost:3000/comments'} author={'adele'} perPage={10} />,
  document.getElementById('react-paginate')
);
