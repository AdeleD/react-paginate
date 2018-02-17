import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './App'


const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <App url={'http://localhost:3000/comments'}
          author={'adele'}
          perPage={10} />,
    </AppContainer>,
    document.getElementById('react-paginate')
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App)
  })
}
