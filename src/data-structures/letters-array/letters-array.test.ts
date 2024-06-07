// data structures
import { LettersArray } from "./letters-array";

// utils
import { ElementColors } from "../../utils/constants";
import { ElementData } from "../../utils/element-data";



describe(
  "Letters array reversal tests", () => {    
    
    test(
      "throws an error when string is empty", () => {
        
        const lettersArray = new LettersArray("");
        expect(
          () => {
            lettersArray.getReversalSteps();
          }
        ).toThrow();
      }
    );
    
    test(
      "returns correct steps sequence for string of length 1", () => {
        
        const lettersArray = new LettersArray("1");
        
        const steps = lettersArray.getReversalSteps();
        expect(steps.length).toBe(4);
        
        expect(steps[0]).toEqual([
          new ElementData("1")
        ]);
        expect(steps[1]).toEqual([
          new ElementData("1", ElementColors.Changing)
        ]);
        expect(steps[2]).toEqual([
          new ElementData("1", ElementColors.Modified)
        ]);
        expect(steps[3]).toEqual([
          new ElementData("1")
        ]);
      }
    );
    
    test(
      "returns correct steps sequence for string of length 2", () => {
        
        const lettersArray = new LettersArray("23");
        
        const steps = lettersArray.getReversalSteps();
        expect(steps.length).toBe(5);
        
        expect(steps[0]).toEqual([
          new ElementData("2"),
          new ElementData("3")
        ]);
        expect(steps[1]).toEqual([
          new ElementData("2", ElementColors.Changing),
          new ElementData("3", ElementColors.Changing)
        ]);
        expect(steps[2]).toEqual([
          new ElementData("3", ElementColors.Changing),
          new ElementData("2", ElementColors.Changing)
        ]);
        expect(steps[3]).toEqual([
          new ElementData("3", ElementColors.Modified),
          new ElementData("2", ElementColors.Modified)
        ]);
        expect(steps[4]).toEqual([
          new ElementData("3"),
          new ElementData("2")
        ]);
      }
    );    
    
    test(
      "returns correct steps sequence for string of length 3", () => {
        
        const lettersArray = new LettersArray("456");
        
        const steps = lettersArray.getReversalSteps();
        expect(steps.length).toBe(7);
        
        expect(steps[0]).toEqual([
          new ElementData("4"),
          new ElementData("5"),
          new ElementData("6")
        ]);
        expect(steps[1]).toEqual([
          new ElementData("4", ElementColors.Changing),
          new ElementData("5"),
          new ElementData("6", ElementColors.Changing)
        ]);
        expect(steps[2]).toEqual([
          new ElementData("6", ElementColors.Changing),
          new ElementData("5"),
          new ElementData("4", ElementColors.Changing)
        ]);
        expect(steps[3]).toEqual([
          new ElementData("6", ElementColors.Modified),
          new ElementData("5"),
          new ElementData("4", ElementColors.Modified)
        ]);
        expect(steps[4]).toEqual([
          new ElementData("6", ElementColors.Modified),
          new ElementData("5", ElementColors.Changing),
          new ElementData("4", ElementColors.Modified)
        ]);
        expect(steps[5]).toEqual([
          new ElementData("6", ElementColors.Modified),
          new ElementData("5", ElementColors.Modified),
          new ElementData("4", ElementColors.Modified)
        ]);
        expect(steps[6]).toEqual([
          new ElementData("6"),
          new ElementData("5"),
          new ElementData("4")
        ]);
      }
    );        
    
    test(
      "returns correct steps sequence for string of length 4", () => {
        
        const lettersArray = new LettersArray("6789");
        
        const steps = lettersArray.getReversalSteps();
        expect(steps.length).toBe(8);
        
        expect(steps[0]).toEqual([
          new ElementData("6"),
          new ElementData("7"),
          new ElementData("8"),
          new ElementData("9")
        ]);
        expect(steps[1]).toEqual([
          new ElementData("6", ElementColors.Changing),
          new ElementData("7"),
          new ElementData("8"),
          new ElementData("9", ElementColors.Changing)
        ]);
        expect(steps[2]).toEqual([
          new ElementData("9", ElementColors.Changing),
          new ElementData("7"),
          new ElementData("8"),
          new ElementData("6", ElementColors.Changing)
        ]);
        expect(steps[3]).toEqual([
          new ElementData("9", ElementColors.Modified),
          new ElementData("7"),
          new ElementData("8"),
          new ElementData("6", ElementColors.Modified)
        ]);
        expect(steps[4]).toEqual([
          new ElementData("9", ElementColors.Modified),
          new ElementData("7", ElementColors.Changing),
          new ElementData("8", ElementColors.Changing),
          new ElementData("6", ElementColors.Modified)
        ]);
        expect(steps[5]).toEqual([
          new ElementData("9", ElementColors.Modified),
          new ElementData("8", ElementColors.Changing),
          new ElementData("7", ElementColors.Changing),
          new ElementData("6", ElementColors.Modified)
        ]);
        expect(steps[6]).toEqual([
          new ElementData("9", ElementColors.Modified),
          new ElementData("8", ElementColors.Modified),
          new ElementData("7", ElementColors.Modified),
          new ElementData("6", ElementColors.Modified)
        ]);
        expect(steps[7]).toEqual([
          new ElementData("9"),
          new ElementData("8"),
          new ElementData("7"),
          new ElementData("6")
        ]);
      }
    );        
    
    test(
      "returns correct steps sequence for string of length 5", () => {
        
        const lettersArray = new LettersArray("12345");
        
        const steps = lettersArray.getReversalSteps();
        expect(steps.length).toBe(10);
        
        expect(steps[0]).toEqual([
          new ElementData("1"),
          new ElementData("2"),
          new ElementData("3"),
          new ElementData("4"),
          new ElementData("5")
        ]);
        expect(steps[1]).toEqual([
          new ElementData("1", ElementColors.Changing),
          new ElementData("2"),
          new ElementData("3"),
          new ElementData("4"),
          new ElementData("5", ElementColors.Changing)
        ]);
        expect(steps[2]).toEqual([
          new ElementData("5", ElementColors.Changing),
          new ElementData("2"),
          new ElementData("3"),
          new ElementData("4"),
          new ElementData("1", ElementColors.Changing)
        ]);
        expect(steps[3]).toEqual([
          new ElementData("5", ElementColors.Modified),
          new ElementData("2"),
          new ElementData("3"),
          new ElementData("4"),
          new ElementData("1", ElementColors.Modified)
        ]);
        expect(steps[4]).toEqual([
          new ElementData("5", ElementColors.Modified),
          new ElementData("2", ElementColors.Changing),
          new ElementData("3"),
          new ElementData("4", ElementColors.Changing),
          new ElementData("1", ElementColors.Modified)
        ]);
        expect(steps[5]).toEqual([
          new ElementData("5", ElementColors.Modified),
          new ElementData("4", ElementColors.Changing),
          new ElementData("3"),
          new ElementData("2", ElementColors.Changing),
          new ElementData("1", ElementColors.Modified)
        ]);
        expect(steps[6]).toEqual([
          new ElementData("5", ElementColors.Modified),
          new ElementData("4", ElementColors.Modified),
          new ElementData("3"),
          new ElementData("2", ElementColors.Modified),
          new ElementData("1", ElementColors.Modified)
        ]);
        expect(steps[7]).toEqual([
          new ElementData("5", ElementColors.Modified),
          new ElementData("4", ElementColors.Modified),
          new ElementData("3", ElementColors.Changing),
          new ElementData("2", ElementColors.Modified),
          new ElementData("1", ElementColors.Modified)
        ]);
        expect(steps[8]).toEqual([
          new ElementData("5", ElementColors.Modified),
          new ElementData("4", ElementColors.Modified),
          new ElementData("3", ElementColors.Modified),
          new ElementData("2", ElementColors.Modified),
          new ElementData("1", ElementColors.Modified)
        ]);
        expect(steps[9]).toEqual([
          new ElementData("5"),
          new ElementData("4"),
          new ElementData("3"),
          new ElementData("2"),
          new ElementData("1")
        ]);
      }
    );        
  }
);
