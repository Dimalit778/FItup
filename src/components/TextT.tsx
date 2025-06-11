import { Text, TextStyle } from "react-native";
import { verticalScale } from "../config/styling";
import { TextTProps } from "../utils/types";

const TextT = ({ size, color = "red", fontWeight = "400", children, style, textProps = {} }: TextTProps) => {
  const textStyle: TextStyle = {
    fontSize: size ? verticalScale(size) : verticalScale(18),
    color,
    fontWeight,
  };
  return (
    <Text style={[textStyle, style]} {...textProps}>
      {children}
    </Text>
  );
};

export default TextT;
