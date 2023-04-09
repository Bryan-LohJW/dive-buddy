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
  const [currentRep, setCurrentRep] = useState<"Ventilate" | "Hold">(
    setsTime.length % 2 === 0 ? "Ventilate" : "Hold"
  );

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
              setCurrentRep((prev) =>
                prev === "Ventilate" ? "Hold" : "Ventilate"
              );
            }
          } else {
            setIsRunning(false);
            setRepTime(setsTime[0] != undefined ? setsTime[0] : 100);
            setRep(0);
            setCurrentRep(setsTime.length % 2 === 0 ? "Ventilate" : "Hold");
            onComplete();
          }
        }
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, onComplete, rep, repTime, setsTime]);

  const skipVentilateHandler = () => {
    if (!isRunning) {
      setRepTime(setsTime[(rep + 1) % 2] || 0);
      setRep((prev) => (prev + 1) % 2);
      setCurrentRep((rep + 1) % 2 === 0 ? "Ventilate" : "Hold");
    }
  };

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

  const [minutes, seconds] = formatTimeInMs(repTime);
  return (
    <div className="relative flex flex-col items-center justify-between">
      <p className="text-2xl">
        Cycle {rep + 1} of {setsTime.length}
      </p>
      <p className="text-2xl">{currentRep}</p>
      <p className="my-10 text-7xl">
        {minutes}:{seconds}
      </p>
      <div className="flex flex-col gap-5">
        <button
          className="h-10 w-36 rounded-md bg-primary text-xl"
          onClick={(e) => {
            e.stopPropagation();
            toggleRunningHandler();
          }}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        {!isRunning && (
          <button
            className="h-10 w-36 rounded-md bg-primary"
            onClick={skipVentilateHandler}
          >
            {rep % 2 === 0 ? "Skip Ventilate" : "Include Ventilate"}
          </button>
        )}
      </div>
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
