import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import type { Store } from 'redux';

import { rootSaga } from './rootSaga';
import type { RootState } from './rootReducer';
import { rootReducer } from './rootReducer';

export interface StoreAction {
  type: string;
  payload?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
}

let store: Store<RootState, StoreAction>;

export const getStore = (): Store<RootState, StoreAction> => {
  if (store) return store;

  const sagaMiddleware = createSagaMiddleware();
  store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  if (sagaMiddleware) {
    sagaMiddleware.run(rootSaga);
  }

  return store;
};
