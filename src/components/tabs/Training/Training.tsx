import { useEffect, useState } from "react";
import { formatTimeInMs } from "~/utils/timerFunctions";
import CountDown from "./CountDown";
import { TrainingType } from "@prisma/client";
import { api } from "~/utils/api";

type TrainingProps = {
  title: string;
  description?: string;
  trainingType: TrainingType;
  record: number;
  hasFirstVentilate: boolean;
};

const trainingTypeEnum = TrainingType;

const Training = ({
  title,
  description,
  trainingType,
  record,
  hasFirstVentilate,
}: TrainingProps) => {
  const [isFull, setIsFull] = useState(false);
  const [setsTime, setSetsTime] = useState<number[]>([0]);
  const [totalTime, setTotalTime] = useState(0);

  const { mutate: uploadTraining } = api.training.create.useMutation();

  useEffect(() => {
    const sets = [];
    let time = 0;
    if (trainingType === trainingTypeEnum.O2) {
      const ventilateTime = 1000 * 60 * 2;
      let holdPercent = 0.5;
      for (let i = 0; i < 8; i++) {
        const holdTime = Math.floor(holdPercent * record);
        sets.push(ventilateTime);
        time += ventilateTime;
        sets.push(holdTime);
        time += holdTime;
        holdPercent += 0.5;
      }
    } else {
      const holdTime = Math.floor(record * 0.65);
      let ventilateTime = 1000 * 60 * 2;
      for (let i = 0; i < 8; i++) {
        sets.push(ventilateTime);
        time += ventilateTime;
        sets.push(holdTime);
        time += holdTime;
        ventilateTime -= 1000 * 15;
      }
    }

    if (!hasFirstVentilate) {
      const firstVentilate = sets.shift();
      time -= firstVentilate ? firstVentilate : 0;
    }
    setTotalTime(time);
    setSetsTime(sets);
  }, [hasFirstVentilate, record, trainingType]);

  const [minutes, seconds] = formatTimeInMs(totalTime);

  const transition = "transition-all duration-1000";
  return (
    <>
      <div className="h-6 w-full"></div>
      <div
        // todo: fix the expansion to the right to make it symmetrical
        className={`flex flex-col bg-cover bg-center ${
          isFull
            ? "fixed z-10 h-full w-full overflow-scroll px-5 py-10"
            : "mx-10 h-52  overflow-hidden rounded-lg border-2 border-black "
        }  ${
          trainingType === TrainingType.O2
            ? "bg-O2-training"
            : " bg-CO2-training"
        } ${transition}`}
        onClick={() => setIsFull(() => true)}
      >
        {isFull && (
          <button
            className="absolute left-3/4 top-0"
            onClick={(e) => {
              e.stopPropagation();
              setIsFull(() => false);
            }}
          >
            Close
          </button>
        )}
        <div className={`${isFull ? "h-0" : "flex-1"} ${transition}`}></div>
        <div
          className={`flex-1 border-2 border-blue-500 bg-black text-white ${
            isFull ? "opacity-80" : " opacity-60"
          } ${transition}`}
        >
          {/* todo: transition to center smoothly */}
          <div
            className={`w-fit ${
              isFull ? "mx-auto text-center" : ""
            } ${transition}`}
          >
            <h3 className="text-xl">{title}</h3>
            <p>
              {minutes}mins {seconds}s
            </p>
          </div>
          {isFull ? (
            <CountDown
              setsTime={setsTime}
              onComplete={() => {
                uploadTraining({
                  type: trainingType,
                  referenceMilliseconds: record,
                });
              }}
            />
          ) : (
            <p>{description}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Training;
