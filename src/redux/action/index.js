import axios from 'axios';

export const getWeatherApi = (apiUrl, successCallback, failureCallback) => {
  return (dispatch) => {
    axios
      .get(apiUrl)
      .then(response => {
        const _data = response.data;
        // dispatch({type: ''})
        successCallback(_data);
      })
      .catch(error => {
        failureCallback(error);
      });
  };
};
