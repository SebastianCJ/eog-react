import * as actions from "../actions";

const initialState = {
  loading: false,
  data: []
};

const toF = c => (c * 9) / 5 + 32;

const startLoading = (state, action) => {
  return { ...state, loading: true };
};

const droneReceived = (state, action) => {
  const { data } = action;
//   if (!data["consolidated_weather"]) return state;
//   const weather = data.consolidated_weather[0];
//   const { weather_state_name, the_temp } = weather;
//   const { latt_long, title: name } = data;
//   const [latitude, longitude] = latt_long.split(",");

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
