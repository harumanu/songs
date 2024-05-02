import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import statsSlice from "./reducers/stats";
import songsSlice from "./reducers/songs";
import genreSlice from "./reducers/genres";
import songsSaga from "./sagas/songs";
import statsSaga from "./sagas/stats";
import { all } from "redux-saga/effects";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    songs: songsSlice,
    stats: statsSlice,
    genres: genreSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

function* rootSaga() {
  yield all([statsSaga(), songsSaga()]);
}
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
