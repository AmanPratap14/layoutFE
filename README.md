# Getting Started with Create React App

# Frontend - ReactJS Layout Creation

## Specifications
Create a layout with three components, each containing content (HTML or images).
Components should be resizable by dragging from any side.
Resizing one component should adjust the size of its neighboring components accordingly.
Utilize open-source libraries for implementation.
Ensure responsiveness across all laptop devices.

## Implementation Overview
- **Frontend Framework**: ReactJS
- **Libraries Used**: 
  - [react-grid-layout](https://github.com/STRML/react-grid-layout) for layout creation and resizing.
  - [axios](https://github.com/axios/axios) for handling API calls.
- **File Structure**:
  - `App.js`: Main React component integrating layout creation, API calls, and modals for adding/editing data.
  - `assets/`: Directory containing SVG files for component representations.
  - `controller/Services.js`: File handling API service requests.
  - `modal/Modal.js`: Component files for modals used in adding/editing data.

## Key Components and Functionality
- **Layout Configuration**: Implemented using `react-grid-layout`. Handles layout and resizing of components.
- **Data Management**: Handles data retrieval, addition, and editing using API calls with `axios`.
- **Modals**: Modal components for adding and editing data.
- **Responsive Design**: Ensures responsiveness across laptop devices using CSS media queries.
- **State Management**: Utilizes React's `useState` and `useEffect` hooks for state management and lifecycle methods.

## Execution
1. Clone the repository locally.
2. Navigate to the project directory.
3. Install dependencies using `npm install`.
4. Start the development server using `npm start`.
5. Access the application through a web browser at the provided localhost address.

## How to Use
1. Drag the edges of the components to resize them.
2. Add or edit data using the provided modals.
3. Ensure that the layout adjusts responsively across various laptop devices.

## Project Deploy at:- 
https://amanpratap14.github.io/layoutFE/


