import { ElementData } from "./element-data";
import { DEFAULT_ARRAY_SIZE, MAX_ARRAY_VALUE, MIN_ARRAY_VALUE } from "./constants";



export const randomNumbersArray = (size?: number) => {
  const result = Array.from(
    { length: size || DEFAULT_ARRAY_SIZE }, 
    () => new ElementData<number>(
      Math.floor(MIN_ARRAY_VALUE + Math.random() * MAX_ARRAY_VALUE)
    )
  );
  result[0].isHead = true;
  result[result.length-1].isTail = true;
  return result;
};



export const randomStringsArray = (size?: number) => {
  const result = Array.from(
    { length: size || DEFAULT_ARRAY_SIZE }, 
    () => new ElementData<string>(
      String(
        Math.floor(MIN_ARRAY_VALUE + Math.random() * MAX_ARRAY_VALUE)
      )
    )
  );
  result[0].isHead = true;
  result[result.length-1].isTail = true;
  return result;
};
