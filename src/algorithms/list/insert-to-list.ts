// libraries 
import { Dispatch, SetStateAction } from "react";

// utils 
import { swap } from "../swap";
import { ElementData } from "../../utils/element-data";
import { Delay, ElementStates } from "../../utils/constants";
import { displayColorChangeAtIndexes } from "../../helpers/display-color-change-at-indexes";



export const insertToList = async (
  
  value: string,
  index: number,
  currentState: Array<ElementData<string>>,
  stateSetter: Dispatch<SetStateAction<Array<ElementData<string>>>>,
  
): Promise<void> => {
  
  if (currentState.length === 0) {
    currentState.push(new ElementData("", ElementStates.Modified, true, true, value));
    await displayColorChangeAtIndexes(currentState, stateSetter);
    currentState[0].value = value;
    currentState[0].valueAbove = undefined;
    await displayColorChangeAtIndexes(currentState, stateSetter);
    await displayColorChangeAtIndexes(currentState, stateSetter, Delay.None, ElementStates.Default, 0);
    return;
  };
  
  for (let i = 0; i < index; i++) {
    currentState[i].valueAbove = value;
    await displayColorChangeAtIndexes(currentState, stateSetter);
    currentState[i].valueAbove = undefined;
    await displayColorChangeAtIndexes(currentState, stateSetter, Delay.None, ElementStates.Changing, i);
  };
  
  currentState.push(new ElementData("", ElementStates.Modified, false, false, value));
  
  if (index === currentState.length-1) {
    currentState[index].isTail = true;
    currentState[index-1].isTail = false;
  } else {
    for (let i = currentState.length-1; i > index; i--) {
      swap(currentState, i, i-1, true);
    };
  };
  
  if (index === 0) {
    currentState[index].isHead = true;
    currentState[index+1].isHead = false;      
  };  
  
  await displayColorChangeAtIndexes(currentState, stateSetter);
  
  currentState[index].value = value;
  currentState[index].valueAbove = undefined;  
  
  await displayColorChangeAtIndexes(currentState, stateSetter, Delay.Medium, ElementStates.Modified, index); 
  
  const allIndexes = currentState.map(
    (element, index) => index
  );
  await displayColorChangeAtIndexes(currentState, stateSetter, Delay.None, ElementStates.Default, ...allIndexes);     
};
