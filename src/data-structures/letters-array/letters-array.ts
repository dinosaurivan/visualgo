import { ElementColors } from "../../utils/constants";
import { ElementData } from "../../utils/element-data";



export class LettersArray {
  private snapshot: Array<ElementData<string>>;
  private history: Array<typeof this.snapshot>;
  
  constructor(fromString: string) {
    this.snapshot = [...fromString].map(
      (letter) => new ElementData<string>(letter)
    );
    this.history = [];
  };
  
  private save(): void {
    const deepCopy = this.snapshot.map(
      (element) => new ElementData<string>(
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
  
  private medianIndex(): number {
    return Math.ceil(this.size() / 2);
  };
  
  private opposite(index: number): number {
    return this.size() - index - 1;
  };
  
  private swap(from: number, to: number): void {
    const temp = this.snapshot[to];
    this.snapshot[to] = this.snapshot[from];
    this.snapshot[from] = temp;  
  };
  
  getReversalSteps(): typeof this.history {
    
    this.discard();
    
    if (this.isEmpty()) {
      throw new Error("String is empty");
    };    
    
    this.save();
    
    for (let i = 0; i < this.medianIndex(); i++) {
      this.snapshot[i].color = ElementColors.Changing;
      this.snapshot[this.opposite(i)].color = ElementColors.Changing;
      this.save();
      if (i !== this.opposite(i)) {
        this.swap(i, this.opposite(i));
        this.save();
      };
      this.snapshot[i].color = ElementColors.Modified;
      this.snapshot[this.opposite(i)].color = ElementColors.Modified;
      this.save();      
    };
    
    this.snapshot.forEach(
      (element) => {
        element.color = ElementColors.Default;
      }
    );
    this.save();
    
    return this.history;
  };
};
