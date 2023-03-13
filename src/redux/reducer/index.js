const initialState = {
  current: {},
  location: {}
};

const ForecastReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'current':
      return {...state, ...action.payload};
    case 'location':
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default ForecastReducer;
