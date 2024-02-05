// libraries 
import { Dispatch, SetStateAction } from "react";

// utils 
import { sleep } from "./sleep";
import { Delay, ElementStates } from "../utils/constants";



export const displayColorChangeAtIndexes = async <T extends { state: ElementStates }>(
  
  currentArrayState: Array<T>,
  arrayStateSetter: Dispatch<SetStateAction<Array<T>>>,
  afterwardSleepTime: Delay = Delay.Medium,
  newElementState?: ElementStates,
  ...indexesToChange: Array<number>
  
): Promise<void> => {
  
  if (newElementState) {
    indexesToChange.forEach(
      (index) => {
        currentArrayState[index].state = newElementState;
      }
    );
  };
  
  arrayStateSetter([...currentArrayState]);
  
  await sleep(afterwardSleepTime);
};
