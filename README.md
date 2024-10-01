# Algorithms & Data Structures Visualizer

## Project Description

From the **user's perspective**, this project aims to visualize core principles behind certain algorithms and data structures. Users can interact with the visualizations in real-time to gain a deeper understanding of the underlying concepts.

From the **developer's perspective**, this project serves as a learning exercise in covering the frontend of a React-powered project with a variety of tests: unit, integration, and end-to-end.

## See It In Action

User-facing, the project is optimized for **desktop viewing** in your preferred browser at [visual.ivanjsx.com](https://visual.ivanjsx.com).

For developers, executing the tests requires running the project locally. Follow the instructions below:

1. Clone the repository to your local machine via `git clone`
2. Navigate to the project directory via `cd visualgo-cypress-jest`
3. Run `npm ci` to install the necessary dependencies.
4. Run `npm run test` to execute the unit and integration tests set up with Jest & React Testing Library.  
   The test files are located next to the components they test.
5. Run `npm run start` to start the development server (required for Cypress).
6. Run `npm run cypress:run` to execute the end-to-end tests configured with Cypress.  
   The test files are located in the `cypress` directory at the root of the project.

## My Role In It

I developed this project from scratch, based on the [design project](https://www.figma.com/file/RIkypcTQN5d37g7RRTFid0/Algososh_external_link?node-id=0%3A1) provided as a reference in Figma. I also set up the testing environment, wrote the tests, and deployed the project to the web.

## Technologies Used

- The project is built with **React**, utilizing **React Router** for navigation.
- **React Testing Library** is used for setting up unit and integration tests of components, in conjunction with **Jest**.
- End-to-end tests are configured with **Cypress**.
- The architecture follows the **Clean Functions** pattern to ensure testability.
- Algorithms and data structures are implemented in **TypeScript** following the **OOP** paradigm.
- The project is deployed to my virtual private server (VPS) using **Nginx** as a reverse proxy.
- **Docker** is used to containerize the project.
