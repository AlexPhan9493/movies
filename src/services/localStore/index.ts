import { Movie } from "@constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";

const keyStore = 'favoriteMovies'

export const saveFavoriteMovies = (data: Movie[]) => {
  AsyncStorage.setItem(keyStore, JSON.stringify(data));
};

export const getFavoriteMovies = createAsyncThunk(
  "getFavoriteMovies",
  async () => {
    const dataText = (await AsyncStorage.getItem(keyStore)) || "";
    const data: Movie[] = JSON.parse(dataText) || [];
    return data;
  },
);
