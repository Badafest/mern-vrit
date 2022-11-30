import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeContextProvider = (props) => {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={[isDark, toggleTheme]}>
      {props.children}
    </ThemeContext.Provider>
  );
};
