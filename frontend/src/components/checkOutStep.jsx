// This line imports the `LinkContainer` component from the 'react-router-bootstrap' library.
// It is used for wrapping `Nav.Link` components with routing functionality.

import { LinkContainer } from 'react-router-bootstrap'
import { Nav } from 'react-bootstrap'
import React from 'react'

// This is a functional component named `CheckOutStep`.
// It takes an object as an argument with properties `step1`, `step2`, `step3`, and `step4`.
const CheckOutStep = ({step1, step2, step3, step4}) => {
  
  // This is the starting of the component's JSX code block.
  // It returns a `Nav` component with some nested elements.
  return (
    <Nav className='justify-content-center mb-4'>

      {/* This is a `Nav.Item` component, which represents an item in the navigation menu. */}
      <Nav.Item>

        {/* This is a conditional rendering using a ternary operator.
           It checks if `step1` is true, and if so, it renders a `LinkContainer` with a `Nav.Link` inside that leads to "/signin".
           If `step1` is false, it renders a disabled `Nav.Link` with the label "Sign in".
        */}
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link>Sign in</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> 
            Sign in
          </Nav.Link>
        )}

      </Nav.Item>

      {/* This block is similar to the first `Nav.Item`, but for the second step. */}
      <Nav.Item>
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link>Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> 
            Shipping
          </Nav.Link>
        )}
      </Nav.Item>

      {/* This block is similar to the first `Nav.Item`, but for the third step. */}
      <Nav.Item>
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link>Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> 
            Payment
          </Nav.Link>
        )}
      </Nav.Item>

      {/* This block is similar to the first `Nav.Item`, but for the fourth step. */}
      <Nav.Item>
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link>Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled> 
            Place Order
          </Nav.Link>
        )}
      </Nav.Item>

    {/* This is the closing tag for the `Nav` component. */}
    </Nav>
  )
}

// This exports the `CheckOutStep` component so it can be imported and used in other files.
export default CheckOutStep
