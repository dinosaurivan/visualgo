// libraries 
import { Dispatch, SetStateAction } from "react";

// utils 
import { ElementData } from "../../utils/element-data";
import { Delay, ElementStates } from "../../utils/constants";
import { displayColorChangeAtIndexes } from "../../helpers/display-color-change-at-indexes";
import { QueuePointers } from "../../utils/queue-pointers";



export const dequeue = async (
  
  { head, size }: QueuePointers,
  currentState: Array<ElementData<string>>,
  stateSetter: Dispatch<SetStateAction<Array<ElementData<string>>>>,
  
): Promise<void> => {
  
  currentState[head].isHead = false;
  
  if (size === 1) {
    currentState[head].isTail = false;
  } else {
    currentState[head+1].isHead = true;
  };
  
  await displayColorChangeAtIndexes(currentState, stateSetter, Delay.Medium, ElementStates.Changing, head);
  currentState[head].value = "";
  await displayColorChangeAtIndexes(currentState, stateSetter, Delay.None, ElementStates.Default, head);
};
