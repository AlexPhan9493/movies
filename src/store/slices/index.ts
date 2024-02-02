import {
  createListenerMiddleware,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { Movie } from "@constants/types";
import { getMovieList, searchMovie } from "src/services/api";
import { getFavoriteMovies, saveFavoriteMovies } from "src/services/localStore";

export interface State {
  listMovies: Movie[];
  favoriteMovies: Movie[];
}

const initialState: State = {
  listMovies: [],
  favoriteMovies: []
};

const moviesSlice = createSlice({
  name: "listMovies",
  initialState,
  reducers: {
    addFavoriteMovie: (state, action: PayloadAction<Movie>) => {
      const data = [...state.favoriteMovies, action.payload];
      state.favoriteMovies = data;
    },
    removeFavoriteMovie: (state, action: PayloadAction<Movie>) => {
      const data = state.favoriteMovies.filter(
        (obj) => obj.id !== action.payload.id,
      );
      state.favoriteMovies = data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMovieList.fulfilled, (state, action) => {
      state.listMovies = action.payload;
    });
    builder.addCase(getMovieList.pending, (state, action) => {
      state.listMovies = [];
    });
    builder.addCase(searchMovie.fulfilled, (state, action) => {
      state.listMovies = action.payload;
    });
    builder.addCase(getFavoriteMovies.fulfilled, (state, action) => {
      state.favoriteMovies = action.payload;
    });
  },
});

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  predicate: (_action, currentState, previousState) => {
    return (
      (currentState as RootState).movies.favoriteMovies !==
      (previousState as RootState).movies.favoriteMovies 
    );
  },
  effect: async (_action, listenerApi) => {
    saveFavoriteMovies((listenerApi.getState() as RootState).movies.favoriteMovies);
  },
});

export const { addFavoriteMovie, removeFavoriteMovie } = moviesSlice.actions;


const moviesReducer = moviesSlice.reducer;
export default moviesReducer;
