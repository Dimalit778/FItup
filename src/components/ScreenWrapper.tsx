import { Dimensions, Platform, StatusBar, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { ScreenWrapperProps } from "../utils/types";
const { height } = Dimensions.get("window");

export function ScreenWrapper({ style, children }: ScreenWrapperProps) {
  const { theme, isDark } = useTheme();
  let paddingTop = Platform.OS === "ios" ? height * 0.06 : 50;
  return (
    <View style={[{ paddingTop, flex: 1, backgroundColor: theme.colors.background }, style]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
      {children}
    </View>
  );
}
