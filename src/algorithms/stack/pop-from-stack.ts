// libraries 
import { Dispatch, SetStateAction } from "react";

// utils 
import { ElementData } from "../../utils/element-data";
import { Delay, ElementStates } from "../../utils/constants";
import { displayColorChangeAtIndexes } from "../../helpers/display-color-change-at-indexes";



export const popFromStack = async (
  
  currentState: Array<ElementData<string>>,
  stateSetter: Dispatch<SetStateAction<Array<ElementData<string>>>>
  
): Promise<void> => {
  
  const { length } = currentState;
  
  currentState[length-1].isHead = false;
  if (length > 1) {
    currentState[length-2].isHead = true;
  };
  await displayColorChangeAtIndexes(currentState, stateSetter, Delay.Medium, ElementStates.Changing, length-1);
  
  currentState.pop();
  
  await displayColorChangeAtIndexes(currentState, stateSetter, Delay.None);
};
