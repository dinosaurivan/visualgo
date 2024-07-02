import { 
  allCirclesSelector, 
  defaultCircleSelector, 
  changingCircleSelector, 
  modifiedCircleSelector 
} from "./constants";
import { Delay } from "../../src/utils/constants";



describe(
  "String reversal page tests", () => {
    
    beforeEach(
      () => {
        cy.visit("string");
      }
    );
    
    it(
      "enables and disables button based on input content and string state", () => {
        
        // check states with empty input
        cy.getByTestId("input").should("be.empty").as("input");
        cy.getByTestId("reverse-button").should("be.disabled").as("reverseButton");
        
        // check states with 1 symbol
        cy.get("@input").type("a");
        cy.get("@input").should("have.value", "a");
        cy.get("@reverseButton").should("be.disabled");
        
        // check states with 2 symbols
        cy.get("@input").type("b");
        cy.get("@input").should("have.value", "ab");
        cy.get("@reverseButton").should("be.enabled");
        cy.getByTestId("form").submit();
        
        // check initial changes
        cy.get("@input").should("be.empty");
        cy.get("@reverseButton").should("be.disabled");
        
        cy.wait(Delay.Medium * 5);
        
        // check delayed changes
        cy.get("@input").should("be.empty");
        cy.get("@reverseButton").should("be.disabled");
        
        // check states with various input values
        cy.get("@input").type(" ");
        cy.get("@input").should("have.value", " ");
        cy.get("@reverseButton").should("be.disabled");      
        
        cy.get("@input").type(" ");
        cy.get("@input").should("have.value", "  ");
        cy.get("@reverseButton").should("be.enabled");        
        
        cy.get("@input").type(" ");
        cy.get("@input").should("have.value", "   ");
        cy.get("@reverseButton").should("be.enabled");        
        
        cy.get("@input").clear();
        cy.get("@input").should("be.empty");
        cy.get("@reverseButton").should("be.disabled");   
        
        cy.get("@input").type("123456123456");
        cy.get("@input").should("have.value", "12345612345");
        cy.get("@reverseButton").should("be.enabled");   
      }
    );
    
    it(
      "reverses a string of length 2 correctly", () => {
        
        // reverse a string of 2
        cy.getByTestId("input").type("12");
        cy.getByTestId("form").submit();
        cy.get(allCirclesSelector).first().as("element1");
        cy.get(allCirclesSelector).eq(1).as("element2");
        
        // check changes
        cy.get("@element1").contains("1");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("2");
        cy.get("@element2").children(defaultCircleSelector);
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("@element1").contains("1");
        cy.get("@element1").children(changingCircleSelector);
        cy.get("@element2").contains("2");
        cy.get("@element2").children(changingCircleSelector);
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("@element1").contains("2");
        cy.get("@element1").children(changingCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(changingCircleSelector);
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("2");
        cy.get("@element1").children(modifiedCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(modifiedCircleSelector);
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("2");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("1");
        cy.get("@element2").children(defaultCircleSelector);;
      }
    );
    
    it(
      "reverses a string of length 5 correctly", () => {
        
        // reverse a string of 5
        cy.getByTestId("input").type("12345");
        cy.getByTestId("form").submit();
        cy.get(allCirclesSelector).first().as("element1");
        cy.get(allCirclesSelector).eq(1).as("element2");        
        cy.get(allCirclesSelector).eq(2).as("element3");        
        cy.get(allCirclesSelector).eq(3).as("element4");        
        cy.get(allCirclesSelector).eq(4).as("element5");        
        
        // check changes
        cy.get("@element1").contains("1");
        cy.get("@element2").contains("2");
        cy.get("@element3").contains("3");
        cy.get("@element4").contains("4");
        cy.get("@element5").contains("5");
        cy.get(allCirclesSelector).should("have.length", 5).each(
          ($el) => {
            cy.wrap($el).children(defaultCircleSelector);               
          }
        );        
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("1");
        cy.get("@element1").children(changingCircleSelector);
        cy.get("@element2").contains("2");
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("3");
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").contains("4");
        cy.get("@element4").children(defaultCircleSelector);
        cy.get("@element5").contains("5");
        cy.get("@element5").children(changingCircleSelector);
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element1").children(changingCircleSelector);
        cy.get("@element2").contains("2");
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("3");
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").contains("4");
        cy.get("@element4").children(defaultCircleSelector);
        cy.get("@element5").contains("1");
        cy.get("@element5").children(changingCircleSelector);
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element1").children(modifiedCircleSelector);
        cy.get("@element2").contains("2");
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("3");
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").contains("4");
        cy.get("@element4").children(defaultCircleSelector);
        cy.get("@element5").contains("1");
        cy.get("@element5").children(modifiedCircleSelector);
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element1").children(modifiedCircleSelector);
        cy.get("@element2").contains("2");
        cy.get("@element2").children(changingCircleSelector);
        cy.get("@element3").contains("3");
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").contains("4");
        cy.get("@element4").children(changingCircleSelector);
        cy.get("@element5").contains("1");
        cy.get("@element5").children(modifiedCircleSelector);
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element1").children(modifiedCircleSelector);
        cy.get("@element2").contains("4");
        cy.get("@element2").children(changingCircleSelector);
        cy.get("@element3").contains("3");
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").contains("2");
        cy.get("@element4").children(changingCircleSelector);
        cy.get("@element5").contains("1");
        cy.get("@element5").children(modifiedCircleSelector);
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element1").children(modifiedCircleSelector);
        cy.get("@element2").contains("4");
        cy.get("@element2").children(modifiedCircleSelector);
        cy.get("@element3").contains("3");
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").contains("2");
        cy.get("@element4").children(modifiedCircleSelector);
        cy.get("@element5").contains("1");
        cy.get("@element5").children(modifiedCircleSelector);
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element1").children(modifiedCircleSelector);
        cy.get("@element2").contains("4");
        cy.get("@element2").children(modifiedCircleSelector);
        cy.get("@element3").contains("3");
        cy.get("@element3").children(changingCircleSelector);
        cy.get("@element4").contains("2");
        cy.get("@element4").children(modifiedCircleSelector);
        cy.get("@element5").contains("1");
        cy.get("@element5").children(modifiedCircleSelector);
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element2").contains("4");
        cy.get("@element3").contains("3");
        cy.get("@element4").contains("2");
        cy.get("@element5").contains("1");
        cy.get(allCirclesSelector).should("have.length", 5).each(
          ($el) => {
            cy.wrap($el).children(modifiedCircleSelector);               
          }
        );          
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element2").contains("4");
        cy.get("@element3").contains("3");
        cy.get("@element4").contains("2");
        cy.get("@element5").contains("1");
        cy.get(allCirclesSelector).should("have.length", 5).each(
          ($el) => {
            cy.wrap($el).children(defaultCircleSelector);               
          }
        );             
      }
    );
  }
);
