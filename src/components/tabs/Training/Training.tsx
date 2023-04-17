import { FC, useEffect, useState } from "react";
import { formatTimeInMs } from "~/utils/timerFunctions";
import CountDown from "./CountDown";
import { TrainingType } from "@prisma/client";
import { api } from "~/utils/api";
import { TbPlaystationX } from "react-icons/tb";
import { toast } from "react-hot-toast";
import Complete from "./Complete";

const trainingTypeEnum = TrainingType;

type SpacerProps = {
  height: string;
};

type CloseButtonProps = {
  closeFunction: () => void;
};

type SetTimeProps = {
  title: string;
  titleStyle: string;
  time: string;
  timeStyle: string;
  hasRecord: boolean;
};

type TrainingProps = {
  title: string;
  description?: string;
  trainingType: TrainingType;
  record: number;
};

const Spacer: FC<SpacerProps> = ({ height }) => {
  return <div className={`${height} w-full`}></div>;
};

const CloseButton: FC<CloseButtonProps> = ({ closeFunction }) => {
  return (
    <button
      className="absolute right-1 top-1"
      onClick={(e) => {
        e.stopPropagation();
        closeFunction();
      }}
    >
      <TbPlaystationX className="rounded-full bg-secondary text-3xl text-black" />
    </button>
  );
};

const SetTime: FC<SetTimeProps> = ({
  title,
  titleStyle,
  time,
  timeStyle,
  hasRecord,
}) => {
  return (
    <div className="mb-5">
      <h3 className={`${titleStyle}`}>{title}</h3>
      <p className={`${timeStyle}`}>
        Time - {time}{" "}
        {hasRecord ? `Time - ${time}` : `Log a record to start training`}
      </p>
    </div>
  );
};

const Training: FC<TrainingProps> = ({
  title,
  description,
  trainingType,
  record,
}) => {
  const [isFull, setIsFull] = useState(false);
  const [setsTime, setSetsTime] = useState<number[]>([0]);
  const [totalTime, setTotalTime] = useState(0);
  const [hasRecord, setHasRecord] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const { mutate: uploadTraining } = api.training.create.useMutation();

  useEffect(() => {
    setHasRecord(record !== 0);
  }, [record]);

  useEffect(() => {
    if (!hasRecord) return;
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
  }, [record, trainingType, hasRecord]);

  const onClickHandler = () => {
    if (hasRecord) {
      setIsFull(true);
    } else {
      toast("Log a record to start training", { position: "top-center" });
    }
  };

  const onTrainingComplete = () => {
    setIsComplete(true);
    uploadTraining({
      type: trainingType,
      referenceMilliseconds: record,
    });
  };

  const [minutes, seconds] = formatTimeInMs(totalTime);

  const transition = "transition-all duration-1000";
  return (
    <>
      <Spacer height={"h-6"} />
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
        onClick={onClickHandler}
      >
        {isFull && (
          <CloseButton
            closeFunction={() => {
              setIsFull(false);
            }}
          />
        )}
        <Spacer height={`${isFull ? "h-0" : "flex-1"} ${transition}`} />
        <div
          className={`h-fit flex-1 bg-black text-white ${
            isFull
              ? "absolute left-5 right-5 top-1/2 -translate-y-1/2 rounded-xl bg-opacity-80 py-5"
              : "bg-opacity-70 px-3"
          } ${transition}`}
        >
          <div
            className={`w-fit flex-shrink-0 ${
              isFull ? "mx-auto text-center" : ""
            } ${transition}`}
          >
            <div className="mb-5">
              <h3 className={`${isFull ? "text-4xl" : "text-xl"}`}>{title}</h3>
              {hasRecord && (
                <p className={`${isFull ? "text-xl" : "text-base"}`}>
                  Time - {minutes}:{seconds}
                </p>
              )}
              {!hasRecord && (
                <p className={`${isFull ? "text-xl" : "text-base"}`}>
                  Log a record to start training
                </p>
              )}
            </div>
          </div>
          {isFull ? (
            <CountDown setsTime={setsTime} onComplete={onTrainingComplete} />
          ) : (
            <p>{description}</p>
          )}
        </div>
      </div>
      {isComplete && (
        <Complete
          onClose={() => {
            setIsComplete(false);
          }}
        />
      )}
    </>
  );
};

export default Training;
