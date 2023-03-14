const initialState = {
  current: {},
  location: {}
};

const ForecastReducer = (state = initialState, action) => {
  // console.log('action', action.payload.current, action.payload.location)
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
