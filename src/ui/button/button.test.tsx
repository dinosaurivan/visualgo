// libraries 
import { render, fireEvent, screen } from "@testing-library/react";

// components
import { Button } from "./button";



describe(
  "Button UI component tests", 
  () => {
    
    test(
      "renders correctly with text provided", 
      () => {
        // arrange & act
        render(<Button text="Click me" />);
        const component = screen.getByRole("button");
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        
        expect(component).not.toBeDisabled();
        expect(component).toHaveTextContent("Click me");
        expect(component).toHaveAttribute("type", "button");
        expect(component).toHaveClass("text text_type_button text_color_primary button");
      }
    );
    
    test(
      "renders correctly without text provided", 
      () => {
        // arrange & act
        render(<Button />);
        const component = screen.getByRole("button");
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        
        expect(component).not.toBeDisabled();
        expect(component).toHaveTextContent("");
        expect(component).toHaveAttribute("type", "button");
        expect(component).toHaveClass("text text_type_button text_color_primary button");
      }
    );    
    
    test(
      "calls onClick handler when is clicked on",
      () => {
        // arrange
        const onClickMock = jest.fn();
        render(<Button text="Click me" onClick={onClickMock} />);
        const component = screen.getByRole("button");
        
        // act
        fireEvent.click(component);
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        
        expect(onClickMock).toHaveBeenCalledTimes(1);
      }
    );
    
    test(
      "disables when disabled prop is set to true",
      () => {
        // arrange & act
        render(<Button text="Click me" disabled />);
        const component = screen.getByRole("button");
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        
        expect(component).toBeDisabled();
      }
    );
    
    test(
      "disables when isLoader prop is set to true",
      () => {
        // arrange & act
        render(<Button text="Click me" isLoader={true} />);
        const component = screen.getByRole("button");
        
        // assert
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        
        expect(component).toBeDisabled();
        expect(component).toHaveClass("loader");
      }
    );    
  }
);
