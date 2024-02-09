import { Direction, ElementColors } from "../utils/constants";
import { ElementData } from "../utils/element-data";



export class NumbersArray {
  private snapshot: Array<ElementData<number>>;
  private history: Array<typeof this.snapshot>;
  
  constructor(fromArray: Array<ElementData<number>>) {
    this.snapshot = [...fromArray];
    this.history = [];
  };
  
  private save(): void {
    const deepCopy = this.snapshot.map(
      (element) => new ElementData<number>(
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
  
  private swap(from: number, to: number): void {
    const temp = this.snapshot[to];
    this.snapshot[to] = this.snapshot[from];
    this.snapshot[from] = temp;  
  };  
  
  refresh(length: number): typeof this.history {
    this.discard();
    if (length < 1) {
      throw new Error("Incorrect length value");
    };        
    this.snapshot = Array.from(
      { length },
      () => new ElementData<number>(Math.floor(1 + Math.random() * 100))
    );
    this.save();
    return this.history;
  };
  
  bubbleSort(direction: Direction): typeof this.history {
    
    this.discard();
    let lastUnsortedElementIndex = this.size() - 1;
    
    while (lastUnsortedElementIndex > 0) {
      
      for (let i = 0; i < lastUnsortedElementIndex; i++) {
        this.snapshot[i].color = ElementColors.Changing;
        this.snapshot[i+1].color = ElementColors.Changing;
        this.save();
        
        if (
          (
            direction === Direction.Ascending &&
            this.snapshot[i].value > this.snapshot[i+1].value
          ) || (
            direction === Direction.Descending &&
            this.snapshot[i].value < this.snapshot[i+1].value          
          )
        ) {
          this.swap(i, i+1);
          this.save();
        };        
        
        this.snapshot[i].color = ElementColors.Default;
      };
      
      this.snapshot[lastUnsortedElementIndex].color = ElementColors.Modified;
      lastUnsortedElementIndex--;
      this.save();
    };
    
    this.snapshot[0].color = ElementColors.Modified;
    this.save();
    
    this.snapshot.forEach(
      (element) => {
        element.color = ElementColors.Default;
      }
    );
    this.save();
    return this.history;
  };
  
  selectionSort(direction: Direction): typeof this.history {
    
    this.discard();
    
    for (let i = 0; i < this.size() - 1; i++) {
      this.snapshot[i].color = ElementColors.Changing;
      let indexOfExtremum = i;
      this.save();
      
      for (let j = i + 1; j < this.size(); j++) {
        this.snapshot[j].color = ElementColors.Selected;
        this.save();
        
        if (
          (
            direction === Direction.Ascending &&
            this.snapshot[j].value < this.snapshot[indexOfExtremum].value
          ) || (
            direction === Direction.Descending &&
            this.snapshot[j].value > this.snapshot[indexOfExtremum].value          
          )
        ) {
          if (indexOfExtremum !== i) {
            this.snapshot[indexOfExtremum].color = ElementColors.Default;
          };
          indexOfExtremum = j;
          this.snapshot[indexOfExtremum].color = ElementColors.Changing;
          this.save();
        };
        
        if (indexOfExtremum !== j) {
          this.snapshot[j].color = ElementColors.Default;
          if (j === this.size()-1) {
            this.save();
          };
        };
      };
      
      if (i !== indexOfExtremum) {
        this.swap(i, indexOfExtremum);
        this.save();
      };
      this.snapshot[indexOfExtremum].color = ElementColors.Default;
      this.snapshot[i].color = ElementColors.Modified;
      this.save();
    };
    
    this.snapshot[this.size()-1].color = ElementColors.Modified;
    this.save();
    
    this.snapshot.forEach(
      (element) => {
        element.color = ElementColors.Default;
      }
    );
    this.save();
    return this.history;
  };
};
