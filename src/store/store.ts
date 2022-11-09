import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import gameReducers from './gameReducers';
import createSagaMiddleware from '@redux-saga/core';
import mySaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(gameReducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(mySaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
