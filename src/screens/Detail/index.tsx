import React from "react";
import { Image, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { routeProps } from "@navigation/index";
import { Typography } from "@components/typography";
import { t } from "i18next";
import { Button } from "@components/button";
import { useFavorite } from "@hooks/useFavorite";
import { Movie } from "@constants/types";

export const Detail = () => {

  const route = useRoute<routeProps>();
  const movie = route?.params?.movie as Movie;
  const { changeFavoriteMovieStatus, isFavorite } = useFavorite(movie);

  return (
    <ScrollView className={"bg-black flex-1 px-S"}>
      <Image source={{ uri: movie?.poster_path }} className="h-[600px] w-full rounded-L" />
      <Typography typoStyle="ml-S text-white font-bold pt-L" variant="h2">
        {movie?.original_title}
      </Typography>
      <Typography typoStyle="ml-S text-white pt-L" variant="title">
        {`${t('ReleaseDate')}: ${movie?.release_date}`}
      </Typography>
      <Typography typoStyle="ml-S text-white" variant="title">
        {`${t('VoteAverage')}: ${movie?.vote_average}`}
      </Typography>
      <Typography typoStyle="ml-S text-white" variant="title">
        {`${t('VoteCount')}: ${movie?.vote_count}`}
      </Typography>
      <Typography typoStyle="ml-S text-white pt-L" variant="title">
        {movie?.overview}
      </Typography>
      <Button
        buttonStyle="my-XXL w-[95%]"
        title={isFavorite ? t('RemoveFavorite') : t('AddFavorite')}
        onPress={changeFavoriteMovieStatus} />
    </ScrollView>
  );
};
