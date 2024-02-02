import { Movie } from "@constants/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2N2FhZGY3Njk3NWIzYmY5ZjUyOGYyYmRlODBiOGExYyIsInN1YiI6IjU4MjViZDlkOTI1MTQxN2IxYTAwOTdiNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.l2FoUamvxHAOVgqYeQuVuXKaMy1XieGSYGaAaFQ1PQc';

const config = {
    headers: {
        Authorization: `Bearer ${token}`,
        accept: 'application/json'
    }
}

const parseMovies = (results: any): Movie[] => {
    const movies: Movie[] = []

    results.forEach((val: any) => {
        movies.push({
            id: val?.id,
            original_language: val?.original_language,
            original_title: val?.original_title,
            overview: val?.overview,
            poster_path: `https://image.tmdb.org/t/p/w500${val?.poster_path}`,
            release_date: val?.release_date.split("-").reverse().join("/"),
            vote_average: val?.vote_average,
            vote_count: val?.vote_count,
        })
    });

    return movies;
}

export const getMovieList = createAsyncThunk(
    "getMovieList",
    async () => {
        try {
            const res = await axios.get(
                'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
                config
            );
            return parseMovies(res?.data?.results);
        } catch (_e) {
            return []
        }
    },
)

export const searchMovie = createAsyncThunk(
    "searchMovie",
    async (keyword: string) => {
        try {
            const res = await axios.get(
                `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`,
                config
            );
            return parseMovies(res?.data?.results);
        } catch (_e) {
            return []
        }
    },
)