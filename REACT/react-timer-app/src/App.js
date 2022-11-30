import "./App.css";

import TimerApp from "./components/TimerApp";
import { TimerContextProvider } from "./context/TimerLimit";
import { useState } from "react";

import Footer from "./components/Footer";

function App() {
  const INCREMENT = 5;
  const APP_TITLE = "Countdown Timer App";

  const [timerLimit, setTimerLimit] = useState(INCREMENT);

  const onPlusSecs = () => {
    setTimerLimit((prev) => prev + INCREMENT);
  };

  const onMinusSecs = () => {
    setTimerLimit((prev) => (prev > INCREMENT ? prev - INCREMENT : prev));
  };

  const resetTimer = (newLimit) => {
    setTimerLimit((_) => newLimit);
  };

  return (
    <TimerContextProvider timerLimit={timerLimit}>
      <div className="App">
        <header className="App-header">{APP_TITLE}</header>
        <TimerApp resetTimer={resetTimer} />
        <Footer
          onPlusSecs={onPlusSecs}
          onMinusSecs={onMinusSecs}
          btnTxt={INCREMENT + "s"}
        />
      </div>
    </TimerContextProvider>
  );
}

export default App;
