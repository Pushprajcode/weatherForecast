import axios from 'axios';

export const getWeatherApi = (apiUrl, successCallback, failureCallback) => {
  return dispatch => {
    axios
      .get(apiUrl)
      .then(response => {
        const _data = response.data;
        dispatch({type: 'current', payload: _data});
        successCallback(_data);
      })
      .catch(error => {
        failureCallback(error);
      });
  };
};
