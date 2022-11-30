import { useContext, useEffect, useState } from "react";
import { TimerContext } from "../context/TimerLimit";

const useTimer = (playTimer, onTimerEnd) => {
  const timerLimit = useContext(TimerContext);
  const [current, setCurrent] = useState(timerLimit);

  const updateCurrent = (prev) => {
    if (prev >= 1) {
      if (prev === 1) {
        onTimerEnd();
      }
      return prev - 1;
    } else {
      return prev;
    }
  };

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (playTimer) {
        setCurrent(updateCurrent);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [playTimer]);

  const resetTimer = () => {
    setCurrent((prev) => (playTimer ? prev : timerLimit));
  };

  useEffect(resetTimer, [timerLimit]);

  return [current, resetTimer];
};

export default useTimer;
