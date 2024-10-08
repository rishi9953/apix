// src/actions/feedbackActions.js
import axios from 'axios';

// Action types
export const FETCH_FEEDBACK_REQUEST = 'FETCH_FEEDBACK_REQUEST';
export const FETCH_FEEDBACK_SUCCESS = 'FETCH_FEEDBACK_SUCCESS';
export const FETCH_FEEDBACK_FAILURE = 'FETCH_FEEDBACK_FAILURE';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';

// Action creators
export const fetchFeedbackRequest = () => ({
  type: FETCH_FEEDBACK_REQUEST,
});

export const fetchFeedbackSuccess = (data) => ({
  type: FETCH_FEEDBACK_SUCCESS,
  payload: data,
});

export const fetchFeedbackFailure = (error) => ({
  type: FETCH_FEEDBACK_FAILURE,
  payload: error,
});

export const setCurrentPage = (pageNumber) => ({
  type: SET_CURRENT_PAGE,
  payload: pageNumber,
});

// Thunk function to fetch feedback data with pagination
export const fetchFeedbackData = (pageNumber = 1) => {
  return (dispatch) => {
    dispatch(fetchFeedbackRequest());
    axios
      .get(
        `https://apix.revoltmotors.com/userservices/v1/user/feedbackHistory?isPortal=true&pageNumber=${pageNumber}&count=10&startDate=&endDate=&rating=&mobile=&chassisNumber=`
      )
      .then((response) => {
        const data = response.data; // Assuming data is in response.data
        dispatch(fetchFeedbackSuccess(data.data));
        dispatch(setCurrentPage(pageNumber));
      })
      .catch((error) => {
        dispatch(fetchFeedbackFailure(error.message));
      });
  };
};
