import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { IconButton } from "./Elements";

import MoonSvg from "../icons/moon.svg";
import SunSvg from "../icons/sun.svg";

const AppHeader = () => {
  const [isDark, toggleTheme] = useContext(ThemeContext);
  const APP_TITLE = "Todo App";

  const BtnSrc = {
    true: SunSvg,
    false: MoonSvg,
  };

  return (
    <header>
      <span className="app-title">{APP_TITLE}</span>
      <IconButton text={""} icon={BtnSrc[isDark]} onClick={toggleTheme} />
    </header>
  );
};

export default AppHeader;
