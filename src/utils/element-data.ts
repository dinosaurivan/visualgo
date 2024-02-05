// utils 
import { ElementStates } from "./constants";



type ElementDataType<T> = {
  value: T,
  state: ElementStates,
  isHead: boolean,
  isTail: boolean,
  valueAbove?: string,
  valueBelow?: string,
};

export class ElementData<T> implements ElementDataType<T> {
  value: T;
  state: ElementStates;
  isHead: boolean;
  isTail: boolean;  
  valueAbove?: string;
  valueBelow?: string;
  constructor(
    value: T, 
    state: ElementStates = ElementStates.Default,
    isHead: boolean = false,
    isTail: boolean = false,      
    valueAbove?: string,
    valueBelow?: string,    
  ) {
    this.value = value;
    this.state = state;
    this.isHead = isHead;
    this.isTail = isTail;
    this.valueAbove = valueAbove;
    this.valueBelow = valueBelow;
  };
};
