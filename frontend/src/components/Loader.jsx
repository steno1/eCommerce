import React from 'react'; // Importing the React library to build components
import { Spinner } from 'react-bootstrap'; // Importing the Spinner component from react-bootstrap for loading animation

// Define a functional component called Loader
const Loader = () => {
  return (
    <Spinner
      animation='border' // Setting the animation style of the spinner to a border animation
      role='status' // Specifying the role of the spinner for accessibility
      style={{
        width: '100px', // Setting the width of the spinner
        height: '100px', // Setting the height of the spinner
        margin: 'auto', // Centering the spinner horizontally using auto margin
        display: 'block', // Setting the display property to block
        borderTopColor: 'green', // Customizing the color of the top border of the spinner to green
        borderRightColor: 'blue', // Customizing the color of the right border of the spinner to blue
        borderBottomColor: 'yellow', // Customizing the color of the bottom border of the spinner to yellow
        borderLeftColor: 'transparent', // Hiding the left border of the spinner by setting it to transparent
      }}
    ></Spinner>
  );
};

export default Loader; // Exporting the Loader component for use in other parts of the application
