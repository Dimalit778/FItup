import { ReactNode, RefObject } from "react";
import { TextInput, TextProps, TextStyle, TouchableOpacityProps, ViewStyle } from "react-native";

export type ScreenWrapperProps = {
  style?: ViewStyle;
  children: React.ReactNode;
 
};
export type TextTProps = {
  size?: number;
  color?: string;
  fontWeight?: TextStyle['fontWeight']
  children: any | null;
  style?: TextStyle;
  textProps?: TextProps;
};
export type IconComponent = React.ComponentType<{
  height?:number;
  width?:number;
  strokeWidth?:number;
  fill?:string;
  stroke?:string;
}>;

export type IconProps = {
  name: string;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;

};
export type InputTProps = {
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  inputRef?: RefObject<TextInput>;

}
export type HeaderProps = {
  title: string;
  style?: ViewStyle;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}
export type BackButtonProps = {
  style?: ViewStyle
  iconSize?: number;

}
export interface ButtonTProps extends TouchableOpacityProps {
  style?: ViewStyle;
  onPress: () => void;
  loading?: boolean;
  hasShadow?: boolean;
  children: ReactNode;

}
export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    success: string;
    warning: string;
    error: string;
    accent: string;
  }
  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  }
  borderRadius: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    full: number;
  }
  typography: {
    sizes: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    }
    weights: {
      regular: string;
      medium: string;
      semibold: string;
      bold: string;
    }
  }
  shadows: {
    sm: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    }
    md: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    }
    lg: {
      shadowColor: string;
      shadowOffset: { width: number; height: number };
      shadowOpacity: number;
      shadowRadius: number;
      elevation: number;
    }
  }
}