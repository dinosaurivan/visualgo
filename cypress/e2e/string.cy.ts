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
        cy.getByTestId("input").should("be.empty");
        cy.getByTestId("reverse-button").should("be.disabled");
        
        // check states with 1 symbol
        cy.getByTestId("input").type("a");
        cy.getByTestId("input").should("have.value", "a");
        cy.getByTestId("reverse-button").should("be.disabled");
        
        // check states with 2 symbols
        cy.getByTestId("input").type("b");
        cy.getByTestId("input").should("have.value", "ab");
        cy.getByTestId("reverse-button").should("be.enabled");
        cy.getByTestId("form").submit();
        
        // check initial changes
        cy.getByTestId("input").should("be.empty");
        cy.getByTestId("reverse-button").should("be.disabled");
        
        cy.wait(Delay.Medium * 5);
        
        // check delayed changes
        cy.getByTestId("input").should("be.empty");
        cy.getByTestId("reverse-button").should("be.disabled");
        
        // check states with various input values
        cy.getByTestId("input").type(" ");
        cy.getByTestId("input").should("have.value", " ");
        cy.getByTestId("reverse-button").should("be.disabled");      
        
        cy.getByTestId("input").type(" ");
        cy.getByTestId("input").should("have.value", "  ");
        cy.getByTestId("reverse-button").should("be.enabled");        
        
        cy.getByTestId("input").type(" ");
        cy.getByTestId("input").should("have.value", "   ");
        cy.getByTestId("reverse-button").should("be.enabled");        
        
        cy.getByTestId("input").clear();
        cy.getByTestId("input").should("be.empty");
        cy.getByTestId("reverse-button").should("be.disabled");   
        
        cy.getByTestId("input").type("123456123456");
        cy.getByTestId("input").should("have.value", "12345612345");
        cy.getByTestId("reverse-button").should("be.enabled");   
      }
    );
    
    it(
      "reverses a string of length 2 correctly", () => {
        
        // reverse a string of 2
        cy.getByTestId("input").type("12");
        cy.getByTestId("form").submit();
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("[class*=circle_content]").eq(1).as("element2");
        
        // check changes
        cy.get("@element1").contains("1");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("2");
        cy.get("@element2").children("[class*=circle_default]");
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("@element1").contains("1");
        cy.get("@element1").children("[class*=circle_changing]");
        cy.get("@element2").contains("2");
        cy.get("@element2").children("[class*=circle_changing]");
        cy.wait(Delay.Medium);
        
        // check changes
        cy.get("@element1").contains("2");
        cy.get("@element1").children("[class*=circle_changing]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_changing]");
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("2");
        cy.get("@element1").children("[class*=circle_modified]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_modified]");
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("2");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("1");
        cy.get("@element2").children("[class*=circle_default]");;
      }
    );
    
    it(
      "reverses a string of length 5 correctly", () => {
        
        // reverse a string of 5
        cy.getByTestId("input").type("12345");
        cy.getByTestId("form").submit();
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("[class*=circle_content]").eq(1).as("element2");        
        cy.get("[class*=circle_content]").eq(2).as("element3");        
        cy.get("[class*=circle_content]").eq(3).as("element4");        
        cy.get("[class*=circle_content]").eq(4).as("element5");        
        
        // check changes
        cy.get("@element1").contains("1");
        cy.get("@element2").contains("2");
        cy.get("@element3").contains("3");
        cy.get("@element4").contains("4");
        cy.get("@element5").contains("5");
        cy.get("[class*=circle_content]").should("have.length", 5).each(
          ($el) => {
            cy.wrap($el).children("[class*=circle_default]");               
          }
        );        
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("1");
        cy.get("@element1").children("[class*=circle_changing]");
        cy.get("@element2").contains("2");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("3");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").contains("4");
        cy.get("@element4").children("[class*=circle_default]");
        cy.get("@element5").contains("5");
        cy.get("@element5").children("[class*=circle_changing]");
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element1").children("[class*=circle_changing]");
        cy.get("@element2").contains("2");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("3");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").contains("4");
        cy.get("@element4").children("[class*=circle_default]");
        cy.get("@element5").contains("1");
        cy.get("@element5").children("[class*=circle_changing]");
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element1").children("[class*=circle_modified]");
        cy.get("@element2").contains("2");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("3");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").contains("4");
        cy.get("@element4").children("[class*=circle_default]");
        cy.get("@element5").contains("1");
        cy.get("@element5").children("[class*=circle_modified]");
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element1").children("[class*=circle_modified]");
        cy.get("@element2").contains("2");
        cy.get("@element2").children("[class*=circle_changing]");
        cy.get("@element3").contains("3");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").contains("4");
        cy.get("@element4").children("[class*=circle_changing]");
        cy.get("@element5").contains("1");
        cy.get("@element5").children("[class*=circle_modified]");
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element1").children("[class*=circle_modified]");
        cy.get("@element2").contains("4");
        cy.get("@element2").children("[class*=circle_changing]");
        cy.get("@element3").contains("3");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").contains("2");
        cy.get("@element4").children("[class*=circle_changing]");
        cy.get("@element5").contains("1");
        cy.get("@element5").children("[class*=circle_modified]");
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element1").children("[class*=circle_modified]");
        cy.get("@element2").contains("4");
        cy.get("@element2").children("[class*=circle_modified]");
        cy.get("@element3").contains("3");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").contains("2");
        cy.get("@element4").children("[class*=circle_modified]");
        cy.get("@element5").contains("1");
        cy.get("@element5").children("[class*=circle_modified]");
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element1").children("[class*=circle_modified]");
        cy.get("@element2").contains("4");
        cy.get("@element2").children("[class*=circle_modified]");
        cy.get("@element3").contains("3");
        cy.get("@element3").children("[class*=circle_changing]");
        cy.get("@element4").contains("2");
        cy.get("@element4").children("[class*=circle_modified]");
        cy.get("@element5").contains("1");
        cy.get("@element5").children("[class*=circle_modified]");
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element2").contains("4");
        cy.get("@element3").contains("3");
        cy.get("@element4").contains("2");
        cy.get("@element5").contains("1");
        cy.get("[class*=circle_content]").should("have.length", 5).each(
          ($el) => {
            cy.wrap($el).children("[class*=circle_modified]");               
          }
        );          
        cy.wait(Delay.Medium);        
        
        // check changes
        cy.get("@element1").contains("5");
        cy.get("@element2").contains("4");
        cy.get("@element3").contains("3");
        cy.get("@element4").contains("2");
        cy.get("@element5").contains("1");
        cy.get("[class*=circle_content]").should("have.length", 5).each(
          ($el) => {
            cy.wrap($el).children("[class*=circle_default]");               
          }
        );             
      }
    );
  }
);
