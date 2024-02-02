import MovieItem from "@components/MovieItem";
import { Input } from "@components/input";
import colors from "@constants/colors";
import { Movie } from "@constants/types";
import { useMovieList } from "@hooks/useMovieList";
import { t } from "i18next";
import React from "react";
import { FlatList, View, RefreshControl } from "react-native";

export const List = () => {

  const { listMovies, isRefreshing, handleRefresh, debounceSearch } = useMovieList();

  return (
    <View className={"bg-black flex-1"}>
      <Input placeholder={t('Search')} onChangeText={debounceSearch} />
      <FlatList
        data={listMovies}
        contentContainerStyle={{
          alignSelf: "center",
          paddingVertical: 20
        }}
        ItemSeparatorComponent={() => <View className="h-[10px]" />}
        renderItem={({ item }: { item: Movie }) => (
          <MovieItem movie={item} />
        )}
        refreshControl={
          <RefreshControl
            tintColor={colors.white}
            refreshing={isRefreshing}
            onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};
