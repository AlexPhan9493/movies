import { Typography } from "@components/typography/index";
import React, { type PropsWithChildren } from "react";
import { TouchableOpacity } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  buttonStyle?: string;
  disabled?: boolean;
}

export const Button = (props: PropsWithChildren<Props>): JSX.Element => {
  const { title, onPress, buttonStyle, children, disabled = false } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{ opacity: disabled ? 0.5 : 1 }}
      testID="button"
      className={`rounded-L flex-row bg-blue items-center self-center content-center justify-center h-[60] ${buttonStyle}`}
      onPress={onPress}
    >
      {children}
      <Typography typoStyle="ml-S text-white font-bold" variant="title">
        {title}
      </Typography>
    </TouchableOpacity>
  );
};
