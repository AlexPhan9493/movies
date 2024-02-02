import {
  createNavigationContainerRef,
  NavigationContainer,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import React from "react";
import { t } from "@localization/index";
import colors from "@constants/colors/index";
import { Detail } from "@screens/Detail";
import { List } from "@screens/List";
import { Movie } from "@constants/types";
import { Favorites } from "@screens/Favorites";
import { Typography } from "@components/typography";
import { TouchableOpacity } from "react-native";

export type RootStackParamList = {
  List: undefined,
  Detail: { movie: Movie } | undefined;
  Favorite: undefined
};

export type navigationProps = NativeStackNavigationProp<RootStackParamList>;
export type routeProps = RouteProp<RootStackParamList>;

export const rootRef = createNavigationContainerRef();
const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Navigation = (): JSX.Element => {
  return (
    <>
      <NavigationContainer ref={rootRef}>
        <RootNavigator />
      </NavigationContainer>
    </>
  );
};

const RootNavigator = (): JSX.Element => {
  const { navigate, goBack } = useNavigation<navigationProps>();

  return (
    <RootStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center'
      }}
      initialRouteName="List">
      <RootStack.Screen
        name="List"
        component={List}
        options={{
          title: t('ListTitle'),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigate("Favorite")}>
              <Typography typoStyle="text-white font-bold" variant="subTitle">
                {`${t('Favorites')} >`}
              </Typography>
            </TouchableOpacity>
          ),
          headerShown: true,
          headerShadowVisible: false,
          animation: "slide_from_right",
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.black,
          },
        }}
      />
      <RootStack.Screen
        name="Detail"
        component={Detail}
        options={{
          headerShown: true,
          title: t('DetailTitle'),
          headerLeft: () => (
            <TouchableOpacity onPress={() => goBack()}>
              <Typography typoStyle="text-white font-bold" variant="subTitle">
                {`< ${t('Back')}`}
              </Typography>
            </TouchableOpacity>
          ),
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.black,
          },
          headerShadowVisible: false,
          animation: "slide_from_right",
        }}
      />
      <RootStack.Screen
        name="Favorite"
        component={Favorites}
        options={{
          headerShown: true,
          title: t('Favorites'),
          headerLeft: () => (
            <TouchableOpacity onPress={() => goBack()}>
              <Typography typoStyle="text-white font-bold" variant="subTitle">
                {`< ${t('Back')}`}
              </Typography>
            </TouchableOpacity>
          ),
          headerTintColor: colors.white,
          headerStyle: {
            backgroundColor: colors.black,
          },
          headerShadowVisible: false,
          animation: "slide_from_right",
        }}
      />
    </RootStack.Navigator>
  );
};
