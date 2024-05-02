import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

/*
    I'm opting for client side filtering here for simplicity and to save on requests. 
    If there are a lot of songs in the db and we encounter performance issues because of this, 
    we can offload this to the server.
*/

interface GenreSlice {
  selectedGenres: Array<string>;
}

const initialState: GenreSlice = {
  selectedGenres: [],
};

export const genreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    selectGenre: (state, action: PayloadAction<string>) => {
      state.selectedGenres = [...state.selectedGenres, action.payload];
    },
    deselectGenre: (state, action: PayloadAction<string>) => {
      state.selectedGenres = state.selectedGenres.filter(
        (g) => g !== action.payload,
      );
    },
  },
});

export const { selectGenre, deselectGenre } = genreSlice.actions;

export default genreSlice.reducer;
