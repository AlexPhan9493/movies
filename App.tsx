import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Navigation } from "@navigation/index";
import { Provider } from "react-redux";
import { store } from "@store/index";
import { View } from "react-native";

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}
