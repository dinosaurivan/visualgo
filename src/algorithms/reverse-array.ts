// libbraries 
import { Dispatch, SetStateAction } from "react";

// utils 
import { swap } from "./swap";
import { ElementData } from "../utils/element-data";
import { Delay, ElementStates } from "../utils/constants";
import { displayColorChangeAtIndexes } from "../helpers/display-color-change-at-indexes";



export const reverseArray = async (
  
  initialArray: Array<ElementData<string>>,
  stateSetter: Dispatch<SetStateAction<Array<ElementData<string>>>>
  
): Promise<void> => {
  
  const medianIndex = Math.ceil(initialArray.length / 2);
  
  for (let i = 0; i < medianIndex; i++) {
    
    const oppositeIndex = initialArray.length - 1 - i;
    
    await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.Medium, ElementStates.Changing, i, oppositeIndex);
    
    swap(initialArray, i, oppositeIndex, true);
    
    await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.Medium, ElementStates.Modified, i, oppositeIndex);
  };
  
  const allIndexes = initialArray.map(
    (element, index) => index
  );
  await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.None, ElementStates.Default, ...allIndexes);
};
