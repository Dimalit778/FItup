import { Theme } from "../utils/types";
import { scale, verticalScale } from "./styling";

export const createTheme = (isDark: boolean): Theme => ({
  colors: {
    primary: isDark ? "#60A5FA" : "#3B82F6",
    secondary: isDark ? "#A78BFA" : "#8B5CF6",
    background: isDark ? "#111827" : "#FFFFFF",
    surface: isDark ? "#1F2937" : "#F9FAFB",
    card: isDark ? "#374151" : "#FFFFFF",
    text: isDark ? "#F9FAFB" : "#111827",
    textSecondary: isDark ? "#9CA3AF" : "#6B7280",
    border: isDark ? "#4B5563" : "#E5E7EB",
    success: isDark ? "#34D399" : "#10B981",
    warning: isDark ? "#FBBF24" : "#F59E0B",
    error: isDark ? "#F87171" : "#EF4444",
    accent: isDark ? "#22D3EE" : "#06B6D4",
  },
  spacing: {
    xs: scale(4),
    sm: scale(8),
    md: scale(16),
    lg: scale(24),
    xl: scale(32),
    xxl: scale(48),
  },
  borderRadius: {
    xs: scale(4),
    sm: scale(8),
    md: scale(12),
    lg: scale(16),
    xl: scale(24),
    full: 9999,
  },
  typography: {
    sizes: {
      xs: verticalScale(12),
      sm: verticalScale(14),
      md: verticalScale(16),
      lg: verticalScale(20),
      xl: verticalScale(24),
      xxl: verticalScale(32),
    },
    weights: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },
  shadows: {
    sm: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.4 : 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: isDark ? 0.5 : 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
}); 