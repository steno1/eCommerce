// Importing necessary icons and React module

import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

import React from 'react'

// Defining the Rating component which takes 'value' and 'text' props
const Rating = ({ value, text }) => {
  return (
    // JSX code starts with a div element with class name 'rating'
    <div className='rating'>
      {/* Displaying the first star based on the value */}
      <span>
        {value >= 1 ? <FaStar/> : value >= 0.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
      </span>
      {/* Displaying the second star based on the value */}
      <span>
        {value >= 2 ? <FaStar/> : value >= 1.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
      </span>
      {/* Displaying the third star based on the value */}
      <span>
        {value >= 3 ? <FaStar/> : value >= 2.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
      </span>
      {/* Displaying the fourth star based on the value */}
      <span>
        {value >= 4 ? <FaStar/> : value >= 3.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
      </span>
      {/* Displaying the fifth star based on the value */}
      <span>
        {value >= 5 ? <FaStar/> : value >= 4.5 ? <FaStarHalfAlt/> : <FaRegStar/>}
      </span>
      {/* Displaying optional text if provided */}
      <span className='rating-text'>{text && text}</span>
    </div>
  )
}

// Exporting the Rating component as the default export of this module
export default Rating
