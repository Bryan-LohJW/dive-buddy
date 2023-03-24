/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useEffect, useState } from "react";

type TimingObject = {
  minutes: string;
  seconds: string;
  milliseconds: string;
};

const BestTimer = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => setTime((time) => time + 10), 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const minutes = ("0" + Math.floor((time / 60000) % 10).toString()).slice(-2);
  const seconds = ("0" + Math.floor((time / 1000) % 60).toString()).slice(-2);
  const milliseconds = ("0" + Math.floor((time / 10) % 100).toString()).slice(
    -2
  );

  const submitTiming = async (timing: TimingObject) => {
    const response = await fetch("/api/timer/bestTime", {
      method: "POST",
      body: JSON.stringify(timing),
    });
    if (!response.ok) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const result = await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return result;
  };

  const timerToggleHandler = () => {
    if (isRunning && time > 0) {
      console.log(minutes, seconds, milliseconds);
      const timing: TimingObject = {
        minutes,
        seconds,
        milliseconds,
      };
      void submitTiming(timing).then((result) => console.log(result));
    }
    setIsRunning((prev) => !prev);
  };

  return (
    <div>
      {minutes}:{seconds}:{milliseconds}
      <button onClick={timerToggleHandler}>Toggle</button>
    </div>
  );
};

export default BestTimer;
