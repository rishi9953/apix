// src/reducers/index.js
import { combineReducers } from 'redux';
import { feedbackReducer } from './feedbackReducer';

export const rootReducer = combineReducers({
  feedback: feedbackReducer,
});
