import { ElementColors } from "../utils/constants";
import { ElementData } from "../utils/element-data";



export class Stack<T> {
  private snapshot: Array<ElementData<T>>;
  private history: Array<typeof this.snapshot>;
  
  constructor(fromArray: Array<ElementData<T>> = []) {
    this.snapshot = [...fromArray];
    this.history = [];
  };
  
  private save(): void {
    const deepCopy = this.snapshot.map(
      (element) => new ElementData<T>(
        element.value, 
        element.color,
        element.isHead,
        element.isTail,
        element.valueAbove,
        element.valueBelow,
      )
    );
    this.history.push(deepCopy);
  };
  
  private discard(): void {
    this.history = [];
  };
  
  private size(): number {
    return this.snapshot.length;
  };
  
  private isEmpty(): boolean {
    return this.size() === 0;
  };
  
  private peak(): ElementData<T> | undefined {
    return this.snapshot[this.size() - 1];
  };
  
  private subpeak(): ElementData<T> | undefined {
    return this.snapshot[this.size() - 2];
  };  
  
  clear(): typeof this.history {
    this.discard();
    this.snapshot = [];
    this.save();
    return this.history;
  };
  
  push(value: T): typeof this.history {
    
    this.discard();
    
    if (!this.isEmpty()) {
      this.peak()!.isHead = false;
    };    
    
    this.snapshot.push(new ElementData<T>(value, ElementColors.Modified, true));
    this.save();
    
    this.peak()!.color = ElementColors.Default;
    this.save();
    
    return this.history;
  };
  
  pop(): typeof this.history {
    
    this.discard();
    
    if (this.isEmpty()) {
      throw new Error("Stack is empty");
    };
    
    this.peak()!.isHead = false;
    this.peak()!.color = ElementColors.Changing;
    if (this.size() > 1) {
      this.subpeak()!.isHead = true;
    };
    this.save();
    
    this.snapshot.pop();
    this.save();
    
    return this.history;
  };
};
