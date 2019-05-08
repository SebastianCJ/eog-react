import { takeEvery, call, put, cancel, all } from "redux-saga/effects";
import { delay } from "redux-saga";
import API from "../api";
import * as actions from "../actions";


function* watchDrone(action) {
  // while (true) {
    const { error, data } = yield call(
      API.getDrone
    );
    if (error) {
      console.log({ error });
      yield put({ type: actions.API_ERROR, code: error.code });
      yield cancel();
      return;
    }
  //   const location = data[0] ? data[0].woeid : false;
    if (!data) {
      yield put({ type: actions.API_ERROR });
      yield cancel();
      return;
    }
      yield put({ type: actions.DRONE_RECEIVED, data: data });
  //     yield delay(4000);
  // }
}

function* watchDroneLoad() {
  yield all([
    takeEvery(actions.FETCH_DRONE, watchDrone)
  ]);
}

export default [watchDroneLoad];
