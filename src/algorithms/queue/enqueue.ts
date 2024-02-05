// libraries 
import { Dispatch, SetStateAction } from "react";

// utils 
import { ElementData } from "../../utils/element-data";
import { Delay, ElementStates } from "../../utils/constants";
import { displayColorChangeAtIndexes } from "../../helpers/display-color-change-at-indexes";
import { QueuePointers } from "../../utils/queue-pointers";



export const enqueue = async (
  
  value: string,
  { tail, size }: QueuePointers,
  currentState: Array<ElementData<string>>,
  stateSetter: Dispatch<SetStateAction<Array<ElementData<string>>>>,
  
): Promise<void> => {
  
  if (size === 0) {
    currentState[0].isTail = true;
    currentState[0].isHead = true;
    currentState[0].value = value;
  } else {
    currentState[tail].isTail = false;
    currentState[tail+1].isTail = true;
    currentState[tail+1].value = value;
  };
  
  await displayColorChangeAtIndexes(currentState, stateSetter, Delay.Medium, ElementStates.Modified, tail+1);
  await displayColorChangeAtIndexes(currentState, stateSetter, Delay.None, ElementStates.Default, tail+1);
};
