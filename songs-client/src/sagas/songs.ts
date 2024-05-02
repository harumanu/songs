import { call, put, takeLatest } from "redux-saga/effects";
import api from "../api";
import {
  addSongSuccess,
  editSongSuccess,
  fetchSongsSuccess,
  removeSongSuccess,
  requestAddSong,
  requestEditSong,
  requestFetchSongs,
  requestRemoveSong,
  setApiError,
} from "../reducers/songs";

export function getError(error: any) {
  let message = "Unknown Error";
  if (error instanceof Error) message = error.message;
  return message;
}
function* fetchSongs(): any {
  try {
    const songs = yield call(api.getSongs);
    yield put(fetchSongsSuccess(songs));
  } catch (error) {
    const message = getError(error);
    yield put(setApiError(message));
  }
}

function* addSong(action: any): any {
  try {
    const song = yield call(api.addSong, action.payload);
    yield put(addSongSuccess(song));
  } catch (error) {
    const message = getError(error);
    yield put(setApiError(message));
  }
}

function* editSong(action: any): any {
  try {
    const song = yield call(api.editSong, action.payload);
    yield put(editSongSuccess(song));
  } catch (error) {
    const message = getError(error);
    yield put(setApiError(message));
  }
}

function* deleteSong(action: any): any {
  try {
    yield call(api.deleteSong, action.payload._id);
    yield put(removeSongSuccess(action.payload));
  } catch (error) {
    const message = getError(error);
    yield put(setApiError(message));
  }
}

function* songsSaga() {
  yield takeLatest(requestFetchSongs, fetchSongs);
  yield takeLatest(requestAddSong, addSong);
  yield takeLatest(requestRemoveSong, deleteSong);
  yield takeLatest(requestEditSong, editSong);
}

export default songsSaga;
