// libraries 
import { Dispatch, SetStateAction } from "react";

// utils 
import { ElementData } from "../../utils/element-data";
import { Delay, ElementStates } from "../../utils/constants";
import { displayColorChangeAtIndexes } from "../../helpers/display-color-change-at-indexes";



export const pushToStack = async (
  
  value: string,
  currentState: Array<ElementData<string>>,
  stateSetter: Dispatch<SetStateAction<Array<ElementData<string>>>>
  
): Promise<void> => {
  
  const { length } = currentState;
  
  if (length > 0) {
    currentState[length-1].isHead = false;
  };
  currentState.push(new ElementData(value, ElementStates.Modified, true));
  
  await displayColorChangeAtIndexes(currentState, stateSetter);
  await displayColorChangeAtIndexes(currentState, stateSetter, Delay.None, ElementStates.Default, length);
};
