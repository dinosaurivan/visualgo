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
        cy.getByTestId("input").should("be.empty");
        cy.getByTestId("enqueue-button").should("be.disabled");
        cy.getByTestId("dequeue-button").should("be.disabled");
        cy.getByTestId("clear-button").should("be.disabled");
        
        // add element
        cy.getByTestId("input").type("42");
        cy.getByTestId("enqueue-button").should("be.enabled");
        cy.getByTestId("dequeue-button").should("be.disabled");
        cy.getByTestId("clear-button").should("be.disabled");
        cy.getByTestId("form").submit();
        
        cy.wait(Delay.Medium);
        
        // check states with loaded queue
        cy.getByTestId("input").should("be.empty");
        cy.getByTestId("enqueue-button").should("be.disabled");
        cy.getByTestId("dequeue-button").should("be.enabled");
        cy.getByTestId("clear-button").should("be.enabled");        
        
        // check states with various input values
        cy.getByTestId("input").type(" ");
        cy.getByTestId("enqueue-button").should("be.enabled");
        cy.getByTestId("input").clear();
        cy.getByTestId("input").should("be.empty");
        cy.getByTestId("enqueue-button").should("be.disabled");
        cy.getByTestId("input").type("12345");
        cy.getByTestId("input").should("have.value", "1234");
        cy.getByTestId("enqueue-button").should("be.enabled");           
        
        // check empty queue
        cy.getByTestId("dequeue-button").click();
        cy.getByTestId("enqueue-button").should("be.disabled");
        cy.getByTestId("dequeue-button").should("be.disabled");
        cy.getByTestId("clear-button").should("be.disabled");        
      }
    ); 
    
    it(
      "should add new elements correctly", () => {
        
        // add first element
        cy.getByTestId("input").type("11");
        cy.getByTestId("enqueue-button").click();
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("[class*=circle_content]").eq(1).as("element2");
        cy.get("[class*=circle_content]").eq(2).as("element3");
        
        // check initial change
        cy.get("@element1").contains("11");
        cy.get("@element1").contains("head");
        cy.get("@element1").contains("tail");
        cy.get("@element1").children("[class*=circle_modified]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element1").children("[class*=circle_default]");
        
        // add second element
        cy.getByTestId("input").type("22");
        cy.getByTestId("enqueue-button").click();
        
        // check initial change
        cy.get("@element2").contains("22");
        cy.get("@element2").contains("tail");    
        cy.get("@element2").should("not.contain", "head");
        cy.get("@element2").children("[class*=circle_modified]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element2").children("[class*=circle_default]");
        
        // add third element
        cy.getByTestId("input").type("33");
        cy.getByTestId("enqueue-button").click();
        
        // check initial change
        cy.get("@element3").contains("33");
        cy.get("@element3").contains("tail");    
        cy.get("@element3").should("not.contain", "head");
        cy.get("@element3").children("[class*=circle_modified]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element3").children("[class*=circle_default]");        
        
        // check whole queue
        cy.get("[class*=circle_content]").should("have.length", 7).each(
          ($el, index) => {
            if (index === 0) {
              cy.wrap($el).contains("11");
              cy.wrap($el).contains("head");
              cy.wrap($el).should("not.contain", "tail");
              cy.wrap($el).children("[class*=circle_default]");
            } else if (index === 1) {
              cy.wrap($el).contains("22");
              cy.wrap($el).should("not.contain", "head");
              cy.wrap($el).should("not.contain", "tail");
              cy.wrap($el).children("[class*=circle_default]");
            } else if (index === 2) {
              cy.wrap($el).contains("33");
              cy.wrap($el).contains("tail");
              cy.wrap($el).should("not.contain", "head");
              cy.wrap($el).children("[class*=circle_default]");
            } else {
              cy.wrap($el).should("not.contain.text");
              cy.wrap($el).children("[class*=circle_default]"); 
            };
          }
        );
      }
    );
    
    it(
      "should remove existing elements correctly", () => {
        
        // add elements to remove them later
        cy.getByTestId("input").type("12");
        cy.getByTestId("enqueue-button").click();
        cy.wait(Delay.Medium);
        cy.getByTestId("input").type("34");
        cy.getByTestId("enqueue-button").click();
        cy.wait(Delay.Medium);
        cy.getByTestId("input").type("56");
        cy.getByTestId("enqueue-button").click();
        cy.wait(Delay.Medium);
        
        // remove first element
        cy.getByTestId("dequeue-button").click();
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("[class*=circle_content]").eq(1).as("element2");
        cy.get("[class*=circle_content]").eq(2).as("element3");
        
        // check initial change
        cy.get("@element1").contains("12");
        cy.get("@element1").should("not.contain", "head");
        cy.get("@element1").should("not.contain", "tail");
        cy.get("@element1").children("[class*=circle_changing]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element1").should("not.contain.text");
        cy.get("@element1").children("[class*=circle_default]");  
        
        // remove second element
        cy.getByTestId("dequeue-button").click();
        
        // check initial change
        cy.get("@element2").contains("34");
        cy.get("@element2").should("not.contain", "head");
        cy.get("@element2").should("not.contain", "tail");
        cy.get("@element2").children("[class*=circle_changing]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element2").should("not.contain.text");
        cy.get("@element2").children("[class*=circle_default]");          
        
        // remove third element
        cy.getByTestId("dequeue-button").click();
        
        // check initial change
        cy.get("@element3").contains("56");
        cy.get("@element3").should("not.contain", "head");
        cy.get("@element3").should("not.contain", "tail");
        cy.get("@element3").children("[class*=circle_changing]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element3").should("not.contain.text");
        cy.get("@element3").children("[class*=circle_default]");    
        
        // check whole queue
        cy.get("[class*=circle_content]").should("have.length", 7).each(
          ($el) => {
            cy.wrap($el).should("not.contain.text");
            cy.wrap($el).children("[class*=circle_default]");               
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
          cy.get("[class*=circle_content]").should("have.length", 7).each(
            ($el) => {
              cy.wrap($el).should("not.contain.text");
              cy.wrap($el).children("[class*=circle_default]");               
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
