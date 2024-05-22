import { ElementColors } from "../utils/constants";
import { ElementData } from "../utils/element-data";



export class Queue<T> {
  private snapshot: Array<ElementData<T | undefined>>;
  private history: Array<typeof this.snapshot>;
  private sizeLimit: number;
  
  constructor(sizeLimit: number, fromArray: Array<ElementData<T | undefined>> = []) {
    if (sizeLimit < 1) {
      throw new Error("Incorrect maximum size value");
    };          
    this.sizeLimit = sizeLimit;
    
    if (fromArray.length > 0) {
      this.snapshot = [...fromArray];
    } else {
      this.snapshot = Array.from(
        { length: sizeLimit },
        () => new ElementData<T | undefined>(undefined)
      );  
    };
    
    this.history = [];
  };  
  
  toArray(): Array<ElementData<T | undefined>> {
    return this.snapshot.map(
      (element) => new ElementData<T | undefined>(
        element.value, 
        element.color,
        element.isHead,
        element.isTail,
        element.valueAbove,
        element.valueBelow,
      )
    );
  };
  
  private save(): void {
    this.history.push(this.toArray());
  };
  
  private discard(): void {
    this.history = [];
  };  
  
  private headIndex(): number {
    return this.snapshot.findIndex(
      (element) => element.value !== undefined
    );  
  };
  
  private headElement(): ElementData<T | undefined> | undefined {
    return this.snapshot[this.headIndex()];
  };
  
  private followingHeadElement(): ElementData<T | undefined> | undefined {
    return this.snapshot[this.headIndex() + 1];
  };  
  
  private tailIndex(): number {
    return this.snapshot.findLastIndex(
      (element) => element.value !== undefined
    );
  };
  
  private tailElement(): ElementData<T | undefined> | undefined {
    return this.snapshot[this.tailIndex()];
  };
  
  private followingTailElement(): ElementData<T | undefined> | undefined {
    return this.snapshot[this.tailIndex() + 1];
  };
  
  private size(): number {
    return (this.headIndex() === -1) ? 0 : (this.tailIndex() - this.headIndex() + 1);
  };
  
  private isEmpty(): boolean {
    return this.size() === 0;
  };  
  
  clear(): typeof this.history {
    this.discard();
    this.snapshot = Array.from(
      { length: this.sizeLimit },
      () => new ElementData<T | undefined>(undefined)
    );  
    this.save();
    return this.history;
  };  
  
  enqueue(value: T): typeof this.history {
    
    this.discard();
    
    if (this.tailIndex() === this.sizeLimit - 1) {
      throw new Error("Maximum size exceeded");
    };
    
    if (this.isEmpty()) {
      this.snapshot[0] = new ElementData<T>(value, ElementColors.Modified, true, true);
    } else {
      this.tailElement()!.isTail = false;
      this.followingTailElement()!.isTail = true;
      this.followingTailElement()!.color = ElementColors.Modified;
      this.followingTailElement()!.value = value;   // changes position of the tail
    };
    this.save();
    
    this.tailElement()!.color = ElementColors.Default;
    this.save();
    
    return this.history;
  };
  
  dequeue(): typeof this.history {
    
    this.discard();
    
    if (this.isEmpty()) {
      throw new Error("Queue is empty");
    };
    
    this.headElement()!.isHead = false;
    this.headElement()!.color = ElementColors.Changing;
    
    if (this.size() === 1) {
      this.headElement()!.isTail = false;
    } else {
      this.followingHeadElement()!.isHead = true;
    };    
    this.save();
    
    this.headElement()!.color = ElementColors.Default;
    this.headElement()!.value = undefined;   // changes position of the head
    this.save();
    
    return this.history
  };
};
