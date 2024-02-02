import { Button } from '@components/button';
import { Typography } from '@components/typography';
import { Movie } from '@constants/types';
import { useFavorite } from '@hooks/useFavorite';
import { navigationProps } from '@navigation/index';
import { useNavigation } from '@react-navigation/native';
import { t } from 'i18next';
import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

const MovieItem = ({ movie }: { movie: Movie }) => {
    const { navigate } = useNavigation<navigationProps>();
    const { changeFavoriteMovieStatus, isFavorite } = useFavorite(movie);

    return (
        <TouchableOpacity
            onPress={() => navigate("Detail", { movie })}
            className="flex flex-col p-4 border border-white rounded-L">
            <View className='flex flex-row items-center'>
                <Image source={{ uri: movie.poster_path }} className="h-[170px] w-[120px] rounded-L" />
                <View className="flex flex-col">
                    <Typography typoStyle="ml-S text-white font-bold w-[250px]" variant="h4">
                        {movie.original_title}
                    </Typography>
                    <Typography typoStyle="ml-S text-white" variant="subTitle">
                        {`${t('ReleaseDate')}: ${movie.release_date}`}
                    </Typography>
                </View>
            </View>
            <Button
                buttonStyle="mt-S w-[100%]"
                title={isFavorite ? t('RemoveFavorite') : t('AddFavorite')}
                onPress={changeFavoriteMovieStatus} />
        </TouchableOpacity>
    );
};

export default MovieItem;
