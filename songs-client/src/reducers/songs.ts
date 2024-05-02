import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum LoadingStates {
  IDLE,
  FETCHING,
  ADDING,
  EDITING,
  REMOVING,
  ERROR,
}

export interface ISong {
  _id?: string;
  artist: string;
  title: string;
  album: string;
  genre: string;
}

interface SongsSlice {
  songs: Array<ISong>;
  loadingState: LoadingStates;
  hasFetched: boolean;
  apiError: string | null;
}

const initialState: SongsSlice = {
  songs: [],
  loadingState: LoadingStates.IDLE,
  hasFetched: false,
  apiError: null,
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    requestFetchSongs: (state) => {
      state.loadingState = LoadingStates.FETCHING;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Array<ISong>>) => {
      state.songs = action.payload;
      state.loadingState = LoadingStates.IDLE;
      state.hasFetched = true;
    },
    requestAddSong: (state) => {
      state.loadingState = LoadingStates.ADDING;
    },
    addSongSuccess: (state, action: PayloadAction<ISong>) => {
      state.songs = [action.payload, ...state.songs];
      state.loadingState = LoadingStates.IDLE;
    },
    requestEditSong: (state) => {
      state.loadingState = LoadingStates.EDITING;
    },
    editSongSuccess: (state, action: PayloadAction<ISong>) => {
      state.songs = state.songs.map((s) => {
        return s._id === action.payload._id ? action.payload : s;
      });
      state.loadingState = LoadingStates.IDLE;
    },
    requestRemoveSong: (state) => {
      state.loadingState = LoadingStates.REMOVING;
    },
    removeSongSuccess: (state, action: PayloadAction<ISong>) => {
      state.songs = state.songs.filter((s) => s._id !== action.payload._id);
      state.loadingState = LoadingStates.IDLE;
    },
    setApiError: (state, action: PayloadAction<string>) => {
      state.loadingState = LoadingStates.ERROR;
      state.apiError = action.payload;
    },
  },
});

export const {
  requestFetchSongs,
  fetchSongsSuccess,
  requestAddSong,
  addSongSuccess,
  requestEditSong,
  editSongSuccess,
  requestRemoveSong,
  removeSongSuccess,
  setApiError,
} = songsSlice.actions;

export function selectSongsByActiveGenres(state: RootState) {
  const { selectedGenres } = state.genres;
  const { songs } = state.songs;
  if (!selectedGenres.length) {
    return songs;
  }
  return songs.filter((s) => selectedGenres.includes(s.genre));
}

export default songsSlice.reducer;
