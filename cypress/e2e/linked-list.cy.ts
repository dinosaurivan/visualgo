import { 
  allCirclesSelector, 
  defaultCircleSelector, 
  changingCircleSelector, 
  modifiedCircleSelector 
} from "./constants";
import { Delay } from "../../src/utils/constants";



describe(
  "Linked List page tests", () => {
    
    beforeEach(
      () => {
        cy.visit("linked-list");
      }
    );
    
    it(
      "enables and disables buttons based on inputs content and list state", () => {
        
        // check input states with default list
        cy.getByTestId("value-input").should("be.empty").as("valueInput");
        cy.getByTestId("index-input").should("be.empty").as("indexInput");
        
        // check button states with default list
        cy.getByTestId("unshift-button").should("be.disabled").as("unshiftButton");
        cy.getByTestId("push-button").should("be.disabled").as("pushButton");
        cy.getByTestId("shift-button").should("be.enabled").as("shiftButton");
        cy.getByTestId("pop-button").should("be.enabled").as("popButton");
        cy.getByTestId("insert-button").should("be.disabled").as("insertButton");
        cy.getByTestId("remove-button").should("be.disabled").as("removeButton");
        
        // unshift element
        cy.get("@valueInput").type("42");
        cy.get("@unshiftButton").should("be.enabled");
        cy.get("@pushButton").should("be.enabled");
        cy.get("@shiftButton").should("be.enabled");
        cy.get("@popButton").should("be.enabled");
        cy.get("@insertButton").should("be.disabled");
        cy.get("@removeButton").should("be.disabled");
        cy.getByTestId("value-form").submit();
        
        // check initial changes to inputs 
        cy.get("@valueInput").should("be.empty");
        cy.get("@indexInput").should("be.empty");
        
        // check initial changes to buttons
        cy.get("@unshiftButton").should("be.disabled");
        cy.get("@pushButton").should("be.disabled");
        cy.get("@shiftButton").should("be.disabled");
        cy.get("@popButton").should("be.disabled");
        cy.get("@insertButton").should("be.disabled");
        cy.get("@removeButton").should("be.disabled");   
        
        cy.wait(Delay.Medium * 3);
        
        // insert element
        cy.get("@valueInput").type("69");
        cy.get("@indexInput").type("3");
        cy.get("@unshiftButton").should("be.enabled");
        cy.get("@pushButton").should("be.enabled");
        cy.get("@shiftButton").should("be.enabled");
        cy.get("@popButton").should("be.enabled");
        cy.get("@insertButton").should("be.enabled");
        cy.get("@removeButton").should("be.enabled");
        cy.getByTestId("index-form").submit();
        
        // check initial changes to inputs 
        cy.get("@valueInput").should("be.empty");
        cy.get("@indexInput").should("be.empty");
        
        // check initial changes to buttons
        cy.get("@unshiftButton").should("be.disabled");
        cy.get("@pushButton").should("be.disabled");
        cy.get("@shiftButton").should("be.disabled");
        cy.get("@popButton").should("be.disabled");
        cy.get("@insertButton").should("be.disabled");
        cy.get("@removeButton").should("be.disabled");   
        
        cy.wait(Delay.Medium * 6);        
        
        // check states with various value input values
        cy.get("@valueInput").type(" ");
        cy.get("@unshiftButton").should("be.enabled");
        cy.get("@pushButton").should("be.enabled");
        cy.get("@shiftButton").should("be.enabled");
        cy.get("@popButton").should("be.enabled");
        
        cy.get("@valueInput").clear();
        cy.get("@valueInput").should("be.empty");
        cy.get("@unshiftButton").should("be.disabled");
        cy.get("@pushButton").should("be.disabled");
        cy.get("@shiftButton").should("be.enabled");
        cy.get("@popButton").should("be.enabled");
        
        cy.get("@valueInput").type("12345");
        cy.get("@valueInput").should("have.value", "1234");
        cy.get("@unshiftButton").should("be.enabled");
        cy.get("@pushButton").should("be.enabled");
        cy.get("@shiftButton").should("be.enabled");
        cy.get("@popButton").should("be.enabled");
        
        // check states with various index input values
        cy.get("@indexInput").type("-1");
        cy.get("@insertButton").should("be.disabled");
        cy.get("@removeButton").should("be.disabled");
        
        cy.get("@indexInput").clear();
        cy.get("@indexInput").should("be.empty");
        cy.get("@insertButton").should("be.disabled");
        cy.get("@removeButton").should("be.disabled");
        
        cy.get("@indexInput").type("0");
        cy.get("@indexInput").should("have.value", "0");
        cy.get("@insertButton").should("be.enabled");
        cy.get("@removeButton").should("be.enabled");        
        
        cy.get("@indexInput").clear();
        cy.get("@indexInput").should("be.empty");
        cy.get("@indexInput").type("6");
        cy.get("@indexInput").should("have.value", "6");
        cy.get("@insertButton").should("be.enabled");
        cy.get("@removeButton").should("be.enabled");        
        
        cy.get("@indexInput").clear();
        cy.get("@indexInput").should("be.empty");
        cy.get("@indexInput").type("7");
        cy.get("@indexInput").should("have.value", "7");
        cy.get("@insertButton").should("be.enabled");
        cy.get("@removeButton").should("be.disabled");        
        
        cy.get("@indexInput").clear();
        cy.get("@indexInput").should("be.empty");
        cy.get("@indexInput").type("8");
        cy.get("@indexInput").should("have.value", "8");
        cy.get("@insertButton").should("be.disabled");
        cy.get("@removeButton").should("be.disabled");          
        
        // erase the list 
        for (let i = 0; i < 7; i++) {
          cy.get("@shiftButton").click();
          cy.wait(Delay.Medium * 3);
        };
        
        // check button states with empty list
        cy.get("@unshiftButton").should("be.enabled");
        cy.get("@pushButton").should("be.enabled");
        cy.get("@shiftButton").should("be.disabled");
        cy.get("@popButton").should("be.disabled");
        cy.get("@insertButton").should("be.disabled");
        cy.get("@removeButton").should("be.disabled");       
        
        // erase the content in inputs
        cy.get("@indexInput").clear();
        cy.get("@indexInput").should("be.empty");
        cy.get("@valueInput").clear();
        cy.get("@valueInput").should("be.empty");
        
        // check button states with empty inputs
        cy.get("@unshiftButton").should("be.disabled");
        cy.get("@pushButton").should("be.disabled");
        cy.get("@shiftButton").should("be.disabled");
        cy.get("@popButton").should("be.disabled");
        cy.get("@insertButton").should("be.disabled");
        cy.get("@removeButton").should("be.disabled");           
      }
    );
    
    it(
      "renders default list of 5 elements with random numbers", () => {
        
        cy.get(allCirclesSelector).should("have.length", 5).each(
          ($el, index) => {
            cy.wrap($el).children(defaultCircleSelector); 
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
        cy.get(allCirclesSelector).first().as("element1");
        cy.get(allCirclesSelector).eq(1).as("element2");
        
        // check initial change
        cy.get(allCirclesSelector).should("have.length", 7);
        cy.get("@element1").should("not.contain.text");
        cy.get("@element1").children(modifiedCircleSelector);
        cy.get("@element2").contains("111");
        cy.get("@element2").children(changingCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get(allCirclesSelector).should("have.length", 6);
        cy.get("@element1").contains("111");
        cy.get("@element1").contains("head");
        cy.get("@element1").children(modifiedCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element1").contains("111");
        cy.get("@element1").contains("head");
        cy.get(allCirclesSelector).should("have.length", 6).each(($el) => {
          cy.wrap($el).children(defaultCircleSelector); 
        });
      }
    );
    
    it(
      "correctly pushes to linked list (adds element to tail)", () => {
        
        // make action
        cy.getByTestId("value-input").type("999");
        cy.getByTestId("push-button").click();
        
        // define getters
        cy.get(allCirclesSelector).first().as("element1");
        cy.get(allCirclesSelector).eq(1).as("element2");
        cy.get(allCirclesSelector).eq(2).as("element3");
        cy.get(allCirclesSelector).eq(3).as("element4");
        cy.get(allCirclesSelector).eq(4).as("element5");
        
        // check initial change
        cy.get(allCirclesSelector).should("have.length", 6);
        cy.get(allCirclesSelector).eq(5).as("element6");
        cy.get("@element1").should("not.contain", "head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("999");
        cy.get("@element2").children(changingCircleSelector);
        cy.get("@element6").contains("tail");
        cy.get("@element6").children(defaultCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change      
        cy.get(allCirclesSelector).should("have.length", 6);     
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("999");
        cy.get("@element3").children(changingCircleSelector);
        cy.get("@element6").contains("tail");
        cy.get("@element6").children(defaultCircleSelector);        
        
        cy.wait(Delay.Medium);
        
        // check delayed change      
        cy.get(allCirclesSelector).should("have.length", 6);     
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").contains("999");
        cy.get("@element4").children(changingCircleSelector);     
        cy.get("@element6").contains("tail");
        cy.get("@element6").children(defaultCircleSelector);           
        
        cy.wait(Delay.Medium);
        
        // check delayed change      
        cy.get(allCirclesSelector).should("have.length", 6);     
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").children(defaultCircleSelector);
        cy.get("@element5").contains("999");
        cy.get("@element5").children(changingCircleSelector);    
        cy.get("@element6").contains("tail");
        cy.get("@element6").children(defaultCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change      
        cy.get(allCirclesSelector).should("have.length", 6);     
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").children(defaultCircleSelector);
        cy.get("@element5").contains("tail");
        cy.get("@element5").children(defaultCircleSelector);
        cy.get("@element6").contains("999");
        cy.get("@element6").children(changingCircleSelector);            
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get(allCirclesSelector).should("have.length", 7).eq(6).as("element7");
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").children(defaultCircleSelector);
        cy.get("@element5").children(defaultCircleSelector);
        cy.get("@element6").contains("tail");
        cy.get("@element6").children(modifiedCircleSelector);
        cy.get("@element7").contains("999");
        cy.get("@element7").children(changingCircleSelector);             
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get(allCirclesSelector).should("have.length", 6);
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").children(defaultCircleSelector);
        cy.get("@element4").children(defaultCircleSelector);
        cy.get("@element5").children(defaultCircleSelector);
        cy.get("@element6").contains("999");
        cy.get("@element6").contains("tail");
        cy.get("@element6").children(modifiedCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element1").contains("head");
        cy.get("@element6").contains("999");
        cy.get("@element6").contains("tail");     
        cy.get(allCirclesSelector).should("have.length", 6).each(($el) => {
          cy.wrap($el).children(defaultCircleSelector); 
        });
      }
    );    
    
    it(
      "correctly shifts linked list (deletes element from head)", () => {
        
        // make action
        cy.getByTestId("shift-button").click();
        
        // define getters
        cy.get(allCirclesSelector).first().as("element1");
        cy.get(allCirclesSelector).eq(1).as("element2");
        
        // check initial change
        cy.get(allCirclesSelector).should("have.length", 5);
        cy.get("@element1").should("not.contain", "head");
        cy.get("@element1").children(changingCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change      
        cy.get(allCirclesSelector).should("have.length", 6);
        cy.get("@element1").should("not.contain.text");
        cy.get("@element1").should("not.contain", "head");
        cy.get("@element1").children(changingCircleSelector);
        cy.get("@element2").children(changingCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change  
        cy.get(allCirclesSelector).should("have.length", 4);
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);           
      }
    );    
    
    it(
      "correctly pops from linked list (deletes element from tail)", () => {
        
        // make action
        cy.getByTestId("pop-button").click();
        
        // define getters
        cy.get(allCirclesSelector).first().as("element1");
        cy.get(allCirclesSelector).eq(1).as("element2");
        cy.get(allCirclesSelector).eq(2).as("element3");
        cy.get(allCirclesSelector).eq(3).as("element4");
        cy.get(allCirclesSelector).eq(4).as("element5");
        
        // check initial change
        cy.get(allCirclesSelector).should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children(changingCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);              
        cy.get("@element3").children(defaultCircleSelector);              
        cy.get("@element4").children(defaultCircleSelector);     
        cy.get("@element5").contains("tail");
        cy.get("@element5").children(defaultCircleSelector);  
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get(allCirclesSelector).should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(changingCircleSelector);              
        cy.get("@element3").children(defaultCircleSelector);              
        cy.get("@element4").children(defaultCircleSelector);    
        cy.get("@element5").contains("tail");
        cy.get("@element5").children(defaultCircleSelector);  
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get(allCirclesSelector).should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);              
        cy.get("@element3").children(changingCircleSelector);              
        cy.get("@element4").children(defaultCircleSelector); 
        cy.get("@element5").contains("tail");
        cy.get("@element5").children(defaultCircleSelector);  
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get(allCirclesSelector).should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);              
        cy.get("@element3").children(defaultCircleSelector);              
        cy.get("@element4").children(changingCircleSelector);      
        cy.get("@element5").contains("tail");
        cy.get("@element5").children(defaultCircleSelector);  
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get(allCirclesSelector).should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);              
        cy.get("@element3").children(defaultCircleSelector);   
        cy.get("@element4").contains("tail");
        cy.get("@element4").children(defaultCircleSelector);              
        cy.get("@element5").children(changingCircleSelector);  
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get(allCirclesSelector).should("have.length", 6).eq(5).as("element6");  
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);              
        cy.get("@element3").children(defaultCircleSelector);   
        cy.get("@element4").contains("tail");
        cy.get("@element4").children(defaultCircleSelector);              
        cy.get("@element5").should("not.contain.text");
        cy.get("@element5").children(changingCircleSelector);          
        cy.get("@element6").children(changingCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change
        cy.get("@element1").contains("head");
        cy.get("@element4").contains("tail");
        cy.get(allCirclesSelector).should("have.length", 4).each(($el) => {
          cy.wrap($el).children(defaultCircleSelector);
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
        cy.get(allCirclesSelector).first().as("element1");
        cy.get(allCirclesSelector).eq(1).as("element2");
        cy.get(allCirclesSelector).eq(2).as("element3");
        cy.get(allCirclesSelector).eq(3).as("element4");
        cy.get(allCirclesSelector).eq(4).as("element5");
        
        // check initial change
        cy.get(allCirclesSelector).should("have.length", 6);
        cy.get(allCirclesSelector).eq(5).as("element6");
        cy.get("@element1").should("not.contain", "head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").contains("555");
        cy.get("@element2").children(changingCircleSelector);
        cy.get("@element6").contains("tail");
        cy.get("@element6").children(defaultCircleSelector);
        
        cy.wait(Delay.Medium);
        
        // check delayed change             
        cy.get(allCirclesSelector).should("have.length", 6);
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("555");
        cy.get("@element3").children(changingCircleSelector);
        cy.get("@element6").contains("tail");
        cy.get("@element6").children(defaultCircleSelector);
        
        cy.wait(Delay.Medium);         
        
        // check delayed change             
        cy.get(allCirclesSelector).should("have.length", 7).eq(6).as("element7");
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").should("not.contain.text");
        cy.get("@element3").children(modifiedCircleSelector);
        cy.get("@element4").contains("555");
        cy.get("@element4").children(changingCircleSelector);
        cy.get("@element7").contains("tail");
        cy.get("@element7").children(defaultCircleSelector);
        
        cy.wait(Delay.Medium);              
        
        // check delayed change             
        cy.get(allCirclesSelector).should("have.length", 6);
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);
        cy.get("@element3").contains("555");
        cy.get("@element3").children(modifiedCircleSelector);
        cy.get("@element6").contains("tail");
        cy.get("@element6").children(defaultCircleSelector);
        
        cy.wait(Delay.Medium);              
        
        // check delayed change             
        cy.get("@element1").contains("head");
        cy.get("@element3").contains("555");
        cy.get("@element6").contains("tail");
        cy.get(allCirclesSelector).should("have.length", 6).each(($el) => {
          cy.wrap($el).children(defaultCircleSelector);
        });
      }
    );    
    
    it(
      "correctly removes from linked list (deletes element by index)", () => {
        
        // make action
        cy.getByTestId("index-input").type("2");
        cy.getByTestId("remove-button").click();
        
        // define getters
        cy.get(allCirclesSelector).first().as("element1");
        cy.get(allCirclesSelector).eq(1).as("element2");
        cy.get(allCirclesSelector).eq(2).as("element3");
        cy.get(allCirclesSelector).eq(3).as("element4");
        cy.get(allCirclesSelector).eq(4).as("element5");
        
        // check initial change
        cy.get(allCirclesSelector).should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children(changingCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);              
        cy.get("@element3").children(defaultCircleSelector);              
        cy.get("@element4").children(defaultCircleSelector);     
        cy.get("@element5").contains("tail");
        cy.get("@element5").children(defaultCircleSelector);  
        
        cy.wait(Delay.Medium);
        
        // check delayed change        
        cy.get(allCirclesSelector).should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(changingCircleSelector);              
        cy.get("@element3").children(defaultCircleSelector);              
        cy.get("@element4").children(defaultCircleSelector);     
        cy.get("@element5").contains("tail");
        cy.get("@element5").children(defaultCircleSelector);          
        
        cy.wait(Delay.Medium);
        
        // check delayed change        
        cy.get(allCirclesSelector).should("have.length", 5);  
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);              
        cy.get("@element3").children(changingCircleSelector);              
        cy.get("@element4").children(defaultCircleSelector);     
        cy.get("@element5").contains("tail");
        cy.get("@element5").children(defaultCircleSelector);               
        
        cy.wait(Delay.Medium);
        
        // check delayed change        
        cy.get(allCirclesSelector).should("have.length", 6).eq(5).as("element6");  
        cy.get("@element1").contains("head");
        cy.get("@element1").children(defaultCircleSelector);
        cy.get("@element2").children(defaultCircleSelector);              
        cy.get("@element3").children(changingCircleSelector);              
        cy.get("@element4").children(changingCircleSelector);     
        cy.get("@element6").contains("tail");
        cy.get("@element6").children(defaultCircleSelector);                
        
        cy.wait(Delay.Medium);
        
        // check delayed change        
        cy.get("@element1").contains("head");
        cy.get("@element4").contains("tail");
        cy.get(allCirclesSelector).should("have.length", 4).each(($el) => {
          cy.wrap($el).children(defaultCircleSelector);
        });  
      }
    );    
  }
);
