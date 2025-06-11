import { StyleSheet, TextInput, View } from "react-native";

import { verticalScale } from "@/src/config/styling";
import { useTheme } from "../../contexts/ThemeContext";
import { InputTProps } from "../../utils/types";

const InputT = (props: InputTProps) => {
  const { theme } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      height: verticalScale(54),
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.borderRadius.md,
      borderCurve: "continuous",
      paddingHorizontal: theme.spacing.md,
      gap: theme.spacing.sm,
    },
    input: {
      flex: 1,
      color: theme.colors.text,
      fontSize: verticalScale(14),
    },
  });
  return (
    <View style={[styles.input, props.style]}>
      <TextInput
        style={[styles.input, props.inputStyle]}
        placeholderTextColor={theme.colors.text}
        ref={props.inputRef && props.inputRef}
      />
    </View>
  );
};

export default InputT;
