import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IOverallStats {
  numberOfAlbums: number;
  numberOfArtists: number;
  numberOfSongs: number;
  numberOfGenres: number;
}

interface IGenreStat {
  genre: string;
  numberOfSongs: number;
}

interface IArtistStat {
  artist: string;
  numberOfSongs: number;
  numberOfAlbums: number;
}

interface IAlbumStat {
  artist: string;
  album: string;
  numberOfSongs: number;
}

export interface IStats {
  overallStats: IOverallStats;
  albumStats: Array<IAlbumStat>;
  artistStats: Array<IArtistStat>;
  genreStats: Array<IGenreStat>;
}

export type StatKeys = keyof IOverallStats;

interface StatsSlice {
  stats: IStats;
}

const initialState: StatsSlice = {
  stats: {
    overallStats: {
      numberOfAlbums: 0,
      numberOfArtists: 0,
      numberOfSongs: 0,
      numberOfGenres: 0,
    },
    albumStats: [],
    artistStats: [],
    genreStats: [],
  },
};

export const statsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {
    requestFetchStats: () => {},
    fetchStatsSuccess: (state, action: PayloadAction<IStats>) => {
      state.stats = action.payload;
    },
  },
});

export const { requestFetchStats, fetchStatsSuccess } = statsSlice.actions;

export default statsSlice.reducer;
