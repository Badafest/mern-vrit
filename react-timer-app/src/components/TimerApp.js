import useTimer from "../hook/useTimer";
import TimerDisplay from "./TimerApp/TimerDisplay";
import TimerFooter from "./TimerApp/TimerFooter";
import { useState, useEffect } from "react";

const TimerApp = () => {
  const [playTimer, setPlayTimer] = useState(false);
  const [footerBtnTxt, setFooterBtnTxt] = useState("");

  const onTimerEnd = () => {
    setPlayTimer(false);
  };
  const [currentSeconds, resetTimerFunction] = useTimer(playTimer, onTimerEnd);

  useEffect(() => {
    setFooterBtnTxt((_) => (playTimer ? "HOLD" : "GO!"));
  }, [playTimer]);

  useEffect(() => {
    setFooterBtnTxt((prev) => (currentSeconds ? prev : "RESET"));
  }, [currentSeconds]);

  const onGoBtnClick = () => {
    if (currentSeconds) {
      setPlayTimer((prev) => !prev);
    } else {
      resetTimerFunction();
      setFooterBtnTxt((_) => "GO");
    }
  };

  return (
    <main>
      <TimerDisplay currentSeconds={currentSeconds} />
      <TimerFooter goClickHandler={onGoBtnClick} btnTxt={footerBtnTxt} />
    </main>
  );
};

export default TimerApp;
