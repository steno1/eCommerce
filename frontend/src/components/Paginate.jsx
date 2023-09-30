// Importing necessary components and modules

import { LinkContainer } from 'react-router-bootstrap' // Importing a component from 'react-router-bootstrap'
import { Pagination } from 'react-bootstrap' // Importing a component from 'react-bootstrap'
import React from 'react' // Importing the React library

// Defining a functional component called Paginate that accepts some props
const Paginate = ({pages,page, isAdmin=false}) => {
  return (
    // Conditionally render pagination if there are more than 1 page
    pages> 1 &&(
      // Render Pagination component from react-bootstrap
      <Pagination>
        {/* Generate an array of page numbers and map over them */}
        {[...Array(pages).keys()].map((x)=>(
          // For each page number, create a LinkContainer component
          <LinkContainer key={x + 1} to={
            // Determine the link based on whether it's an admin page or not
            !isAdmin?`/page/${x+1}`: `/admin/productlist/${x +1}`
          }>
            {/* Render a Pagination.Item component */}
            <Pagination.Item active={x+1===page}>
              {x+1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

// Export the Paginate component as the default export of this module
export default Paginate
