import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import logger from 'redux-logger'
import sagas from "./sagas";
import weatherReducer from "./reducers/Weather";
import droneReducer from "./reducers/Drone";
import uiReducer from "./reducers/UI";

export default () => {
  const rootReducer = combineReducers({
    weather: weatherReducer,
    drone: droneReducer,
    ui: uiReducer,
  });

  const composeEnhancers = composeWithDevTools({});
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = applyMiddleware(sagaMiddleware, logger);
  const store = createStore(rootReducer, composeEnhancers(middlewares));

  sagas.forEach(sagaMiddleware.run);

  return store;
};
