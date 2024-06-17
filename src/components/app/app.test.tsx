// libraries 
import React from "react";
import { MemoryRouter } from "react-router-dom";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

// components 
import { App } from "../../components";

// mock ResizeObserver
import ResizeObserver from "resize-observer-polyfill";
global.ResizeObserver = ResizeObserver;



describe(
  "App routing tests", () => {
  
  const renderWithRouter = (initialRoute: string) => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <App />
      </MemoryRouter>
    );
  };
  
  let user: UserEvent;
  
  beforeEach(
    () => {
      user = userEvent.setup();
    }
  );
  
  test(
    "renders app component and navigates to queue page", async () => {
      
      renderWithRouter("/");
      const pageLink = screen.getByTestId("queue-page-link");
      
      await user.click(pageLink);
      expect(screen.getByTestId("queue-page")).toBeInTheDocument();
    }
  );
  
  test(
    "renders app component and navigates to stack page", async () => {
      
      renderWithRouter("/");
      const pageLink = screen.getByTestId("stack-page-link");
      
      await user.click(pageLink);
      expect(screen.getByTestId("stack-page")).toBeInTheDocument();
    }
  );
  
  test(
    "renders app component and navigates to string page", async () => {
      
      renderWithRouter("/");
      const pageLink = screen.getByTestId("string-page-link");
      
      await user.click(pageLink);
      expect(screen.getByTestId("string-page")).toBeInTheDocument();
    }
  );
  
  test(
    "renders app component and navigates to sorting page", async () => {
      
      renderWithRouter("/");
      const pageLink = screen.getByTestId("sorting-page-link");
      
      await user.click(pageLink);
      expect(screen.getByTestId("sorting-page")).toBeInTheDocument();
    }
  );
  
  test(
    "renders app component and navigates to fibonacci page", async () => {
      
      renderWithRouter("/");
      const pageLink = screen.getByTestId("fibonacci-page-link");
      
      await user.click(pageLink);
      expect(screen.getByTestId("fibonacci-page")).toBeInTheDocument();
    }
  );
  
  test(
    "renders app component and navigates to linked-list page", async () => {
      
      renderWithRouter("/");
      const pageLink = screen.getByTestId("linked-list-page-link");
      
      await user.click(pageLink);
      expect(screen.getByTestId("linked-list-page")).toBeInTheDocument();
    }
  );  
});
