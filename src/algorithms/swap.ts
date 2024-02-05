export const swap = <T>(
  arr: Array<T>,
  from: number,
  to: number,
  inPlace: boolean
): Array<T> | void => {
  if (!inPlace) {
    const copy = [...arr];
    swap(copy, from, to, true);
    return copy;    
  };
  const temp = arr[to];
  arr[to] = arr[from];
  arr[from] = temp;  
};
