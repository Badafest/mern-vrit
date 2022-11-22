import { addZeroes, secondsToHms } from "../../helpers";
import { TimeDisplay, TimeSeparator } from "../elements";

const TimerDisplay = ({ currentSeconds }) => {
  const [hours, minutes, seconds] = secondsToHms(currentSeconds)
    .split(" ")
    .map(parseFloat);

  return (
    <div className="timer-display">
      <TimeDisplay id="hour" value={addZeroes(hours)} />
      <TimeSeparator />
      <TimeDisplay id="minute" value={addZeroes(minutes)} />
      <TimeSeparator />
      <TimeDisplay id="second" value={addZeroes(seconds)} />
    </div>
  );
};

export default TimerDisplay;
