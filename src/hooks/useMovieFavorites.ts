import { useAppDispatch, useAppSelector } from "@store/index";
import { useEffect } from "react"
import { getFavoriteMovies } from "src/services/localStore";

export const useMovieFavorites = () => {

    const listFavoriteMovies = useAppSelector((state) => state.movies.favoriteMovies);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getFavoriteMovies())
    }, [])

    return {
        listFavoriteMovies,
    }
}
