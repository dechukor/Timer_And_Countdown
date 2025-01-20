import { TimerStatus } from "../../types";
import { useEffect, useState } from "react";
import style from "./timer.module.css";

type TimerProps = {
  timerStatus: TimerStatus;
};

export const Timer = ({ timerStatus }: TimerProps) => {
  const [timer, setTimer] = useState("00:00:000");
  const [startTime, setStartTime] = useState(0);
  const [pauseTime, setPauseTime] = useState(0);

  useEffect(() => {
    const clearTimer = () => {
      setTimer("00:00:000");
      setStartTime(0);
      setPauseTime(0);
    };

    const getFormattedTime = (timeMs: number) => {
      let minutes = String(Math.floor(timeMs / 60000));
      let seconds = String(Math.floor(timeMs / 1000) % 60);
      let milliseconds = String(timeMs % 1000);

      const addZero = (value: string) => `0${value}`;

      if (minutes.length === 1) minutes = addZero(minutes);
      if (seconds.length === 1) seconds = addZero(seconds);
      if (milliseconds.length === 1) milliseconds = addZero(seconds);
      if (milliseconds.length === 2) milliseconds = addZero(seconds);

      return `${minutes}:${seconds}:${milliseconds}`;
    };

    const currentTime = () => new Date().getTime();

    if (timerStatus === "pause") {
      setPauseTime(currentTime() - startTime + pauseTime);
      return;
    }
    if (timerStatus === "stop") {
      clearTimer();
      return;
    }

    setStartTime(() => currentTime());

    const goTime = setInterval(() => {
      setTimer(() => getFormattedTime(currentTime() - startTime + pauseTime));
    }, 1);

    return () => clearInterval(goTime);
  }, [timerStatus, startTime]);

  document.title = timer;

  return <h1 className={style.timerText}>{timer}</h1>;
};
