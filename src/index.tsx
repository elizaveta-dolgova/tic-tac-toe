import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import './styles/main.css';
import { GameScreen } from './screens';
import { getStore } from './redux/store';

const store = getStore();
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GameScreen />
    </Provider>
  </React.StrictMode>
);
