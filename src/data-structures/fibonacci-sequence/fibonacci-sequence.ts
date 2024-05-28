import { ElementColors } from "../../utils/constants";
import { ElementData } from "../../utils/element-data";



export class FibonacciSequence {
  private snapshot: Array<ElementData<number>> = [];
  private history: Array<typeof this.snapshot> = [];
  
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
  
  private peak(): ElementData<number> | undefined {
    return this.snapshot[this.size() - 1];
  };
  
  private subpeak(): ElementData<number> | undefined {
    return this.snapshot[this.size() - 2];
  };    
  
  private next(): number {
    if (this.isEmpty()) {
      return 0;
    };
    if (this.size() === 1) {
      return 1;
    };
    return this.peak()!.value + this.subpeak()!.value;
  };
  
  getCalculationSteps(index: number): typeof this.history {
    
    this.discard();
    
    if (index < 0) {
      throw new Error("Incorrect index value");
    };    
    
    for (let i = 0; i <= index; i++) {
      
      if (i < 2) {
        this.snapshot.push(new ElementData<number>(this.next()));
        this.save();        
      } else {        
        
        this.peak()!.color = ElementColors.Changing;
        this.subpeak()!.color = ElementColors.Changing;
        this.save();
        
        this.peak()!.color = ElementColors.Default;
        this.subpeak()!.color = ElementColors.Default;        
        this.snapshot.push(new ElementData<number>(this.next(), ElementColors.Modified));
        this.save();
      };
    };
    
    this.peak()!.color = ElementColors.Default;
    this.save();
    
    return this.history;
  };
};
