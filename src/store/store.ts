import { legacy_createStore as createStore } from 'redux';
import gameReducer from './gameSlice';

const store = createStore(gameReducer);

export type RootState = ReturnType<typeof store.getState>;

export default store;
