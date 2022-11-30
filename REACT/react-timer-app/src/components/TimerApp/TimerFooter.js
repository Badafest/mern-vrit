import { IconButton } from "../elements";
import TimerButton from "../../icons/timer-square.svg";

const TimerFooter = ({ goClickHandler, btnTxt }) => {
  console.log(btnTxt);
  return (
    <div className="footer">
      <IconButton icon={TimerButton} text={btnTxt} onClick={goClickHandler} />
    </div>
  );
};

export default TimerFooter;
