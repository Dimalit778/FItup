import { TouchableOpacity } from "react-native";
import { ButtonTProps } from "../../utils/types";

const ButtonT = ({ style, onPress, loading, children, hasShadow }: ButtonTProps) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default ButtonT;
