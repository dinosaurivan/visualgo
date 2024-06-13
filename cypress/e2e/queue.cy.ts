import { Delay } from "../../src/utils/constants";



describe(
  "Queue page tests", () => {
    
    it(
      "enables and disables buttons based on input content and queue state", () => {
        
        cy.visit("http://localhost:3000/queue");
        
        // check states with empty queue
        cy.get("input").should("be.empty");
        cy.get('[data-testid="enqueue-button"]').should("be.disabled");
        cy.get('[data-testid="dequeue-button"]').should("be.disabled");
        cy.get('[data-testid="clear-button"]').should("be.disabled");
        
        // add element
        cy.get("input").type("42");
        cy.get('[data-testid="enqueue-button"]').should("be.enabled");
        cy.get("form").submit();
        
        cy.wait(Delay.Medium);
        
        // check states with loaded queue
        cy.get("input").should("be.empty");
        cy.get('[data-testid="enqueue-button"]').should("be.disabled");
        cy.get('[data-testid="dequeue-button"]').should("be.enabled");
        cy.get('[data-testid="clear-button"]').should("be.enabled");        
        
        // check states with various input values
        cy.get("input").type(" ");
        cy.get('[data-testid="enqueue-button"]').should("be.enabled");
        cy.get("input").clear();
        cy.get("input").should("be.empty");
        cy.get('[data-testid="enqueue-button"]').should("be.disabled");
        
        // check empty queue
        cy.get('[data-testid="dequeue-button"]').click();
        cy.get('[data-testid="enqueue-button"]').should("be.disabled");
        cy.get('[data-testid="dequeue-button"]').should("be.disabled");
        cy.get('[data-testid="clear-button"]').should("be.disabled");        
      }
    ); 
    
    it(
      "should add new elements correctly", () => {
        
        cy.visit("http://localhost:3000/queue");
        
        // add first element
        cy.get("input").type("11");
        cy.get('[data-testid="enqueue-button"]').click();
        cy.get("[class*=circle_content]").first().as("firstElement");
        
        // check initial change
        cy.get("@firstElement").contains("11");
        cy.get("@firstElement").contains("head");
        cy.get("@firstElement").contains("tail");
        cy.get("@firstElement").children("[class*=circle_modified]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@firstElement").children("[class*=circle_default]");
        
        // add second element
        cy.get("input").type("22");
        cy.get('[data-testid="enqueue-button"]').click();
        cy.get("[class*=circle_content]").eq(1).as("secondElement");
        
        // check initial change
        cy.get("@secondElement").contains("22");
        cy.get("@secondElement").contains("tail");    
        cy.get("@secondElement").should("not.contain", "head");
        cy.get("@secondElement").children("[class*=circle_modified]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@secondElement").children("[class*=circle_default]");
        
        // add third element
        cy.get("input").type("33");
        cy.get('[data-testid="enqueue-button"]').click();
        cy.get("[class*=circle_content]").eq(2).as("thirdElement");
        
        // check initial change
        cy.get("@thirdElement").contains("33");
        cy.get("@thirdElement").contains("tail");    
        cy.get("@thirdElement").should("not.contain", "head");
        cy.get("@thirdElement").children("[class*=circle_modified]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@thirdElement").children("[class*=circle_default]");        
        
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
        
        cy.visit("http://localhost:3000/queue");
        
        // add elements to remove them later
        cy.get("input").type("12");
        cy.get('[data-testid="enqueue-button"]').click();
        cy.wait(Delay.Medium);
        cy.get("input").type("34");
        cy.get('[data-testid="enqueue-button"]').click();
        cy.wait(Delay.Medium);
        cy.get("input").type("56");
        cy.get('[data-testid="enqueue-button"]').click();
        cy.wait(Delay.Medium);
        
        // remove first element
        cy.get('[data-testid="dequeue-button"]').click();
        cy.get("[class*=circle_content]").first().as("firstElement");
        
        // check initial change
        cy.get("@firstElement").contains("12");
        cy.get("@firstElement").should("not.contain", "head");
        cy.get("@firstElement").should("not.contain", "tail");
        cy.get("@firstElement").children("[class*=circle_changing]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@firstElement").should("not.contain.text");
        cy.get("@firstElement").children("[class*=circle_default]");  
        
        // remove second element
        cy.get('[data-testid="dequeue-button"]').click();
        cy.get("[class*=circle_content]").eq(1).as("secondElement");
        
        // check initial change
        cy.get("@secondElement").contains("34");
        cy.get("@secondElement").should("not.contain", "head");
        cy.get("@secondElement").should("not.contain", "tail");
        cy.get("@secondElement").children("[class*=circle_changing]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@secondElement").should("not.contain.text");
        cy.get("@secondElement").children("[class*=circle_default]");          
        
        // remove third element
        cy.get('[data-testid="dequeue-button"]').click();
        cy.get("[class*=circle_content]").eq(2).as("thirdElement");
        
        // check initial change
        cy.get("@thirdElement").contains("56");
        cy.get("@thirdElement").should("not.contain", "head");
        cy.get("@thirdElement").should("not.contain", "tail");
        cy.get("@thirdElement").children("[class*=circle_changing]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@thirdElement").should("not.contain.text");
        cy.get("@thirdElement").children("[class*=circle_default]");    
        
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
          
          cy.visit("http://localhost:3000/queue");
          
          // add elements to clear them later
          for (let i = 0; i < 3; i++) {
            cy.get("input").type("333");
            cy.get('[data-testid="enqueue-button"]').click();
            cy.wait(Delay.Medium);
          };
          
          // clear the queue
          cy.get('[data-testid="clear-button"]').click();
          
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
        
        cy.visit("http://localhost:3000/queue");
        
        // add elements to fill up the queue
        for (let i = 0; i < 7; i++) {
          cy.get("input").type("777");
          cy.get('[data-testid="enqueue-button"]').click();
          cy.wait(Delay.Medium);
        };
        
        // check that button is disabled even with filled input
        cy.get("input").type("42");
        cy.get('[data-testid="enqueue-button"]').should("be.disabled");
      }
    );
  }
);
