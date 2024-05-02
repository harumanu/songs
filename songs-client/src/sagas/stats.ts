import { call, put, takeLatest } from "redux-saga/effects";
import api from "../api";
import { getError } from "./songs";
import { fetchStatsSuccess, requestFetchStats } from "../reducers/stats";

function* fetchStats(): any {
  try {
    const songs = yield call(api.getStats);
    yield put(fetchStatsSuccess(songs));
  } catch (error) {
    const message = getError(error);
    yield put({ type: "FETCH_SONGS_ERROR", message });
  }
}

function* statsSaga() {
  yield takeLatest(requestFetchStats, fetchStats);
}

export default statsSaga;
