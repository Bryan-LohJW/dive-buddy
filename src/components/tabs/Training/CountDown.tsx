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
  const [currentRep, setCurrentRep] = useState<"Breathe" | "Hold">(
    setsTime.length % 2 === 0 ? "Breathe" : "Hold"
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
                prev === "Breathe" ? "Hold" : "Breathe"
              );
            }
          } else {
            setIsRunning(false);
            setRepTime(setsTime[0] != undefined ? setsTime[0] : 100);
            setRep(0);
            setCurrentRep(setsTime.length % 2 === 0 ? "Breathe" : "Hold");
            onComplete();
          }
        }
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, onComplete, rep, repTime, setsTime]);

  const skipBreatheHandler = () => {
    if (!isRunning) {
      setRepTime(setsTime[(rep + 1) % 2] || 0);
      setRep((prev) => (prev + 1) % 2);
      setCurrentRep((rep + 1) % 2 === 0 ? "Breathe" : "Hold");
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

  const percentageOfRepDone = (repTime / (setsTime[rep] || 1)) * 100;

  const [minutes, seconds] = formatTimeInMs(repTime);
  return (
    <div className="relative flex flex-col items-center justify-between">
      <p className="text-2xl">
        Cycle {rep + 1} of {setsTime.length}
      </p>
      <p className="text-2xl">{currentRep}</p>
      <svg viewBox="0 0 36 36" className="my-5 h-full w-2/3">
        <path
          d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          className="fill-none stroke-gray-300 stroke-2"
        />
        {
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            stroke-dasharray={`${percentageOfRepDone}, 100`}
            strokeLinecap="round"
            className={`"transition-all ease-linear" fill-none 
                  stroke-primary stroke-2
              `}
          />
        }
        <text
          x={"7.25"}
          y="20.75"
          textAnchor="left"
          className="fill-white text-[8px]"
        >
          {`${minutes || "00"}:${seconds || "00"}`}
        </text>
      </svg>
      <div className="flex flex-col gap-5">
        <button
          className="h-10 w-40 rounded-md bg-primary text-xl"
          onClick={(e) => {
            e.stopPropagation();
            toggleRunningHandler();
          }}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        {!isRunning && (
          <button
            className="h-20 w-40 rounded-md bg-secondary text-xl text-primary"
            onClick={skipBreatheHandler}
          >
            {rep % 2 === 0 ? "Already Breathing?" : "I Need To Breathe"}
          </button>
        )}
      </div>
    </div>
  );
};

export default CountDown;
