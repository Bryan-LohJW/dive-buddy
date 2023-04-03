import { useEffect, useState } from "react";
import { formatTimeInMs } from "~/utils/timerFunctions";

type CountDownProps = {
  setsTime: number[];
  onComplete: () => void;
};

const CountDown = ({ setsTime, onComplete }: CountDownProps) => {
  const [rep, setRep] = useState(0);
  const [repTime, setRepTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (setsTime[0]) {
      setRep(0);
      setRepTime(setsTime[0]);
    }
  }, [setsTime]);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isRunning) {
      interval = setInterval(() => {
        setRepTime((prev) => prev - 10);
        if (repTime < 0) {
          if (rep + 1 < setsTime.length) {
            const nextTime = setsTime[rep + 1];
            if (nextTime != undefined) {
              setRepTime(nextTime);
              setRep((prev) => prev + 1);
            }
          } else {
            setIsRunning(false);
            setRepTime(setsTime[0] != undefined ? setsTime[0] : 100);
            setRep(0);
            onComplete();
          }
        }
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, onComplete, rep, repTime, setsTime]);

  const toggleRunningHandler = () => {
    if (isRunning) {
      if (setsTime[0]) {
        setRep(0);
        setRepTime(setsTime[0]);
        setIsRunning((prev) => !prev);
      }
    } else {
      setIsRunning((prev) => !prev);
    }
  };

  const [minutes, seconds, milliseconds] = formatTimeInMs(repTime);
  return (
    <div className="flex w-full flex-col">
      <p>
        Cycle {rep + 1} of {setsTime.length}
      </p>
      <p>
        {minutes}:{seconds}:{milliseconds}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleRunningHandler();
        }}
      >
        {isRunning ? "Stop" : "Start"}
      </button>
      <button
        onClick={() => {
          if (isRunning) {
            setRepTime(100);
          }
        }}
      >
        PushTimeDown
      </button>
    </div>
  );
};

export default CountDown;
