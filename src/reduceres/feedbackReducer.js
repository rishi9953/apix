
import {
    FETCH_FEEDBACK_REQUEST,
    FETCH_FEEDBACK_SUCCESS,
    FETCH_FEEDBACK_FAILURE,
  } from '../actions/feedbackactins';
  
  const initialState = {
    loading: false,
    feedbacks: [],
    error: '',
  };
  
  export const feedbackReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_FEEDBACK_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_FEEDBACK_SUCCESS:
        return {
          loading: false,
          feedbacks: action.payload.list,
          error: '',
        };
      case FETCH_FEEDBACK_FAILURE:
        return {
          loading: false,
          feedbacks: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  