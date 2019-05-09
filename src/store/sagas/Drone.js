import { takeEvery, call, put, cancel, all, cancelled, fork, take } from "redux-saga/effects";
import { delay } from "redux-saga";
import API from "../api";
import * as actions from "../actions";

function* beginSync() {
  try{
    while (true) {
      const { error, data } = yield call(
        API.getDrone
      );
      if (error) {
        yield put({ type: actions.API_ERROR, code: error.code, message: error.message });
        yield cancel();
        return;
      }
    
      if (!data) {
        yield put({ type: actions.API_ERROR });
        yield cancel();
        return;
      }
        yield put({ type: actions.DRONE_RECEIVED, data: data });
          yield delay(4000);
        
    } 
  } finally {
      if (yield cancelled())
       yield put({ type: actions.SYNC_DRONE_STOP })
  }
}

function* watchDrone() {
    // starts the task in the background
    const bgSyncTask = yield fork(beginSync)

    // wait for the user stop action
    yield take(actions.SYNC_DRONE_CANCELLED)
    // user clicked stop. cancel the background task
    // this will cause the forked bgSync task to jump into its finally block
    yield cancel(bgSyncTask)
}

function* watchDroneLoad() {
  yield all([
    takeEvery(actions.FETCH_DRONE, watchDrone)
  ]);
}

export default [watchDroneLoad];
