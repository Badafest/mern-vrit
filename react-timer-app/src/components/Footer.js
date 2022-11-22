import { IconButton, TimeDisplay } from "./elements";
import PlusBtn from "../icons/plus-square.svg";
import MinusBtn from "../icons/minus-square.svg";
import { useContext } from "react";
import { TimerContext } from "../context/TimerLimit";
import { secondsToHms } from "../helpers";

const Footer = ({ onPlusSecs, onMinusSecs, btnTxt }) => {
  const timerLimit = useContext(TimerContext);
  return (
    <footer>
      <IconButton icon={PlusBtn} text={btnTxt} onClick={onPlusSecs} />
      <TimeDisplay id="timer-set" value={secondsToHms(timerLimit)} />
      <IconButton icon={MinusBtn} text={btnTxt} onClick={onMinusSecs} />
    </footer>
  );
};

export default Footer;
