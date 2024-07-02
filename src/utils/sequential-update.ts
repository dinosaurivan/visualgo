// libraries 
import { Dispatch, SetStateAction } from "react";

// utils 
import sleep from "./sleep";
import { Delay } from "./constants";
import ElementData from "./element-data";



const sequentialUpdate = async <T>(
  
  steps: Array<Array<ElementData<T>>>, 
  stepSetter: Dispatch<SetStateAction<Array<ElementData<T>>>>,
  inProgressSetter: Dispatch<SetStateAction<boolean>>,
  componentIsMounted: () => boolean,
  
) => {
  
  let isFirstIteration = true;
  
  for (const step of steps) {
    
    await sleep(isFirstIteration ? Delay.None : Delay.Medium);
    isFirstIteration = false;
    
    if (componentIsMounted()) {
      stepSetter(step);
    };
  };
  
  inProgressSetter(false);
};

export default sequentialUpdate;
