import { api } from "~/utils/api";
import Training from "./Training";
import { useState } from "react";
import { TrainingType } from "@prisma/client";

const Trainings = () => {
  const { data: recordData, status } = api.record.getLatest.useQuery();
  const [hasFirstVentilate, setHasFirstVentilate] = useState(false);

  if (status === "loading") return <div>Loading</div>;

  if (!recordData || status === "error") return <div>Error</div>;

  const typeEnums = TrainingType;

  return (
    <>
      <Training
        title={"CO2 Training"}
        description={"Train your lung capacity"}
        trainingType={typeEnums.CO2}
        record={recordData?.milliseconds}
        hasFirstVentilate={hasFirstVentilate}
      />
      <Training
        title={"O2 Training"}
        description={"Train your lung capacity"}
        trainingType={typeEnums.O2}
        record={recordData?.milliseconds}
        hasFirstVentilate={hasFirstVentilate}
      />
      <button onClick={() => setHasFirstVentilate((prev) => !prev)}>
        Toggle Ventilate
      </button>
    </>
  );
};

export default Trainings;