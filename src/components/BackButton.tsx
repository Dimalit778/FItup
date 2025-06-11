import { useRouter } from "expo-router";

import { verticalScale } from "@/src/config/styling";
import { useTheme } from "@/src/contexts/ThemeContext";
import { CaretLeft } from "phosphor-react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { BackButtonProps } from "../../utils/types";

const BackButton = ({ style, iconSize = 26 }: BackButtonProps) => {
  const router = useRouter();
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.colors.background,
      alignItems: "flex-start",
      borderRadius: theme.borderRadius.full,
      borderCurve: "continuous",
    },
  });

  return (
    <TouchableOpacity style={[styles.button, style]} onPress={() => router.back()}>
      <CaretLeft size={verticalScale(iconSize)} color={theme.colors.text} />
    </TouchableOpacity>
  );
};

export default BackButton;
