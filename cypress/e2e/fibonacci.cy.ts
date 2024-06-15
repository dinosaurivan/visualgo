import { Delay } from "../../src/utils/constants";



describe(
  "Fibonacci sequence page tests", () => {
    
    beforeEach(
      () => {
        cy.visit("http://localhost:3000/fibonacci");
      }
    );
    
    it(
      "enables and disables button based on input content and sequence state", () => {
        
        // check states with empty input
        cy.getByTestId("input").should("be.empty");
        cy.getByTestId("calculate-button").should("be.disabled");
        
        // check states with index === -1
        cy.getByTestId("input").type("-1");
        cy.getByTestId("input").should("have.value", "-1");
        cy.getByTestId("calculate-button").should("be.disabled");
        
        // check states with index === 0
        cy.getByTestId("input").clear();
        cy.getByTestId("input").should("be.empty");
        cy.getByTestId("input").type("0");
        cy.getByTestId("input").should("have.value", "0");
        cy.getByTestId("calculate-button").should("be.enabled");
        cy.getByTestId("form").submit();
        
        // check initial changes
        cy.getByTestId("input").should("be.empty");
        cy.getByTestId("calculate-button").should("be.disabled");
        
        cy.wait(Delay.Medium);
        
        // check delayed changes
        cy.getByTestId("input").should("be.empty");
        cy.getByTestId("calculate-button").should("be.disabled");
        
        // check states with various input values
        cy.getByTestId("input").type("5");
        cy.getByTestId("input").should("have.value", "5");
        cy.getByTestId("calculate-button").should("be.enabled");      
        
        cy.getByTestId("input").clear();
        cy.getByTestId("input").should("be.empty");        
        cy.getByTestId("input").type("19");
        cy.getByTestId("input").should("have.value", "19");
        cy.getByTestId("calculate-button").should("be.enabled");    
        
        cy.getByTestId("input").clear();
        cy.getByTestId("input").should("be.empty");        
        cy.getByTestId("input").type("20");
        cy.getByTestId("input").should("have.value", "20");
        cy.getByTestId("calculate-button").should("be.disabled");        
      }
    );
    
    it(
      "calculates correct sequence for index === 1", () => {
        
        // calculate
        cy.getByTestId("input").type("1");
        cy.getByTestId("form").submit();
        
        // check changes
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_default]");
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("[class*=circle_content]").eq(1).as("element2");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_default]");
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_default]");
      }
    );
    
    it(
      "calculates correct sequence for index === 2", () => {
        
        // calculate
        cy.getByTestId("input").type("2");
        cy.getByTestId("form").submit();
        
        // check changes
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_default]");
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("[class*=circle_content]").eq(1).as("element2");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_default]");
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_changing]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_changing]");
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("[class*=circle_content]").eq(2).as("element3");
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("1");
        cy.get("@element3").children("[class*=circle_modified]");
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("1");
        cy.get("@element3").children("[class*=circle_default]");        
      }
    );
    
    it(
      "calculates correct sequence for index === 5", () => {
        
        // calculate
        cy.getByTestId("input").type("5");
        cy.getByTestId("form").submit();
        
        // check changes
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_default]");
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("[class*=circle_content]").eq(1).as("element2");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_default]");
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_changing]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_changing]");
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("[class*=circle_content]").eq(2).as("element3");
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("1");
        cy.get("@element3").children("[class*=circle_modified]");
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_changing]");
        cy.get("@element3").contains("1");
        cy.get("@element3").children("[class*=circle_changing]");
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("[class*=circle_content]").eq(3).as("element4");
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("1");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").contains("2");
        cy.get("@element4").children("[class*=circle_modified]");
        cy.wait(Delay.Medium);                
        
        // check changes
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("1");
        cy.get("@element3").children("[class*=circle_changing]");
        cy.get("@element4").contains("2");
        cy.get("@element4").children("[class*=circle_changing]");
        cy.wait(Delay.Medium);             
        
        // check changes  
        cy.get("[class*=circle_content]").eq(4).as("element5");
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("1");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").contains("2");
        cy.get("@element4").children("[class*=circle_default]");
        cy.get("@element5").contains("3");
        cy.get("@element5").children("[class*=circle_modified]");
        cy.wait(Delay.Medium);                  
        
        // check changes  
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("1");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").contains("2");
        cy.get("@element4").children("[class*=circle_changing]");
        cy.get("@element5").contains("3");
        cy.get("@element5").children("[class*=circle_changing]");
        cy.wait(Delay.Medium);          
        
        // check changes  
        cy.get("[class*=circle_content]").eq(5).as("element6");
        cy.get("@element1").contains("0");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("1");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").contains("2");
        cy.get("@element4").children("[class*=circle_default]");
        cy.get("@element5").contains("3");
        cy.get("@element5").children("[class*=circle_default]");
        cy.get("@element6").contains("5");
        cy.get("@element6").children("[class*=circle_modified]");
        cy.wait(Delay.Medium);     
        
        // check changes  
        cy.get("@element1").contains("0");
        cy.get("@element2").contains("1");
        cy.get("@element3").contains("1");
        cy.get("@element4").contains("2");
        cy.get("@element5").contains("3");
        cy.get("@element6").contains("5");
        cy.get("[class*=circle_content]").should("have.length", 6).each(
          ($el) => {
            cy.wrap($el).children("[class*=circle_default]");               
          }
        );      
      }
    );    
  }
);
