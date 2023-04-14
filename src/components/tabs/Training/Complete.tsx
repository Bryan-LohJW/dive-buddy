import { type FC, useEffect, useState } from "react";
import Image from "next/image";
import diveBuddyIcon from "/public/assets/dive-logo.png";

interface CompleteProps {
  onClose: () => void;
}

const Complete: FC<CompleteProps> = ({ onClose }) => {
  const [positionClass, setPositionClass] = useState("top-full bottom-0");
  const [close, setClose] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPositionClass("top-0 bottom-0");
    }, 400);
  }, []);

  const startClose = () => {
    setClose(true);
    setPositionClass("top-0 bottom-full");
  };

  const closeHandler = () => {
    if (close) {
      onClose();
    }
  };

  return (
    <div
      className={`absolute left-0 right-0 z-20 overflow-hidden bg-black bg-opacity-50 transition-all duration-1000 ${positionClass}`}
      onClick={startClose}
      onTransitionEnd={closeHandler}
    >
      <div className="absolute top-1/4 bottom-1/4 left-0 right-0 overflow-hidden rounded-md bg-secondary">
        <Image
          alt="dive buddy"
          src={diveBuddyIcon}
          className="absolute top-1/3 left-1/2 w-72 -translate-y-1/2 -translate-x-1/2"
        />
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center bg-primary py-6 font-semibold text-secondary">
          <p className="text-xl">Training Completed, Well Done</p>
          <p>Come back tomorrow for another session</p>
        </div>
      </div>
    </div>
  );
};

export default Complete;
