// Importing the `Helmet` component from the 'react-helmet-async' package.

import { Helmet } from 'react-helmet-async'
import React from 'react'

// Importing the `React` module from the 'react' package.


// Defining a functional component named `Meta` which takes `title`, `description`, and `keywords` as props.
const Meta = ({title, description, keywords}) => {

  // Returning JSX which includes the `Helmet` component.
  return (
    <Helmet>
      {/* Setting the title of the page dynamically using the `title` prop */}
      <title>{title}</title>

      {/* Setting the meta description of the page dynamically using the `description` prop */}
      <meta name="description" content={description}/>

      {/* Setting the meta keywords of the page dynamically using the `keywords` prop */}
      <meta name="keywords" content={keywords}/>
    </Helmet>
  )
}

// Exporting the `Meta` component as the default export of this module.
export default Meta
