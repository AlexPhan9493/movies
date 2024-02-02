import { useAppDispatch, useAppSelector } from "@store/index";
import { Movie } from "@constants/types";
import { addFavoriteMovie, removeFavoriteMovie } from "@store/slices";
import { useMemo } from "react";

export const useFavorite = (movie: Movie) => {

    const listFavoriteMovies = useAppSelector((state) => state.movies.favoriteMovies);
    const dispatch = useAppDispatch();

    const isFavorite = useMemo(()=>{
        if(listFavoriteMovies.find((item) => item.id === movie.id)){
            return true;
        }
        return false
    },[listFavoriteMovies])

    const changeFavoriteMovieStatus = () =>{
        if(isFavorite){
            dispatch(removeFavoriteMovie(movie))
        }else{
            dispatch(addFavoriteMovie(movie))
        }
    }

    return {
        changeFavoriteMovieStatus,
        isFavorite
    }
}
