import { createContext } from "react";

export interface IThemeContextType {
  isDarkTheme: boolean;
  setIsDarkTheme?: (value: boolean) => void;
}

export const ThemeContext = createContext<IThemeContextType>({
  isDarkTheme: true,
});
