// Importing the 'Alert' component from the 'react-bootstrap' library.

import { Alert } from 'react-bootstrap'
import React from 'react'

// Importing the 'React' module from the 'react' library.


// Defining a functional component named 'Message' which takes two props: 'variant' and 'children'.
const Message = ({variant, children}) => {

  // This component returns a JSX element.
  return (
    // Rendering an 'Alert' component from 'react-bootstrap', 
    // and passing the 'variant' prop and any child elements.
    <Alert variant={variant}>
      {children}
    </Alert>
  )
}

// Setting default props for the 'Message' component.
Message.defaultProps = {
    variant: "info" // Default variant is set to "info".
}

// Exporting the 'Message' component as the default export of this module.
export default Message
