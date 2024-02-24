import { ElementData } from "./element-data";
import { DEFAULT_ARRAY_SIZE } from "./constants";



export const randomNumbersArray = (size?: number) => {
  const result = Array.from(
    { length: size || DEFAULT_ARRAY_SIZE }, 
    () => new ElementData<number>(
      Math.floor(1 + Math.random() * 100)
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
        Math.floor(1 + Math.random() * 100)
      )
    )
  );
  result[0].isHead = true;
  result[result.length-1].isTail = true;
  return result;
};
