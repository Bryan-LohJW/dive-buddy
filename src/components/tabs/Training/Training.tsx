import { useEffect, useState } from "react";
import { formatTimeInMs } from "~/utils/timerFunctions";
import CountDown from "./CountDown";
import { TrainingType } from "@prisma/client";
import { api } from "~/utils/api";
import { TbPlaystationX } from "react-icons/tb";

type TrainingProps = {
  title: string;
  description?: string;
  trainingType: TrainingType;
  record: number;
};

const trainingTypeEnum = TrainingType;

const Training = ({
  title,
  description,
  trainingType,
  record,
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

    setTotalTime(time);
    setSetsTime(sets);
  }, [record, trainingType]);

  const [minutes, seconds] = formatTimeInMs(totalTime);

  const transition = "transition-all duration-1000";
  return (
    <>
      <div className="h-6 w-full"></div>
      <div
        className={` box-border bg-cover bg-center ${
          isFull
            ? "absolute top-0 bottom-0 left-0 right-0 z-10 overflow-scroll px-5"
            : "mx-10 flex h-52 flex-col overflow-hidden rounded-lg  shadow-xl"
        }  ${
          trainingType === TrainingType.O2
            ? "bg-O2-training"
            : " bg-CO2-training"
        } ${transition}`}
        onClick={() => setIsFull(() => true)}
      >
        {isFull && (
          <button
            className="absolute right-1 top-1"
            onClick={(e) => {
              e.stopPropagation();
              setIsFull(() => false);
            }}
          >
            <TbPlaystationX className="rounded-full bg-secondary text-3xl text-black" />
          </button>
        )}
        <div className={`${isFull ? "h-0" : "flex-1"} ${transition}`}></div>
        <div
          className={`h-fit flex-1 bg-black text-white ${
            isFull
              ? "absolute left-5 right-5 top-1/2 -translate-y-1/2 rounded-xl bg-opacity-80 py-5"
              : "bg-opacity-70"
          } ${transition}`}
        >
          <div
            className={`w-fit flex-shrink-0 ${
              isFull ? "mx-auto text-center" : ""
            } ${transition}`}
          >
            <div className="mb-5">
              <h3 className={`${isFull ? "text-4xl" : "text-xl"}`}>{title}</h3>
              <p className={`${isFull ? "text-xl" : "text-base"}`}>
                Time - {minutes}:{seconds}
              </p>
            </div>
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
