// src/store.js
import { legacy_createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';  // Importing 'thunk' correctly without braces
import { rootReducer } from './reduceres';

const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export default store;
