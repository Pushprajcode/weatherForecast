import {
  compose,
  applyMiddleware,
  legacy_createStore as createStore,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducers } from '../combineReducer';

let middleware = [thunkMiddleware];

const enhancer = compose(applyMiddleware(...middleware));

export const store = createStore(rootReducers, enhancer);
