import { 
  allCirclesSelector, 
  defaultCircleSelector, 
  changingCircleSelector, 
  modifiedCircleSelector 
} from "./constants";
import { Delay } from "../../src/utils/constants";



describe(
  "Queue page tests", () => {
    
    beforeEach(
      () => {
        cy.visit("queue");
      }
    );
    
    it(
      "enables and disables buttons based on input content and queue state", () => {
        
        // check states with empty queue
        cy.getByTestId("input").should("be.empty").as("input");
        cy.getByTestId("enqueue-button").should("be.disabled").as("enqueueButton");
        cy.getByTestId("dequeue-button").should("be.disabled").as("dequeueButton");
        cy.getByTestId("clear-button").should("be.disabled").as("clearButton");
        
        // add element
        cy.get("@input").type("42");
        cy.get("@enqueueButton").should("be.enabled");
        cy.get("@dequeueButton").should("be.disabled");
        cy.get("@clearButton").should("be.disabled");
        cy.getByTestId("form").submit();
        
        cy.wait(Delay.Medium);
        
        // check states with loaded queue
        cy.get("@input").should("be.empty");
        cy.get("@enqueueButton").should("be.disabled");
        cy.get("@dequeueButton").should("be.enabled");
        cy.get("@clearButton").should("be.enabled");        
        
        // check states with various input values
        cy.get("@input").type(" ");
        cy.get("@enqueueButton").should("be.enabled");
        cy.get("@input").clear();
        cy.get("@input").should("be.empty");
        cy.get("@enqueueButton").should("be.disabled");
        cy.get("@input").type("12345");
        cy.get("@input").should("have.value", "1234");
        cy.get("@enqueueButton").should("be.enabled");           
        
        // check empty queue
        cy.get("@dequeueButton").click();
        cy.get("@enqueueButton").should("be.disabled");
        cy.get("@dequeueButton").should("be.disabled");
        cy.get("@clearButton").should("be.disabled");        
      }
    ); 
    
    it(
      "should add new elements correctly", () => {
        
        // add first element
        cy.getByTestId("input").type("11").as("input");
        cy.getByTestId("enqueue-button").click().as("enqueueButton");
        cy.get(allCirclesSelector).first().as("element1");
        cy.get(allCirclesSelector).eq(1).as("element2");
        cy.get(allCirclesSelector).eq(2).as("element3");
        
        // check initial change
        cy.get("@element1").contains("11");
        cy.get("@element1").contains("head");
        cy.get("@element1").contains("tail");
        cy.get("@element1").children(modifiedCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element1").children(defaultCircleSelector);
        
        // add second element
        cy.get("@input").type("22");
        cy.get("@enqueueButton").click();
        
        // check initial change
        cy.get("@element2").contains("22");
        cy.get("@element2").contains("tail");    
        cy.get("@element2").should("not.contain", "head");
        cy.get("@element2").children(modifiedCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element2").children(defaultCircleSelector);
        
        // add third element
        cy.get("@input").type("33");
        cy.get("@enqueueButton").click();
        
        // check initial change
        cy.get("@element3").contains("33");
        cy.get("@element3").contains("tail");    
        cy.get("@element3").should("not.contain", "head");
        cy.get("@element3").children(modifiedCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element3").children(defaultCircleSelector);        
        
        // check whole queue
        cy.get(allCirclesSelector).should("have.length", 7).each(
          ($el, index) => {
            if (index === 0) {
              cy.wrap($el).contains("11");
              cy.wrap($el).contains("head");
              cy.wrap($el).should("not.contain", "tail");
              cy.wrap($el).children(defaultCircleSelector);
            } else if (index === 1) {
              cy.wrap($el).contains("22");
              cy.wrap($el).should("not.contain", "head");
              cy.wrap($el).should("not.contain", "tail");
              cy.wrap($el).children(defaultCircleSelector);
            } else if (index === 2) {
              cy.wrap($el).contains("33");
              cy.wrap($el).contains("tail");
              cy.wrap($el).should("not.contain", "head");
              cy.wrap($el).children(defaultCircleSelector);
            } else {
              cy.wrap($el).should("not.contain.text");
              cy.wrap($el).children(defaultCircleSelector); 
            };
          }
        );
      }
    );
    
    it(
      "should remove existing elements correctly", () => {
        
        // add elements to remove them later
        cy.getByTestId("input").type("12").as("input");
        cy.getByTestId("enqueue-button").click().as("enqueueButton");
        cy.wait(Delay.Medium);
        cy.get("@input").type("34");
        cy.get("@enqueueButton").click();
        cy.wait(Delay.Medium);
        cy.get("@input").type("56");
        cy.get("@enqueueButton").click();
        cy.wait(Delay.Medium);
        
        // remove first element
        cy.getByTestId("dequeue-button").click().as("dequeueButton");
        cy.get(allCirclesSelector).first().as("element1");
        cy.get(allCirclesSelector).eq(1).as("element2");
        cy.get(allCirclesSelector).eq(2).as("element3");
        
        // check initial change
        cy.get("@element1").contains("12");
        cy.get("@element1").should("not.contain", "head");
        cy.get("@element1").should("not.contain", "tail");
        cy.get("@element1").children(changingCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element1").should("not.contain.text");
        cy.get("@element1").children(defaultCircleSelector);  
        
        // remove second element
        cy.get("@dequeueButton").click();
        
        // check initial change
        cy.get("@element2").contains("34");
        cy.get("@element2").should("not.contain", "head");
        cy.get("@element2").should("not.contain", "tail");
        cy.get("@element2").children(changingCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element2").should("not.contain.text");
        cy.get("@element2").children(defaultCircleSelector);          
        
        // remove third element
        cy.get("@dequeueButton").click();
        
        // check initial change
        cy.get("@element3").contains("56");
        cy.get("@element3").should("not.contain", "head");
        cy.get("@element3").should("not.contain", "tail");
        cy.get("@element3").children(changingCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element3").should("not.contain.text");
        cy.get("@element3").children(defaultCircleSelector);    
        
        // check whole queue
        cy.get(allCirclesSelector).should("have.length", 7).each(
          ($el) => {
            cy.wrap($el).should("not.contain.text");
            cy.wrap($el).children(defaultCircleSelector);               
          }
        );
      }
    );    
    
    it(
      "should clear the queue correctly", () => {
          
          // add elements to clear them later
          for (let i = 0; i < 3; i++) {
            cy.getByTestId("input").type("333");
            cy.getByTestId("enqueue-button").click();
            cy.wait(Delay.Medium);
          };
          
          // clear the queue
          cy.getByTestId("clear-button").click();
          
          // check whole queue
          cy.get(allCirclesSelector).should("have.length", 7).each(
            ($el) => {
              cy.wrap($el).should("not.contain.text");
              cy.wrap($el).children(defaultCircleSelector);               
            }
          );
      }
    );
    
    it(
      "disables adding if size limit is exceeded", () => {
        
        // add elements to fill up the queue
        for (let i = 0; i < 7; i++) {
          cy.getByTestId("input").type("777");
          cy.getByTestId("enqueue-button").click();
          cy.wait(Delay.Medium);
        };
        
        // check that button is disabled even with filled input
        cy.getByTestId("input").type("42");
        cy.getByTestId("enqueue-button").should("be.disabled");
      }
    );
  }
);
