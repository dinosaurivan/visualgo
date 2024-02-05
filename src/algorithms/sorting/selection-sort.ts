import { Dispatch, SetStateAction } from "react";
import { Delay, Direction, ElementStates } from "../../utils/constants";
import { ElementData } from "../../utils/element-data";
import { swap } from "../swap";
import { displayColorChangeAtIndexes } from "../../helpers/display-color-change-at-indexes";

export const selectionSort = async (
  
  initialArray: Array<ElementData<number>>,
  stateSetter: Dispatch<SetStateAction<Array<ElementData<number>>>>,
  direction: Direction,
  
): Promise<void> => {
  
  const { length } = initialArray;

  for (let i = 0; i < length-1; i++) {
    
    await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.Medium, ElementStates.Changing, i);
    let indexOfExtremum = i;
    
    for (let j = i+1; j < length; j++) {
      
      await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.Medium, ElementStates.Selected, j);
      
      if (
        (
          direction === Direction.Ascending &&
          initialArray[j].value < initialArray[indexOfExtremum].value
        ) || (
          direction === Direction.Descending &&
          initialArray[j].value > initialArray[indexOfExtremum].value          
        )
      ) {
        if (indexOfExtremum !== i) {
          await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.None, ElementStates.Default, indexOfExtremum);
        };
        indexOfExtremum = j;
        await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.Medium, ElementStates.Changing, indexOfExtremum);
      };
      
      if (indexOfExtremum !== j) {
        const delay = j === length-1 ? Delay.Medium : Delay.None
        await displayColorChangeAtIndexes(initialArray, stateSetter, delay, ElementStates.Default, j);
      };
    };
    
    if (i !== indexOfExtremum) {
      swap(initialArray, i, indexOfExtremum, true);
      await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.Medium);
    };
    await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.None, ElementStates.Default, indexOfExtremum);
    await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.Medium, ElementStates.Modified, i);
  };
  
  await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.Medium, ElementStates.Modified, length-1);
  
  const allIndexes = initialArray.map(
    (element, index) => index
  );
  await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.None, ElementStates.Default, ...allIndexes);  
};
