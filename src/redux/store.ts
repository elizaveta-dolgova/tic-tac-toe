import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import type { Store } from 'redux';
import { rootReducer } from './rootReducer';
import type { RootState } from './rootReducer';

import { rootSaga } from './rootSaga';

export type StoreAction = {
  type: string;
  payload?: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
};

export const getStore = (): Store<RootState, StoreAction> => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  if (sagaMiddleware) {
    sagaMiddleware.run(rootSaga);
  }

  return store;
};
