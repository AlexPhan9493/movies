import { useAppDispatch, useAppSelector } from "@store/index";
import { useEffect, useState } from "react"
import { getMovieList, searchMovie } from "src/services/api";
import { debounce } from 'lodash'

export const useMovieList = () => {

    const listMovies = useAppSelector((state) => state.movies.listMovies);
    const dispatch = useAppDispatch();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleSearch = (keyword: string) => {
        if (keyword) {
            dispatch(searchMovie(keyword));
        } else {
            dispatch(getMovieList())
        }
    }

    const debounceSearch = debounce(handleSearch, 1000)

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await dispatch(getMovieList());
        setIsRefreshing(false);
    };

    useEffect(() => {
        dispatch(getMovieList())
    }, [])

    return {
        listMovies,
        isRefreshing,
        handleRefresh,
        debounceSearch
    }
}
