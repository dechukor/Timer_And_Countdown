import { TimerStatus } from "../../types";
import { useEffect, useState, useMemo } from "react";
import { InputStartCount } from "./InputStartCount";
import { CircularProgress, Box } from "@mui/material";
import style from "./countdown.module.css";
import finishSound from "../../assets/sounds/finish_countdown.mp3";

type CountdownProps = {
  timerStatus: TimerStatus;
  setTimerStatus: (status: TimerStatus) => void;
};

export const Countdown = ({ timerStatus, setTimerStatus }: CountdownProps) => {
  const [counter, setCounter] = useState(0);
  const [startCount, setStartCount] = useState(0);

  // const changeCounter = (count: number): void => {
  //   setCounter(count);
  //   setStartCount(count);
  // };

  const getFormattedCounter = useMemo(
    () => (counter: number) => {
      let minutes = String(Math.floor(counter / 60));
      let seconds = String(Math.floor(counter % 60));

      const addZero = (value: string) => `0${value}`;

      if (minutes.length === 1) minutes = addZero(minutes);
      if (seconds.length === 1) seconds = addZero(seconds);

      const formattedCounter = `${minutes}:${seconds}`;

      return formattedCounter;
    },
    []
  );

  useEffect(() => {
    if (timerStatus !== "start") {
      return;
    }

    const goCount = setInterval(() => {
      setCounter((counter) => counter - 1);
    }, 1000);

    if (counter <= 0) {
      const soundFinishCount = new Audio(finishSound);
      soundFinishCount.play();
      setTimerStatus("pause");
    }

    return () => clearInterval(goCount);
  }, [timerStatus, counter]);

  const countdown = getFormattedCounter(counter);
  document.title = countdown;

  return (
    <>
      {timerStatus === "stop" ? (
        <InputStartCount
          timerStatus={timerStatus}
          counter={counter}
          setCounter={setCounter}
          setStartCount={setStartCount}
        />
      ) : (
        <Box className={style.container}>
          <div className={style.counterWrapper}>
            <h1 className={style.counterText + " text-time"}>{countdown}</h1>
          </div>
          <CircularProgress
            variant="determinate"
            size={250}
            value={(100 / startCount) * counter}
          />
        </Box>
      )}
    </>
  );
};
