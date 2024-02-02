import React, { type PropsWithChildren } from "react";
import { Dimensions, Text } from "react-native";

const { width } = Dimensions.get("window");

type Variant = "h1" | "h2" | "h3" | "h4" | "title" | "subTitle" | "caption";

interface Props {
  variant: Variant;
  typoStyle?: string;
}

function RFValueHorizontal(
  fontSize: number,
  standardScreenHeight = 375,
): number {
  const heightPercent = Math.round((fontSize * width) / standardScreenHeight);
  return heightPercent > fontSize + 5 ? fontSize + 5 : heightPercent;
}

const fontSizes: Record<Variant, number> = {
  h1: RFValueHorizontal(32),
  h2: RFValueHorizontal(24),
  h3: RFValueHorizontal(20),
  h4: RFValueHorizontal(16),
  title: RFValueHorizontal(14),
  subTitle: RFValueHorizontal(12),
  caption: RFValueHorizontal(10),
};

export const getFontSize = (variant: Variant): number => fontSizes[variant];

export const Typography = ({
  variant,
  typoStyle,
  children,
}: PropsWithChildren<Props>): JSX.Element => {

  const sizeClasses = fontSizes[variant];
  return (
    <Text
      testID="typography"
      className={`${typoStyle}`}
      style={{ fontSize: sizeClasses }}
    >
      {children}
    </Text>
  );
};
