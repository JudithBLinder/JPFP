import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/app';
import store from './store';

const app = document.querySelector('#app');

render(
  <Provider store={store}>
    <App />
  </Provider>,
  app,
  () => {
    console.log('app is ready!');
  }
);
