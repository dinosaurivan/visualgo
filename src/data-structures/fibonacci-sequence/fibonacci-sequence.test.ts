// data structures
import { FibonacciSequence } from "./fibonacci-sequence";

// utils 
import { ElementColors } from "../../utils/constants";
import { ElementData } from "../../utils/element-data";



describe(
  "Fibonacci sequence calculation tests", () => {
    
    let fibonacciSequence: FibonacciSequence;
    
    beforeEach(
      () => {
        fibonacciSequence = new FibonacciSequence();
      }
    );
    
    test(
      "throws an error when element index is negative", () => {
        
        expect(
          () => {
            fibonacciSequence.getCalculationSteps(-1);
          }
        ).toThrow();
      }
    );    
    
    test(
      "returns correct steps sequence when index is 0", () => {
        
        const steps = fibonacciSequence.getCalculationSteps(0);
        expect(steps.length).toBe(2);
        
        expect(steps[0]).toEqual([
          new ElementData(0)
        ]);
        expect(steps[1]).toEqual([
          new ElementData(0)
        ]);
      }
    );
    
    test(
      "returns correct steps sequence when index is 1", () => {
        
        const steps = fibonacciSequence.getCalculationSteps(1);
        expect(steps.length).toBe(3);
        
        expect(steps[0]).toEqual([
          new ElementData(0)
        ]);
        expect(steps[1]).toEqual([
          new ElementData(0), 
          new ElementData(1)
        ]);
        expect(steps[2]).toEqual([
          new ElementData(0), 
          new ElementData(1)
        ]);
      }
    );
    
    test(
      "returns correct steps sequence when index is 2", () => {
        
        const steps = fibonacciSequence.getCalculationSteps(2);
        expect(steps.length).toBe(5);
        
        expect(steps[0]).toEqual([
          new ElementData(0)
        ]);
        expect(steps[1]).toEqual([
          new ElementData(0), 
          new ElementData(1)
        ]);
        expect(steps[2]).toEqual([
          new ElementData(0, ElementColors.Changing), 
          new ElementData(1, ElementColors.Changing)
        ]);
        expect(steps[3]).toEqual([
          new ElementData(0), 
          new ElementData(1),
          new ElementData(1, ElementColors.Modified)
        ]);
        expect(steps[4]).toEqual([
          new ElementData(0), 
          new ElementData(1),
          new ElementData(1)
        ]);                
      }
    );
    
    test(
      "returns correct steps sequence when index is 5", () => {
        
        const steps = fibonacciSequence.getCalculationSteps(5);
        expect(steps.length).toBe(11);
        
        expect(steps[0]).toEqual([
          new ElementData(0)
        ]);
        expect(steps[1]).toEqual([
          new ElementData(0), 
          new ElementData(1)
        ]);
        expect(steps[2]).toEqual([
          new ElementData(0, ElementColors.Changing), 
          new ElementData(1, ElementColors.Changing)
        ]);
        expect(steps[3]).toEqual([
          new ElementData(0), 
          new ElementData(1),
          new ElementData(1, ElementColors.Modified)
        ]);
        expect(steps[4]).toEqual([
          new ElementData(0), 
          new ElementData(1, ElementColors.Changing),
          new ElementData(1, ElementColors.Changing)          
        ]);            
        expect(steps[5]).toEqual([
          new ElementData(0), 
          new ElementData(1),
          new ElementData(1),
          new ElementData(2, ElementColors.Modified)          
        ]);            
        expect(steps[6]).toEqual([
          new ElementData(0), 
          new ElementData(1),
          new ElementData(1, ElementColors.Changing),
          new ElementData(2, ElementColors.Changing)                   
        ]);            
        expect(steps[7]).toEqual([
          new ElementData(0), 
          new ElementData(1),
          new ElementData(1),
          new ElementData(2),
          new ElementData(3, ElementColors.Modified)
        ]);            
        expect(steps[8]).toEqual([
          new ElementData(0), 
          new ElementData(1),
          new ElementData(1),
          new ElementData(2, ElementColors.Changing),
          new ElementData(3, ElementColors.Changing)          
        ]);            
        expect(steps[9]).toEqual([
          new ElementData(0),
          new ElementData(1),
          new ElementData(1),
          new ElementData(2),
          new ElementData(3),
          new ElementData(5, ElementColors.Modified)
        ]);            
        expect(steps[10]).toEqual([
          new ElementData(0),
          new ElementData(1),
          new ElementData(1),
          new ElementData(2),
          new ElementData(3),
          new ElementData(5)
        ]);            
      }
    );    
  }
);
