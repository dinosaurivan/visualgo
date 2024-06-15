import { Delay } from "../../src/utils/constants";



describe(
  "Linked List page tests", () => {
    
    beforeEach(
      () => {
        cy.visit("http://localhost:3000/linked-list");
        
        cy.get("[class*=circle_content]").should("have.length", 5).each(($el) => {
          cy.wrap($el).children("[class*=circle_default]"); 
        });        
      }
    );
    
    it(
      "enables and disables buttons based on inputs content and list state", () => {
        
        // check input states with default list
        cy.getByTestId("value-input").should("be.empty");
        cy.getByTestId("index-input").should("be.empty");
        
        // check button states with default list
        cy.getByTestId("unshift-button").should("be.disabled");
        cy.getByTestId("push-button").should("be.disabled");
        cy.getByTestId("shift-button").should("be.enabled");
        cy.getByTestId("pop-button").should("be.enabled");
        cy.getByTestId("insert-button").should("be.disabled");
        cy.getByTestId("remove-button").should("be.disabled");
        
        // unshift element
        cy.getByTestId("value-input").type("42");
        cy.getByTestId("unshift-button").should("be.enabled");
        cy.getByTestId("push-button").should("be.enabled");
        cy.getByTestId("shift-button").should("be.enabled");
        cy.getByTestId("pop-button").should("be.enabled");
        cy.getByTestId("insert-button").should("be.disabled");
        cy.getByTestId("remove-button").should("be.disabled");
        cy.getByTestId("value-form").submit();
        
        // check initial changes to inputs 
        cy.getByTestId("value-input").should("be.empty");
        cy.getByTestId("index-input").should("be.empty");
        
        // check initial changes to buttons
        cy.getByTestId("unshift-button").should("be.disabled");
        cy.getByTestId("push-button").should("be.disabled");
        cy.getByTestId("shift-button").should("be.disabled");
        cy.getByTestId("pop-button").should("be.disabled");
        cy.getByTestId("insert-button").should("be.disabled");
        cy.getByTestId("remove-button").should("be.disabled");   
        
        cy.wait(Delay.Medium * 3);
        
        // insert element
        cy.getByTestId("value-input").type("69");
        cy.getByTestId("index-input").type("3");
        cy.getByTestId("unshift-button").should("be.enabled");
        cy.getByTestId("push-button").should("be.enabled");
        cy.getByTestId("shift-button").should("be.enabled");
        cy.getByTestId("pop-button").should("be.enabled");
        cy.getByTestId("insert-button").should("be.enabled");
        cy.getByTestId("remove-button").should("be.enabled");
        cy.getByTestId("index-form").submit();
        
        // check initial changes to inputs 
        cy.getByTestId("value-input").should("be.empty");
        cy.getByTestId("index-input").should("be.empty");
        
        // check initial changes to buttons
        cy.getByTestId("unshift-button").should("be.disabled");
        cy.getByTestId("push-button").should("be.disabled");
        cy.getByTestId("shift-button").should("be.disabled");
        cy.getByTestId("pop-button").should("be.disabled");
        cy.getByTestId("insert-button").should("be.disabled");
        cy.getByTestId("remove-button").should("be.disabled");   
        
        cy.wait(Delay.Medium * 6);        
        
        // check states with various value input values
        cy.getByTestId("value-input").type(" ");
        cy.getByTestId("unshift-button").should("be.enabled");
        cy.getByTestId("push-button").should("be.enabled");
        cy.getByTestId("shift-button").should("be.enabled");
        cy.getByTestId("pop-button").should("be.enabled");
        
        cy.getByTestId("value-input").clear();
        cy.getByTestId("value-input").should("be.empty");
        cy.getByTestId("unshift-button").should("be.disabled");
        cy.getByTestId("push-button").should("be.disabled");
        cy.getByTestId("shift-button").should("be.enabled");
        cy.getByTestId("pop-button").should("be.enabled");
        
        cy.getByTestId("value-input").type("12345");
        cy.getByTestId("value-input").should("have.value", "1234");
        cy.getByTestId("unshift-button").should("be.enabled");
        cy.getByTestId("push-button").should("be.enabled");
        cy.getByTestId("shift-button").should("be.enabled");
        cy.getByTestId("pop-button").should("be.enabled");
        
        // check states with various index input values
        cy.getByTestId("index-input").type("-1");
        cy.getByTestId("insert-button").should("be.disabled");
        cy.getByTestId("remove-button").should("be.disabled");
        
        cy.getByTestId("index-input").clear();
        cy.getByTestId("index-input").should("be.empty");
        cy.getByTestId("insert-button").should("be.disabled");
        cy.getByTestId("remove-button").should("be.disabled");
        
        cy.getByTestId("index-input").type("0");
        cy.getByTestId("index-input").should("have.value", "0");
        cy.getByTestId("insert-button").should("be.enabled");
        cy.getByTestId("remove-button").should("be.enabled");        
        
        cy.getByTestId("index-input").clear();
        cy.getByTestId("index-input").should("be.empty");
        cy.getByTestId("index-input").type("6");
        cy.getByTestId("index-input").should("have.value", "6");
        cy.getByTestId("insert-button").should("be.enabled");
        cy.getByTestId("remove-button").should("be.enabled");        
        
        cy.getByTestId("index-input").clear();
        cy.getByTestId("index-input").should("be.empty");
        cy.getByTestId("index-input").type("7");
        cy.getByTestId("index-input").should("have.value", "7");
        cy.getByTestId("insert-button").should("be.enabled");
        cy.getByTestId("remove-button").should("be.disabled");        
        
        cy.getByTestId("index-input").clear();
        cy.getByTestId("index-input").should("be.empty");
        cy.getByTestId("index-input").type("8");
        cy.getByTestId("index-input").should("have.value", "8");
        cy.getByTestId("insert-button").should("be.disabled");
        cy.getByTestId("remove-button").should("be.disabled");          
        
        // erase the list 
        for (let i = 0; i < 7; i++) {
          cy.getByTestId("shift-button").click();
          cy.wait(Delay.Medium * 3);
        };
        
        // check button states with empty list
        cy.getByTestId("unshift-button").should("be.enabled");
        cy.getByTestId("push-button").should("be.enabled");
        cy.getByTestId("shift-button").should("be.disabled");
        cy.getByTestId("pop-button").should("be.disabled");
        cy.getByTestId("insert-button").should("be.disabled");
        cy.getByTestId("remove-button").should("be.disabled");       
        
        // erase the content in inputs
        cy.getByTestId("index-input").clear();
        cy.getByTestId("index-input").should("be.empty");
        cy.getByTestId("value-input").clear();
        cy.getByTestId("value-input").should("be.empty");
        
        // check button states with empty inputs
        cy.getByTestId("unshift-button").should("be.disabled");
        cy.getByTestId("push-button").should("be.disabled");
        cy.getByTestId("shift-button").should("be.disabled");
        cy.getByTestId("pop-button").should("be.disabled");
        cy.getByTestId("insert-button").should("be.disabled");
        cy.getByTestId("remove-button").should("be.disabled");           
      }
    );
    
    it(
      "renders default list of 5 elements with random numbers", () => {
        
        cy.get("[class*=circle_content]").should("have.length", 5).each(
          ($el, index) => {
            cy.wrap($el).children("[class*=circle_default]"); 
            const digit = index === 0
                          ? $el[0].innerText.split("\n")[2]
                          : $el[0].innerText.split("\n")[0]
            const number = Number(digit);
            expect(number).to.be.within(1, 100);
          }
        );
      }
    );
    
    it(
      "correctly unshifts linked list (adds element to head)", () => {
        
        // make action
        cy.getByTestId("value-input").type("111");
        cy.getByTestId("unshift-button").click();
        
        // define getters
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("[class*=circle_content]").eq(1).as("element2");
        
        // check initial change
        cy.get("[class*=circle_content]").should("have.length", 7);
        cy.get("@element1").should("not.contain.text");
        cy.get("@element1").children("[class*=circle_modified]");
        cy.get("@element2").contains("111");
        cy.get("@element2").children("[class*=circle_changing]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("[class*=circle_content]").should("have.length", 6);
        cy.get("@element1").contains("111");
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_modified]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element1").contains("111");
        cy.get("@element1").contains("head");
        cy.get("[class*=circle_content]").should("have.length", 6).each(($el) => {
          cy.wrap($el).children("[class*=circle_default]"); 
        });
      }
    );
    
    it(
      "correctly pushes to linked list (adds element to tail)", () => {
        
        // make action
        cy.getByTestId("value-input").type("999");
        cy.getByTestId("push-button").click();
        
        // define getters
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("[class*=circle_content]").eq(1).as("element2");
        cy.get("[class*=circle_content]").eq(2).as("element3");
        cy.get("[class*=circle_content]").eq(3).as("element4");
        cy.get("[class*=circle_content]").eq(4).as("element5");
        
        // check initial change
        cy.get("[class*=circle_content]").should("have.length", 6);
        cy.get("[class*=circle_content]").eq(5).as("element6");
        cy.get("@element1").should("not.contain", "head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("999");
        cy.get("@element2").children("[class*=circle_changing]");
        cy.get("@element6").contains("tail");
        cy.get("@element6").children("[class*=circle_default]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change      
        cy.get("[class*=circle_content]").should("have.length", 6);     
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("999");
        cy.get("@element3").children("[class*=circle_changing]");
        cy.get("@element6").contains("tail");
        cy.get("@element6").children("[class*=circle_default]");        
        
        cy.wait(Delay.Medium);
        
        // check delayed change      
        cy.get("[class*=circle_content]").should("have.length", 6);     
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").contains("999");
        cy.get("@element4").children("[class*=circle_changing]");     
        cy.get("@element6").contains("tail");
        cy.get("@element6").children("[class*=circle_default]");           
        
        cy.wait(Delay.Medium);
        
        // check delayed change      
        cy.get("[class*=circle_content]").should("have.length", 6);     
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").children("[class*=circle_default]");
        cy.get("@element5").contains("999");
        cy.get("@element5").children("[class*=circle_changing]");    
        cy.get("@element6").contains("tail");
        cy.get("@element6").children("[class*=circle_default]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change      
        cy.get("[class*=circle_content]").should("have.length", 6);     
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").children("[class*=circle_default]");
        cy.get("@element5").contains("tail");
        cy.get("@element5").children("[class*=circle_default]");
        cy.get("@element6").contains("999");
        cy.get("@element6").children("[class*=circle_changing]");            
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("[class*=circle_content]").should("have.length", 7).eq(6).as("element7");
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").children("[class*=circle_default]");
        cy.get("@element5").children("[class*=circle_default]");
        cy.get("@element6").contains("tail");
        cy.get("@element6").children("[class*=circle_modified]");
        cy.get("@element7").contains("999");
        cy.get("@element7").children("[class*=circle_changing]");             
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("[class*=circle_content]").should("have.length", 6);
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").children("[class*=circle_default]");
        cy.get("@element4").children("[class*=circle_default]");
        cy.get("@element5").children("[class*=circle_default]");
        cy.get("@element6").contains("999");
        cy.get("@element6").contains("tail");
        cy.get("@element6").children("[class*=circle_modified]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element1").contains("head");
        cy.get("@element6").contains("999");
        cy.get("@element6").contains("tail");     
        cy.get("[class*=circle_content]").should("have.length", 6).each(($el) => {
          cy.wrap($el).children("[class*=circle_default]"); 
        });
      }
    );    
    
    it(
      "correctly shifts linked list (deletes element from head)", () => {
        
        // make action
        cy.getByTestId("shift-button").click();
        
        // define getters
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("[class*=circle_content]").eq(1).as("element2");
        
        // check initial change
        cy.get("[class*=circle_content]").should("have.length", 5);
        cy.get("@element1").should("not.contain", "head");
        cy.get("@element1").children("[class*=circle_changing]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change      
        cy.get("[class*=circle_content]").should("have.length", 6);
        cy.get("@element1").should("not.contain.text");
        cy.get("@element1").should("not.contain", "head");
        cy.get("@element1").children("[class*=circle_changing]");
        cy.get("@element2").children("[class*=circle_changing]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change  
        cy.get("[class*=circle_content]").should("have.length", 4);
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");           
      }
    );    
    
    it(
      "correctly pops from linked list (deletes element from tail)", () => {
        
        // make action
        cy.getByTestId("pop-button").click();
        
        // define getters
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("[class*=circle_content]").eq(1).as("element2");
        cy.get("[class*=circle_content]").eq(2).as("element3");
        cy.get("[class*=circle_content]").eq(3).as("element4");
        cy.get("[class*=circle_content]").eq(4).as("element5");
        
        // check initial change
        cy.get("[class*=circle_content]").should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_changing]");
        cy.get("@element2").children("[class*=circle_default]");              
        cy.get("@element3").children("[class*=circle_default]");              
        cy.get("@element4").children("[class*=circle_default]");     
        cy.get("@element5").contains("tail");
        cy.get("@element5").children("[class*=circle_default]");  
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("[class*=circle_content]").should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_changing]");              
        cy.get("@element3").children("[class*=circle_default]");              
        cy.get("@element4").children("[class*=circle_default]");    
        cy.get("@element5").contains("tail");
        cy.get("@element5").children("[class*=circle_default]");  
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("[class*=circle_content]").should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");              
        cy.get("@element3").children("[class*=circle_changing]");              
        cy.get("@element4").children("[class*=circle_default]"); 
        cy.get("@element5").contains("tail");
        cy.get("@element5").children("[class*=circle_default]");  
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("[class*=circle_content]").should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");              
        cy.get("@element3").children("[class*=circle_default]");              
        cy.get("@element4").children("[class*=circle_changing]");      
        cy.get("@element5").contains("tail");
        cy.get("@element5").children("[class*=circle_default]");  
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("[class*=circle_content]").should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");              
        cy.get("@element3").children("[class*=circle_default]");   
        cy.get("@element4").contains("tail");
        cy.get("@element4").children("[class*=circle_default]");              
        cy.get("@element5").children("[class*=circle_changing]");  
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("[class*=circle_content]").should("have.length", 6).eq(5).as("element6");  
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");              
        cy.get("@element3").children("[class*=circle_default]");   
        cy.get("@element4").contains("tail");
        cy.get("@element4").children("[class*=circle_default]");              
        cy.get("@element5").should("not.contain.text");
        cy.get("@element5").children("[class*=circle_changing]");          
        cy.get("@element6").children("[class*=circle_changing]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element1").contains("head");
        cy.get("@element4").contains("tail");
        cy.get("[class*=circle_content]").should("have.length", 4).each(($el) => {
          cy.wrap($el).children("[class*=circle_default]");
        });  
      }
    );    
    
    it(
      "correctly inserts to linked list (adds element by index)", () => {
        
        // make action
        cy.getByTestId("value-input").type("555");
        cy.getByTestId("index-input").type("2");
        cy.getByTestId("insert-button").click();
        
        // define getters
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("[class*=circle_content]").eq(1).as("element2");
        cy.get("[class*=circle_content]").eq(2).as("element3");
        cy.get("[class*=circle_content]").eq(3).as("element4");
        cy.get("[class*=circle_content]").eq(4).as("element5");
        
        // check initial change
        cy.get("[class*=circle_content]").should("have.length", 6);
        cy.get("[class*=circle_content]").eq(5).as("element6");
        cy.get("@element1").should("not.contain", "head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").contains("555");
        cy.get("@element2").children("[class*=circle_changing]");
        cy.get("@element6").contains("tail");
        cy.get("@element6").children("[class*=circle_default]");
        
        cy.wait(Delay.Medium);
        
        // check delayed change             
        cy.get("[class*=circle_content]").should("have.length", 6);
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("555");
        cy.get("@element3").children("[class*=circle_changing]");
        cy.get("@element6").contains("tail");
        cy.get("@element6").children("[class*=circle_default]");
        
        cy.wait(Delay.Medium);         
        
        // check delayed change             
        cy.get("[class*=circle_content]").should("have.length", 7).eq(6).as("element7");
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").should("not.contain.text");
        cy.get("@element3").children("[class*=circle_modified]");
        cy.get("@element4").contains("555");
        cy.get("@element4").children("[class*=circle_changing]");
        cy.get("@element7").contains("tail");
        cy.get("@element7").children("[class*=circle_default]");
        
        cy.wait(Delay.Medium);              
        
        // check delayed change             
        cy.get("[class*=circle_content]").should("have.length", 6);
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");
        cy.get("@element3").contains("555");
        cy.get("@element3").children("[class*=circle_modified]");
        cy.get("@element6").contains("tail");
        cy.get("@element6").children("[class*=circle_default]");
        
        cy.wait(Delay.Medium);              
        
        // check delayed change             
        cy.get("@element1").contains("head");
        cy.get("@element3").contains("555");
        cy.get("@element6").contains("tail");
        cy.get("[class*=circle_content]").should("have.length", 6).each(($el) => {
          cy.wrap($el).children("[class*=circle_default]");
        });
      }
    );    
    
    it(
      "correctly removes from linked list (deletes element by index)", () => {
        
        // make action
        cy.getByTestId("index-input").type("2");
        cy.getByTestId("remove-button").click();
        
        // define getters
        cy.get("[class*=circle_content]").first().as("element1");
        cy.get("[class*=circle_content]").eq(1).as("element2");
        cy.get("[class*=circle_content]").eq(2).as("element3");
        cy.get("[class*=circle_content]").eq(3).as("element4");
        cy.get("[class*=circle_content]").eq(4).as("element5");
        
        // check initial change
        cy.get("[class*=circle_content]").should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_changing]");
        cy.get("@element2").children("[class*=circle_default]");              
        cy.get("@element3").children("[class*=circle_default]");              
        cy.get("@element4").children("[class*=circle_default]");     
        cy.get("@element5").contains("tail");
        cy.get("@element5").children("[class*=circle_default]");  
        
        cy.wait(Delay.Medium);
        
        // check delayed change        
        cy.get("[class*=circle_content]").should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_changing]");              
        cy.get("@element3").children("[class*=circle_default]");              
        cy.get("@element4").children("[class*=circle_default]");     
        cy.get("@element5").contains("tail");
        cy.get("@element5").children("[class*=circle_default]");          
        
        cy.wait(Delay.Medium);
        
        // check delayed change        
        cy.get("[class*=circle_content]").should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");              
        cy.get("@element3").children("[class*=circle_changing]");              
        cy.get("@element4").children("[class*=circle_default]");     
        cy.get("@element5").contains("tail");
        cy.get("@element5").children("[class*=circle_default]");               
        
        cy.wait(Delay.Medium);
        
        // check delayed change        
        cy.get("[class*=circle_content]").should("have.length", 6).eq(5).as("element6");  
        cy.get("@element1").contains("head");
        cy.get("@element1").children("[class*=circle_default]");
        cy.get("@element2").children("[class*=circle_default]");              
        cy.get("@element3").children("[class*=circle_changing]");              
        cy.get("@element4").children("[class*=circle_changing]");     
        cy.get("@element6").contains("tail");
        cy.get("@element6").children("[class*=circle_default]");                
        
        cy.wait(Delay.Medium);
        
        // check delayed change        
        cy.get("@element1").contains("head");
        cy.get("@element4").contains("tail");
        cy.get("[class*=circle_content]").should("have.length", 4).each(($el) => {
          cy.wrap($el).children("[class*=circle_default]");
        });  
      }
    );    
  }
);
