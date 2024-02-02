import React, { type PropsWithChildren, useCallback, useState } from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getFontSize } from "@components/typography/index";
import colors from "@constants/colors/index";

interface Props {
  placeholder: string;
  defaultValue?: string;
  inputStyle?: string;
  iconStyle?: string;
  isPassword?: boolean;
  multiline?: boolean;
  onChangeText: (text: string) => void;
}

export const Input = (props: PropsWithChildren<Props>): JSX.Element => {
  const {
    placeholder,
    inputStyle,
    children,
    isPassword = false,
    defaultValue = "",
    multiline = false,
    onChangeText,
  } = props;
  const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

  const changeSecureTextEntry = useCallback(() => {
    setSecureTextEntry(!secureTextEntry);
  }, [secureTextEntry]);

  return (
    <View
      className={`rounded-S flex-row bg-grey border border-lightWhite self-center items-center w-[93%] h-[55] ${inputStyle}`}
    >
      <View className="ml-M" />
      {children}
      <TextInput
        testID="input"
        className="text-white flex-1 ml-S h-[100%]"
        placeholder={placeholder}
        style={{ fontSize: getFontSize("title") }}
        selectionColor={colors.white}
        placeholderTextColor={colors.white}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        defaultValue={defaultValue}
        autoCapitalize="none"
        multiline={multiline}
        textAlignVertical={multiline ? "top" : "center"}
        underlineColorAndroid="transparent"
      />
      {isPassword ? (
        <>
          {secureTextEntry ? (
            <TouchableOpacity testID="eyeOff" onPress={changeSecureTextEntry}>
              <MaterialCommunityIcons
                name="eye-off"
                size={20}
                color={colors.white}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity testID="eyeOn" onPress={changeSecureTextEntry}>
              <MaterialCommunityIcons
                onPress={changeSecureTextEntry}
                name="eye"
                size={20}
                color={colors.white}
              />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <View />
      )}
      <View className="mr-M" />
    </View>
  );
};
