// libraries 
import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

// components
import { Button } from "./button";



describe(
  "Button UI component tests", () => {
    
    test(
      "renders correctly with text provided", () => {
        
        render(<Button text="Click me" />);
        const component = screen.getByRole("button");
        
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        
        expect(component).not.toBeDisabled();
        expect(component).toHaveTextContent("Click me");
        expect(component).toHaveAttribute("type", "button");
        expect(component).toHaveClass("text text_type_button text_color_primary button");
      }
    );
    
    test(
      "renders correctly without text provided", () => {
        
        render(<Button />);
        const component = screen.getByRole("button");
        
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        
        expect(component).not.toBeDisabled();
        expect(component).toHaveTextContent("");
        expect(component).toHaveAttribute("type", "button");
        expect(component).toHaveClass("text text_type_button text_color_primary button");
      }
    );    
    
    test(
      "calls onClick handler when is clicked on", async () => {
        
        const user = userEvent.setup()
        const onClickMock = jest.fn();
        render(<Button text="Click me" onClick={onClickMock} />);
        const component = screen.getByRole("button");
        
        await user.click(component);
        
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        
        expect(onClickMock).toHaveBeenCalledTimes(1);
      }
    );
    
    test(
      "disables when disabled prop is set to true", () => {
        
        render(<Button text="Click me" disabled />);
        const component = screen.getByRole("button");
        
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        
        expect(component).toBeDisabled();
      }
    );
    
    test(
      "disables when isLoader prop is set to true", () => {
        
        render(<Button text="Click me" isLoader={true} />);
        const component = screen.getByRole("button");
        
        expect(component).toBeInTheDocument();
        expect(component).toMatchSnapshot();
        
        expect(component).toBeDisabled();
        expect(component).toHaveClass("loader");
      }
    );    
  }
);
