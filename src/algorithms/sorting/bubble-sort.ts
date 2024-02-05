import { Dispatch, SetStateAction } from "react";
import { Delay, Direction, ElementStates } from "../../utils/constants";
import { ElementData } from "../../utils/element-data";
import { swap } from "../swap";
import { displayColorChangeAtIndexes } from "../../helpers/display-color-change-at-indexes";

export const bubbleSort = async (
  
  initialArray: Array<ElementData<number>>,
  stateSetter: Dispatch<SetStateAction<Array<ElementData<number>>>>,
  direction: Direction,
  
): Promise<void> => {
  
  let lastUnsortedElementIndex = initialArray.length-1;
  
  while (lastUnsortedElementIndex > 0) {
    
    for (let i = 0; i < lastUnsortedElementIndex; i++) {
      
      await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.None, ElementStates.Changing, i);
      await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.Medium, ElementStates.Changing, i+1);
      
      if (
        (
          direction === Direction.Ascending &&
          initialArray[i].value > initialArray[i+1].value
        ) || (
          direction === Direction.Descending &&
          initialArray[i].value < initialArray[i+1].value          
        )
      ) {
        swap(initialArray, i, i+1, true);
        await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.Medium);
      };
      
      await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.None, ElementStates.Default, i);
    };
    
    await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.Medium, ElementStates.Modified, lastUnsortedElementIndex);
    lastUnsortedElementIndex--;
  };
  
  await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.Medium, ElementStates.Modified, 0);
  
  const allIndexes = initialArray.map(
    (element, index) => index
  );
  await displayColorChangeAtIndexes(initialArray, stateSetter, Delay.None, ElementStates.Default, ...allIndexes);  
};
