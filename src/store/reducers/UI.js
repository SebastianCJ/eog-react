import * as actions from "../actions";

const initialState = {
  loading: false,
  data: []
};

const selectMenu = (state, action) => {
  return {
    ...state,
    selectedMenuIndex: action.menuIndex
  };
};

const handlers = {
  [actions.SELECT_MENU]: selectMenu
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
