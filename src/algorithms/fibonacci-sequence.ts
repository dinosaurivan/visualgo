// libraries 
import { Dispatch, SetStateAction } from "react";

// utils 
import { ElementData } from "../utils/element-data";
import { Delay, ElementStates } from "../utils/constants";
import { displayColorChangeAtIndexes } from "../helpers/display-color-change-at-indexes";



export const fibonacciSequence = async (
  
  index: number,
  stateSetter: Dispatch<SetStateAction<Array<ElementData<number>>>>
  
): Promise<void> => {
  
  const sequence: Array<ElementData<number>> = [];
  
  for (let i = 0; i <= index; i++) {
    
    if (i === 0 || i === 1) {
      
      sequence.push(new ElementData(1));
      await displayColorChangeAtIndexes(sequence, stateSetter);
      
    } else {
      
      await displayColorChangeAtIndexes(sequence, stateSetter, Delay.Medium, ElementStates.Changing, i-1, i-2);
      
      sequence.push(
        new ElementData(
          sequence[i-1].value + sequence[i-2].value,
          ElementStates.Modified
        )
      );
      
      await displayColorChangeAtIndexes(sequence, stateSetter, Delay.Medium, ElementStates.Default, i-1, i-2);
    };
  };
  
  const { length } = sequence;
  await displayColorChangeAtIndexes(sequence, stateSetter, Delay.None, ElementStates.Default, length-1);
};
