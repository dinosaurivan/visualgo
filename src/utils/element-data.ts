// utils 
import { ElementColors } from "./constants";



export class ElementData<T> {
  value: T;
  color: ElementColors;
  isHead: boolean;
  isTail: boolean;  
  valueAbove?: T;
  valueBelow?: T;
  
  constructor(
    value: T, 
    color: ElementColors = ElementColors.Default,
    isHead: boolean = false,
    isTail: boolean = false,      
    valueAbove?: T, 
    valueBelow?: T, 
  ) {
    this.value = value;
    this.color = color;
    this.isHead = isHead;
    this.isTail = isTail;
    this.valueAbove = valueAbove;
    this.valueBelow = valueBelow;
  };
};
