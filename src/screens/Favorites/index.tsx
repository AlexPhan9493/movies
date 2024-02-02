import MovieItem from "@components/MovieItem";
import { Movie } from "@constants/types";
import { useMovieFavorites } from "@hooks/useMovieFavorites";
import React from "react";
import { FlatList, View } from "react-native";

export const Favorites = () => {

  const { listFavoriteMovies } = useMovieFavorites();

  return (
    <View className={"bg-black flex-1"}>
      <FlatList
        data={listFavoriteMovies}
        contentContainerStyle={{
          alignSelf: "center",
          paddingVertical: 20
        }}
        ItemSeparatorComponent={() => <View className="h-[10px]" />}
        renderItem={({ item }: { item: Movie }) => (
          <MovieItem movie={item} />
        )}
      />
    </View>
  );
};
