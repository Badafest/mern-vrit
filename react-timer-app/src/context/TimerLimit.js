import { createContext } from "react";

const TimerContext = createContext();

const TimerContextProvider = (props) => {
  console.log(props.timerLimit);
  return (
    <TimerContext.Provider value={props.timerLimit}>
      {props.children}
    </TimerContext.Provider>
  );
};

export { TimerContext, TimerContextProvider };
