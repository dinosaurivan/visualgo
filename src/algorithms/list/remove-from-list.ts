import { Dispatch, SetStateAction } from "react";
import { ElementData } from "../../utils/element-data";
import { displayColorChangeAtIndexes } from "../../helpers/display-color-change-at-indexes";
import { Delay, ElementStates } from "../../utils/constants";

export const removeFromList = async (
  
  index: number,
  currentState: Array<ElementData<string>>,
  stateSetter: Dispatch<SetStateAction<Array<ElementData<string>>>>,
  
): Promise<void> => {
  
  for (let i = 0; i <= index; i++) {
    await displayColorChangeAtIndexes(currentState, stateSetter, Delay.Medium, ElementStates.Changing, i);
  };
  
  currentState[index].valueBelow = currentState[index].value;
  currentState[index].value = "";
  
  if (currentState.length >= 2) {
    if (index === 0) {
      currentState[0].isHead = false;
      currentState[1].isHead = true;
    };
    if (index === currentState.length-1) {
      currentState[currentState.length-1].isTail = false;
      currentState[currentState.length-2].isTail = true;      
    };
  };
  
  await displayColorChangeAtIndexes(currentState, stateSetter);
  
  currentState.splice(index, 1);
  
  const allIndexes = currentState.map(
    (element, index) => index
  );
  await displayColorChangeAtIndexes(currentState, stateSetter, Delay.None, ElementStates.Default, ...allIndexes);     
};
