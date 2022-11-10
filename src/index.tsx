import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { getStore } from '../src/redux/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
const store = getStore();

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
