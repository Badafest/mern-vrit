import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ToggleTheme from "./ToggleTheme";

import MoonIcon from "../icons/moon.svg";
import SunIcon from "../icons/sun.svg";

const AppHeader = () => {
  const AppTitle = "Context Todo App";
  const [theme, toggleTheme] = useContext(ThemeContext);

  const btnSrc = {
    dark: SunIcon,
    light: MoonIcon,
  };

  return (
    <header className={"app-header " + theme}>
      <span className="app-title">{AppTitle}</span>
      <ToggleTheme onClick={toggleTheme} btnSrc={btnSrc[theme]} />
    </header>
  );
};

export default AppHeader;
