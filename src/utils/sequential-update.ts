// libraries 
import { Dispatch, SetStateAction } from "react";

// utils 
import { sleep } from "./sleep";
import { Delay } from "./constants";
import { ElementData } from "./element-data";



export const sequentialUpdate = async <T>(
  
  history: Array<Array<ElementData<T>>>, 
  stateSetter: Dispatch<SetStateAction<Array<ElementData<T>>>>,
  inProgressSetter: Dispatch<SetStateAction<boolean>>,
  componentIsMounted: () => boolean,
  
) => {
  
  let isFirstIteration = true;
  
  for (const snapshot of history) {
    
    await sleep(isFirstIteration ? Delay.None : Delay.Medium);
    isFirstIteration = false;
    
    if (componentIsMounted()) {
      stateSetter(snapshot);
    };
  };
  
  inProgressSetter(false);
};
