// data structures
import NumbersArray from "./numbers-array";

// utils
import ElementData from "../../utils/element-data";
import { Direction, ElementColors } from "../../utils/constants";



describe(
  "Numbers array sorting tests", () => {
    
    describe(
      "Bubble sorting algoritm tests", () => {
        
        test(
          "throws an error upon bubble-sorting an empty array", () => {
            
            const numbersArray = new NumbersArray([]);
            
            expect(() => {
              numbersArray.getBubbleSortSteps(Direction.Ascending);
            }).toThrow();        
            expect(() => {
              numbersArray.getBubbleSortSteps(Direction.Descending);
            }).toThrow();                  
          }
        );
        
        test(
          "returns correct steps sequence upon bubble-sorting 1-element array in ascending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(49)
            ]);
            
            const steps = numbersArray.getBubbleSortSteps(Direction.Ascending);
            expect(steps.length).toBe(2);
            
            expect(steps[0]).toEqual([
              new ElementData(49, ElementColors.Modified)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(49)
            ]);
          }
        );
        
        test(
          "returns correct steps sequence upon bubble-sorting 1-element array in descending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(51)
            ]);
            
            const steps = numbersArray.getBubbleSortSteps(Direction.Descending);
            expect(steps.length).toBe(2);
            
            expect(steps[0]).toEqual([
              new ElementData(51, ElementColors.Modified)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(51)
            ]);
          }
        );        
        
        test(
          "returns correct steps sequence upon bubble-sorting already-sorted 2-elements array in ascending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(40), 
              new ElementData(60)
            ]);
            
            const steps = numbersArray.getBubbleSortSteps(Direction.Ascending);
            expect(steps.length).toBe(4);
            
            expect(steps[0]).toEqual([
              new ElementData(40, ElementColors.Changing),
              new ElementData(60, ElementColors.Changing)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(40),
              new ElementData(60, ElementColors.Modified)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(40, ElementColors.Modified),
              new ElementData(60, ElementColors.Modified)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(40),
              new ElementData(60)
            ]);
          }
        );
        
        test(
          "returns correct steps sequence upon bubble-sorting yet-unsorted 2-elements array in ascending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(70), 
              new ElementData(30)
            ]);
            
            const steps = numbersArray.getBubbleSortSteps(Direction.Ascending);
            expect(steps.length).toBe(5);
            
            expect(steps[0]).toEqual([
              new ElementData(70, ElementColors.Changing),
              new ElementData(30, ElementColors.Changing)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(30, ElementColors.Changing),
              new ElementData(70, ElementColors.Changing)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(30),
              new ElementData(70, ElementColors.Modified)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(30, ElementColors.Modified),
              new ElementData(70, ElementColors.Modified)
            ]);            
            expect(steps[4]).toEqual([
              new ElementData(30),
              new ElementData(70)
            ]);            
          }
        );
        
        test(
          "returns correct steps sequence upon bubble-sorting already-sorted 2-elements array in descending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(80), 
              new ElementData(20)
            ]);
            
            const steps = numbersArray.getBubbleSortSteps(Direction.Descending);
            expect(steps.length).toBe(4);
            
            expect(steps[0]).toEqual([
              new ElementData(80, ElementColors.Changing),
              new ElementData(20, ElementColors.Changing)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(80),
              new ElementData(20, ElementColors.Modified)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(80, ElementColors.Modified),
              new ElementData(20, ElementColors.Modified)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(80),
              new ElementData(20)
            ]);
          }
        );
        
        test(
          "returns correct steps sequence upon bubble-sorting yet-unsorted 2-elements array in descending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(10), 
              new ElementData(90)
            ]);
            
            const steps = numbersArray.getBubbleSortSteps(Direction.Descending);
            expect(steps.length).toBe(5);
            
            expect(steps[0]).toEqual([
              new ElementData(10, ElementColors.Changing),
              new ElementData(90, ElementColors.Changing)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(90, ElementColors.Changing),
              new ElementData(10, ElementColors.Changing)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(90),
              new ElementData(10, ElementColors.Modified)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(90, ElementColors.Modified),
              new ElementData(10, ElementColors.Modified)
            ]);            
            expect(steps[4]).toEqual([
              new ElementData(90),
              new ElementData(10)
            ]);            
          }
        );
        
        test(
          "returns correct steps sequence upon bubble-sorting already-sorted 3-elements array in ascending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(33), 
              new ElementData(66),
              new ElementData(99)
            ]);
            
            const steps = numbersArray.getBubbleSortSteps(Direction.Ascending);
            expect(steps.length).toBe(7);            
            
            expect(steps[0]).toEqual([
              new ElementData(33, ElementColors.Changing),
              new ElementData(66, ElementColors.Changing),
              new ElementData(99)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(33),
              new ElementData(66, ElementColors.Changing),
              new ElementData(99, ElementColors.Changing)
            ]);            
            expect(steps[2]).toEqual([
              new ElementData(33),
              new ElementData(66),
              new ElementData(99, ElementColors.Modified)
            ]);            
            expect(steps[3]).toEqual([
              new ElementData(33, ElementColors.Changing),
              new ElementData(66, ElementColors.Changing),
              new ElementData(99, ElementColors.Modified)
            ]);            
            expect(steps[4]).toEqual([
              new ElementData(33),
              new ElementData(66, ElementColors.Modified),
              new ElementData(99, ElementColors.Modified)
            ]);            
            expect(steps[5]).toEqual([
              new ElementData(33, ElementColors.Modified),
              new ElementData(66, ElementColors.Modified),
              new ElementData(99, ElementColors.Modified)
            ]);            
            expect(steps[6]).toEqual([
              new ElementData(33),
              new ElementData(66),
              new ElementData(99)
            ]);            
          }
        ); 
        
        test(
          "returns correct steps sequence upon bubble-sorting yet-unsorted 3-elements array in ascending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(30), 
              new ElementData(20),
              new ElementData(10)
            ]);
            
            const steps = numbersArray.getBubbleSortSteps(Direction.Ascending);
            expect(steps.length).toBe(10);    
            
            expect(steps[0]).toEqual([
              new ElementData(30, ElementColors.Changing),
              new ElementData(20, ElementColors.Changing),
              new ElementData(10)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(20, ElementColors.Changing),
              new ElementData(30, ElementColors.Changing), 
              new ElementData(10)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(20),
              new ElementData(30, ElementColors.Changing), 
              new ElementData(10, ElementColors.Changing)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(20),
              new ElementData(10, ElementColors.Changing),
              new ElementData(30, ElementColors.Changing) 
            ]);
            expect(steps[4]).toEqual([
              new ElementData(20),
              new ElementData(10),
              new ElementData(30, ElementColors.Modified) 
            ]);
            expect(steps[5]).toEqual([
              new ElementData(20, ElementColors.Changing),
              new ElementData(10, ElementColors.Changing),
              new ElementData(30, ElementColors.Modified) 
            ]);
            expect(steps[6]).toEqual([
              new ElementData(10, ElementColors.Changing),
              new ElementData(20, ElementColors.Changing),
              new ElementData(30, ElementColors.Modified)
            ]);
            expect(steps[7]).toEqual([
              new ElementData(10),
              new ElementData(20, ElementColors.Modified),
              new ElementData(30, ElementColors.Modified)
            ]);
            expect(steps[8]).toEqual([
              new ElementData(10, ElementColors.Modified),
              new ElementData(20, ElementColors.Modified),
              new ElementData(30, ElementColors.Modified)
            ]);
            expect(steps[9]).toEqual([
              new ElementData(10),
              new ElementData(20),
              new ElementData(30)
            ]);
          }
        );
        
        test(
          "returns correct steps sequence upon bubble-sorting already-sorted 3-elements array in descending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(60), 
              new ElementData(50),
              new ElementData(40)
            ]);
            
            const steps = numbersArray.getBubbleSortSteps(Direction.Descending);
            expect(steps.length).toBe(7);            
            
            expect(steps[0]).toEqual([
              new ElementData(60, ElementColors.Changing),
              new ElementData(50, ElementColors.Changing),
              new ElementData(40)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(60),
              new ElementData(50, ElementColors.Changing),
              new ElementData(40, ElementColors.Changing)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(60),
              new ElementData(50),
              new ElementData(40, ElementColors.Modified)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(60, ElementColors.Changing),
              new ElementData(50, ElementColors.Changing),
              new ElementData(40, ElementColors.Modified)
            ]);
            expect(steps[4]).toEqual([
              new ElementData(60),
              new ElementData(50, ElementColors.Modified),
              new ElementData(40, ElementColors.Modified)
            ]);
            expect(steps[5]).toEqual([
              new ElementData(60, ElementColors.Modified),
              new ElementData(50, ElementColors.Modified),
              new ElementData(40, ElementColors.Modified)
            ]);
            expect(steps[6]).toEqual([
              new ElementData(60),
              new ElementData(50),
              new ElementData(40)
            ]);
          }
        );
        
        test(
          "returns correct steps sequence upon bubble-sorting yet-unsorted 3-elements array in descending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(70), 
              new ElementData(80),
              new ElementData(90)
            ]);
            
            const steps = numbersArray.getBubbleSortSteps(Direction.Descending);
            expect(steps.length).toBe(10);    
            
            expect(steps[0]).toEqual([
              new ElementData(70, ElementColors.Changing),
              new ElementData(80, ElementColors.Changing),
              new ElementData(90)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(80, ElementColors.Changing),
              new ElementData(70, ElementColors.Changing),
              new ElementData(90)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(80),
              new ElementData(70, ElementColors.Changing),
              new ElementData(90, ElementColors.Changing)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(80),
              new ElementData(90, ElementColors.Changing),
              new ElementData(70, ElementColors.Changing)
            ]);
            expect(steps[4]).toEqual([
              new ElementData(80),
              new ElementData(90),
              new ElementData(70, ElementColors.Modified)
            ]);
            expect(steps[5]).toEqual([
              new ElementData(80, ElementColors.Changing),
              new ElementData(90, ElementColors.Changing),
              new ElementData(70, ElementColors.Modified)
            ]);
            expect(steps[6]).toEqual([
              new ElementData(90, ElementColors.Changing),
              new ElementData(80, ElementColors.Changing),
              new ElementData(70, ElementColors.Modified)
            ]);
            expect(steps[7]).toEqual([
              new ElementData(90),
              new ElementData(80, ElementColors.Modified),
              new ElementData(70, ElementColors.Modified)
            ]);
            expect(steps[8]).toEqual([
              new ElementData(90, ElementColors.Modified),
              new ElementData(80, ElementColors.Modified),
              new ElementData(70, ElementColors.Modified)
            ]);
            expect(steps[9]).toEqual([
              new ElementData(90),
              new ElementData(80),
              new ElementData(70)
            ]);
          }
        ); 
      }
    ); 
    
    describe(
      "Selection sorting algoritm tests", () => {
        
        test(
          "throws an error upon selection-sorting an empty array", () => {
            
            const numbersArray = new NumbersArray([]);
            
            expect(() => {
              numbersArray.getSelectionSortSteps(Direction.Ascending);
            }).toThrow();        
            expect(() => {
              numbersArray.getSelectionSortSteps(Direction.Descending);
            }).toThrow();                  
          }
        );
        
        test(
          "returns correct steps sequence upon selection-sorting 1-element array in ascending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(42)
            ]);
            
            const steps = numbersArray.getSelectionSortSteps(Direction.Ascending);
            expect(steps.length).toBe(2);
            
            expect(steps[0]).toEqual([
              new ElementData(42, ElementColors.Modified)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(42)
            ]);
          }
        );
        
        test(
          "returns correct steps sequence upon selection-sorting 1-element array in descending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(69)
            ]);
            
            const steps = numbersArray.getSelectionSortSteps(Direction.Descending);
            expect(steps.length).toBe(2);
            
            expect(steps[0]).toEqual([
              new ElementData(69, ElementColors.Modified)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(69)
            ]);            
          }
        );
        
        test(
          "returns correct steps sequence upon selection-sorting already-sorted 2-elements array in ascending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(11),
              new ElementData(22)
            ]);         
            
            const steps = numbersArray.getSelectionSortSteps(Direction.Ascending);
            expect(steps.length).toBe(6);
            
            expect(steps[0]).toEqual([
              new ElementData(11, ElementColors.Changing),
              new ElementData(22)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(11, ElementColors.Changing),
              new ElementData(22, ElementColors.Selected)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(11, ElementColors.Changing),
              new ElementData(22)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(11, ElementColors.Modified),
              new ElementData(22)
            ]);
            expect(steps[4]).toEqual([
              new ElementData(11, ElementColors.Modified),
              new ElementData(22, ElementColors.Modified)
            ]);
            expect(steps[5]).toEqual([
              new ElementData(11),
              new ElementData(22)
            ]);
          }          
        );
        
        test(
          "returns correct steps sequence upon selection-sorting yet-unsorted 2-elements array in ascending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(44),
              new ElementData(33)
            ]);
            
            const steps = numbersArray.getSelectionSortSteps(Direction.Ascending);
            expect(steps.length).toBe(7);
            
            expect(steps[0]).toEqual([
              new ElementData(44, ElementColors.Changing),
              new ElementData(33)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(44, ElementColors.Changing),
              new ElementData(33, ElementColors.Selected)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(44, ElementColors.Changing),
              new ElementData(33, ElementColors.Changing)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(33, ElementColors.Changing),
              new ElementData(44, ElementColors.Changing)
            ]);
            expect(steps[4]).toEqual([
              new ElementData(33, ElementColors.Modified),
              new ElementData(44)
            ]);
            expect(steps[5]).toEqual([
              new ElementData(33, ElementColors.Modified),
              new ElementData(44, ElementColors.Modified)
            ]);
            expect(steps[6]).toEqual([
              new ElementData(33),
              new ElementData(44)
            ]);
          }
        );
        
        test(
          "returns correct steps sequence upon selection-sorting already-sorted 2-elements array in descending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(66),
              new ElementData(55)
            ]);         
            
            const steps = numbersArray.getSelectionSortSteps(Direction.Descending);
            expect(steps.length).toBe(6);
            
            expect(steps[0]).toEqual([
              new ElementData(66, ElementColors.Changing),
              new ElementData(55)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(66, ElementColors.Changing),
              new ElementData(55, ElementColors.Selected)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(66, ElementColors.Changing),
              new ElementData(55)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(66, ElementColors.Modified),
              new ElementData(55)
            ]);
            expect(steps[4]).toEqual([
              new ElementData(66, ElementColors.Modified),
              new ElementData(55, ElementColors.Modified)
            ]);
            expect(steps[5]).toEqual([
              new ElementData(66),
              new ElementData(55)
            ]);            
          }
        );
        
        test(
          "returns correct steps sequence upon selection-sorting yet-unsorted 2-elements array in descending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(77),
              new ElementData(88)
            ]);
            
            const steps = numbersArray.getSelectionSortSteps(Direction.Descending);
            expect(steps.length).toBe(7);
            
            expect(steps[0]).toEqual([
              new ElementData(77, ElementColors.Changing),
              new ElementData(88)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(77, ElementColors.Changing),
              new ElementData(88, ElementColors.Selected)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(77, ElementColors.Changing),
              new ElementData(88, ElementColors.Changing)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(88, ElementColors.Changing),
              new ElementData(77, ElementColors.Changing)
            ]);
            expect(steps[4]).toEqual([
              new ElementData(88, ElementColors.Modified),
              new ElementData(77)
            ]);
            expect(steps[5]).toEqual([
              new ElementData(88, ElementColors.Modified),
              new ElementData(77, ElementColors.Modified)
            ]);
            expect(steps[6]).toEqual([
              new ElementData(88),
              new ElementData(77)
            ]);            
          }
        );
        
        test(
          "returns correct steps sequence upon selection-sorting already-sorted 3-elements array in ascending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(10),
              new ElementData(50),
              new ElementData(90)
            ]);
            
            const steps = numbersArray.getSelectionSortSteps(Direction.Ascending);
            expect(steps.length).toBe(11);
            
            expect(steps[0]).toEqual([
              new ElementData(10, ElementColors.Changing),
              new ElementData(50),
              new ElementData(90)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(10, ElementColors.Changing),
              new ElementData(50, ElementColors.Selected),
              new ElementData(90)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(10, ElementColors.Changing),
              new ElementData(50),
              new ElementData(90, ElementColors.Selected)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(10, ElementColors.Changing),
              new ElementData(50),
              new ElementData(90)
            ]);
            expect(steps[4]).toEqual([
              new ElementData(10, ElementColors.Modified),
              new ElementData(50),
              new ElementData(90)
            ]);
            expect(steps[5]).toEqual([
              new ElementData(10, ElementColors.Modified),
              new ElementData(50, ElementColors.Changing),
              new ElementData(90)
            ]);
            expect(steps[6]).toEqual([
              new ElementData(10, ElementColors.Modified),
              new ElementData(50, ElementColors.Changing),
              new ElementData(90, ElementColors.Selected)
            ]);
            expect(steps[7]).toEqual([
              new ElementData(10, ElementColors.Modified),
              new ElementData(50, ElementColors.Changing),
              new ElementData(90)
            ]);
            expect(steps[8]).toEqual([
              new ElementData(10, ElementColors.Modified),
              new ElementData(50, ElementColors.Modified),
              new ElementData(90)
            ]);
            expect(steps[9]).toEqual([
              new ElementData(10, ElementColors.Modified),
              new ElementData(50, ElementColors.Modified),
              new ElementData(90, ElementColors.Modified)
            ]);
            expect(steps[10]).toEqual([
              new ElementData(10),
              new ElementData(50),
              new ElementData(90)
            ]);
          }
        );
        
        test(
          "returns correct steps sequence upon selection-sorting yet-unsorted 3-elements array in ascending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(80),
              new ElementData(50),
              new ElementData(20)
            ]);            
            
            const steps = numbersArray.getSelectionSortSteps(Direction.Ascending);
            expect(steps.length).toBe(13);
            
            expect(steps[0]).toEqual([
              new ElementData(80, ElementColors.Changing),
              new ElementData(50),
              new ElementData(20)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(80, ElementColors.Changing),
              new ElementData(50, ElementColors.Selected),
              new ElementData(20)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(80, ElementColors.Changing),
              new ElementData(50, ElementColors.Changing),
              new ElementData(20)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(80, ElementColors.Changing),
              new ElementData(50, ElementColors.Changing),
              new ElementData(20, ElementColors.Selected)
            ]);
            expect(steps[4]).toEqual([
              new ElementData(80, ElementColors.Changing),
              new ElementData(50),
              new ElementData(20, ElementColors.Changing)
            ]);
            expect(steps[5]).toEqual([
              new ElementData(20, ElementColors.Changing),
              new ElementData(50),
              new ElementData(80, ElementColors.Changing)
            ]);
            expect(steps[6]).toEqual([
              new ElementData(20, ElementColors.Modified),
              new ElementData(50),
              new ElementData(80)
            ]);
            expect(steps[7]).toEqual([
              new ElementData(20, ElementColors.Modified),
              new ElementData(50, ElementColors.Changing),
              new ElementData(80)
            ]);
            expect(steps[8]).toEqual([
              new ElementData(20, ElementColors.Modified),
              new ElementData(50, ElementColors.Changing),
              new ElementData(80, ElementColors.Selected)
            ]);
            expect(steps[9]).toEqual([
              new ElementData(20, ElementColors.Modified),
              new ElementData(50, ElementColors.Changing),
              new ElementData(80)
            ]);
            expect(steps[10]).toEqual([
              new ElementData(20, ElementColors.Modified),
              new ElementData(50, ElementColors.Modified),
              new ElementData(80)
            ]);
            expect(steps[11]).toEqual([
              new ElementData(20, ElementColors.Modified),
              new ElementData(50, ElementColors.Modified),
              new ElementData(80, ElementColors.Modified)
            ]);
            expect(steps[12]).toEqual([
              new ElementData(20),
              new ElementData(50),
              new ElementData(80)
            ]);
          }
        );
        
        test(
          "returns correct steps sequence upon selection-sorting already-sorted 3-elements array in descending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(70),
              new ElementData(50),
              new ElementData(30)
            ]);               
            
            const steps = numbersArray.getSelectionSortSteps(Direction.Descending);
            expect(steps.length).toBe(11);     
            
            expect(steps[0]).toEqual([
              new ElementData(70, ElementColors.Changing),
              new ElementData(50),
              new ElementData(30)
            ]);            
            expect(steps[1]).toEqual([
              new ElementData(70, ElementColors.Changing),
              new ElementData(50, ElementColors.Selected),
              new ElementData(30)
            ]);            
            expect(steps[2]).toEqual([
              new ElementData(70, ElementColors.Changing),
              new ElementData(50),
              new ElementData(30, ElementColors.Selected)
            ]);            
            expect(steps[3]).toEqual([
              new ElementData(70, ElementColors.Changing),
              new ElementData(50),
              new ElementData(30)
            ]);            
            expect(steps[4]).toEqual([
              new ElementData(70, ElementColors.Modified),
              new ElementData(50),
              new ElementData(30)
            ]);            
            expect(steps[5]).toEqual([
              new ElementData(70, ElementColors.Modified),
              new ElementData(50, ElementColors.Changing),
              new ElementData(30)
            ]);            
            expect(steps[6]).toEqual([
              new ElementData(70, ElementColors.Modified),
              new ElementData(50, ElementColors.Changing),
              new ElementData(30, ElementColors.Selected)
            ]);            
            expect(steps[7]).toEqual([
              new ElementData(70, ElementColors.Modified),
              new ElementData(50, ElementColors.Changing),
              new ElementData(30)
            ]);            
            expect(steps[8]).toEqual([
              new ElementData(70, ElementColors.Modified),
              new ElementData(50, ElementColors.Modified),
              new ElementData(30)
            ]);            
            expect(steps[9]).toEqual([
              new ElementData(70, ElementColors.Modified),
              new ElementData(50, ElementColors.Modified),
              new ElementData(30, ElementColors.Modified)
            ]);            
            expect(steps[10]).toEqual([
              new ElementData(70),
              new ElementData(50),
              new ElementData(30)
            ]);            
          }
        );
        
        test(
          "returns correct steps sequence upon selection-sorting yet-unsorted 3-elements array in descending order", () => {
            
            const numbersArray = new NumbersArray([
              new ElementData(11),
              new ElementData(55),
              new ElementData(99)
            ]);                   
            
            const steps = numbersArray.getSelectionSortSteps(Direction.Descending);
            expect(steps.length).toBe(13);
            
            expect(steps[0]).toEqual([
              new ElementData(11, ElementColors.Changing),
              new ElementData(55),
              new ElementData(99)
            ]);
            expect(steps[1]).toEqual([
              new ElementData(11, ElementColors.Changing),
              new ElementData(55, ElementColors.Selected),
              new ElementData(99)
            ]);
            expect(steps[2]).toEqual([
              new ElementData(11, ElementColors.Changing),
              new ElementData(55, ElementColors.Changing),
              new ElementData(99)
            ]);
            expect(steps[3]).toEqual([
              new ElementData(11, ElementColors.Changing),
              new ElementData(55, ElementColors.Changing),
              new ElementData(99, ElementColors.Selected)
            ]);
            expect(steps[4]).toEqual([
              new ElementData(11, ElementColors.Changing),
              new ElementData(55),
              new ElementData(99, ElementColors.Changing)
            ]);
            expect(steps[5]).toEqual([
              new ElementData(99, ElementColors.Changing),
              new ElementData(55),
              new ElementData(11, ElementColors.Changing)
            ]);
            expect(steps[6]).toEqual([
              new ElementData(99, ElementColors.Modified),
              new ElementData(55),
              new ElementData(11)
            ]);
            expect(steps[7]).toEqual([
              new ElementData(99, ElementColors.Modified),
              new ElementData(55, ElementColors.Changing),
              new ElementData(11)
            ]);
            expect(steps[8]).toEqual([
              new ElementData(99, ElementColors.Modified),
              new ElementData(55, ElementColors.Changing),
              new ElementData(11, ElementColors.Selected)
            ]);
            expect(steps[9]).toEqual([
              new ElementData(99, ElementColors.Modified),
              new ElementData(55, ElementColors.Changing),
              new ElementData(11)
            ]);
            expect(steps[10]).toEqual([
              new ElementData(99, ElementColors.Modified),
              new ElementData(55, ElementColors.Modified),
              new ElementData(11)
            ]);
            expect(steps[11]).toEqual([
              new ElementData(99, ElementColors.Modified),
              new ElementData(55, ElementColors.Modified),
              new ElementData(11, ElementColors.Modified)
            ]);
            expect(steps[12]).toEqual([
              new ElementData(99),
              new ElementData(55),
              new ElementData(11)
            ]);
          }
        );
      }
    );
  }
);
