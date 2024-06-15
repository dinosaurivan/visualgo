// libraries 
import React from "react";
import { render, screen } from "@testing-library/react";

// components
import { Circle } from "./circle";
import { ElementColors } from "../../utils/constants";



describe(
  "Circle UI component tests", 
  () => {
    
    test(
      "renders correctly with value provided", 
      () => {
        // arrange & act
        render(<Circle value="value inside" />);
        const component = screen.getByTestId("circle");
        const circle = screen.getByTestId("inside");
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        expect(circle).toBeInTheDocument();
        expect(circle).toMatchSnapshot();
        
        expect(component).toHaveClass("content");
        expect(circle).toHaveClass("circle default");
        expect(circle).toHaveTextContent("value inside");
      }
    );
    
    test(
      "renders correctly without value provided", 
      () => {
        // arrange & act
        render(<Circle />);
        const component = screen.getByTestId("circle");
        const circle = screen.getByTestId("inside");
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        expect(circle).toBeInTheDocument();
        expect(circle).toMatchSnapshot();        
        
        expect(component).toHaveClass("content");
        expect(circle).toHaveClass("circle default");
        expect(circle).toHaveTextContent("");
      }
    );
    
    test(
      "renders correctly with isSmall prop is set to true",       
      () => {
        // arrange & act
        render(<Circle isSmall={true} value="value inside" />);
        const component = screen.getByTestId("circle");
        const circle = screen.getByTestId("inside");
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        expect(circle).toBeInTheDocument();
        expect(circle).toMatchSnapshot();
        
        expect(component).toHaveClass("content");
        expect(circle).toHaveClass("circle default small");
        expect(circle).toHaveTextContent("value inside");      
    });       
    
    test(
      "renders correctly with color prop is set to changing", 
      () => {
        // arrange & act
        render(<Circle value="value inside" color={ElementColors.Changing} />);
        const component = screen.getByTestId("circle");
        const circle = screen.getByTestId("inside");
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        expect(circle).toBeInTheDocument();
        expect(circle).toMatchSnapshot();
        
        expect(component).toHaveClass("content");
        expect(circle).toHaveClass("circle changing");
        expect(circle).toHaveTextContent("value inside");
      }
    );    
    
    test(
      "renders correctly with color prop is set to modified", 
      () => {
        // arrange & act
        render(<Circle value="value inside" color={ElementColors.Modified} />);
        const component = screen.getByTestId("circle");
        const circle = screen.getByTestId("inside");
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        expect(circle).toBeInTheDocument();
        expect(circle).toMatchSnapshot();
        
        expect(component).toHaveClass("content");
        expect(circle).toHaveClass("circle modified");
        expect(circle).toHaveTextContent("value inside");
      }
    );       
    
    test(
      "renders correctly with string above",       
      () => {
        // arrange & act
        render(<Circle above="value above" />);
        const component = screen.getByTestId("circle");
        const above = screen.getByTestId("above");
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        expect(above).toBeInTheDocument();
        expect(above).toMatchSnapshot();
        
        expect(component).toHaveClass("content");
        expect(above).toHaveClass("above absolute string");
        expect(above).toHaveTextContent("value above");       
      }
    );    
    
    test(
      "renders correctly with string below",       
      () => {
        // arrange & act
        render(<Circle below="value below" />);
        const component = screen.getByTestId("circle");
        const below = screen.getByTestId("below");
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        expect(below).toBeInTheDocument();
        expect(below).toMatchSnapshot();
        
        expect(component).toHaveClass("content");
        expect(below).toHaveClass("below30 absolute string");
        expect(below).toHaveTextContent("value below");       
      }
    );       
    
    test(
      "renders correctly with element above",       
      () => {
        // arrange & act
        render(<Circle above={<Circle value="value inside" />} />);
        const component = screen.getAllByTestId("circle")[0];
        const above = screen.getAllByTestId("above")[0];
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        expect(above).toBeInTheDocument();
        expect(above).toMatchSnapshot();
        
        expect(component).toHaveClass("content");
        expect(above).toHaveClass("above absolute element");
        expect(above).toHaveTextContent("value inside");      
      }
    );    
    
    test(
      "renders correctly with element below",       
      () => {
        // arrange & act
        render(<Circle below={<Circle value="value inside" />} />);
        const component = screen.getAllByTestId("circle")[0];
        const below = screen.getAllByTestId("below")[0];
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        expect(below).toBeInTheDocument();
        expect(below).toMatchSnapshot();
        
        expect(component).toHaveClass("content");
        expect(below).toHaveClass("below30 absolute element");
        expect(below).toHaveTextContent("value inside");      
      }
    );        
    
    test(
      "renders correctly with an index",       
      () => {
        // arrange & act
        render(<Circle index={42} />);
        const component = screen.getByTestId("circle");
        const index = screen.getByTestId("index");
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        expect(index).toBeInTheDocument();
        expect(index).toMatchSnapshot();
        
        expect(component).toHaveClass("content");
        expect(index).toHaveClass("index absolute");
        expect(index).toHaveTextContent("42");      
      }
    );       
  }
);
