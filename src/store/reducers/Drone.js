import * as actions from "../actions";

const initialState = {
  loading: false,
  data: []
};

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const droneReceived = (state, action) => {

  return {
    ...state,
    loading: false,
    data: action.data.data
  };
};

const handlers = {
  [actions.FETCH_WEATHER]: startLoading,
  [actions.DRONE_RECEIVED]: droneReceived
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
