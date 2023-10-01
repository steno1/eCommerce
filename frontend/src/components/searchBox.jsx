// Importing necessary components and hooks from react-bootstrap and react-router-dom

import {Button, Form} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

import { FormControl } from 'react-bootstrap'
import React from 'react'
import { useState } from 'react'

// Importing FormControl component from react-bootstrap


// Importing React and useState hook from react



// Define a functional component named SearchBox
const SearchBox = () => {
    // Access the navigate function from react-router-dom
    const navigate=useNavigate();

    // Access the urlKeyWord parameter from the URL using useParams
    const {keyWord:urlKeyWord}=useParams();

    // Initialize a state variable 'keyword' using useState with a default value of urlKeyWord or an empty string
    const [keyword, setKeyword]=useState(urlKeyWord || "");

    // Define a function 'submitHandler' that handles form submission
    const submitHandler=(e)=>{
        e.preventDefault(); // Prevent the default form submission behavior

        // Check if the 'keyword' is not empty after trimming
        if(keyword.trim()){
            setKeyword("") // Reset the 'keyword' state to an empty string
            navigate(`/search/${keyword}`) // Redirect to the search results page with the keyword as a parameter
        } else {
            navigate("/") // If 'keyword' is empty, navigate to the homepage
        }
    }

    // Return JSX for the search form
    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <FormControl 
                type='text' 
                name="q"
                onChange={(e)=>setKeyword(e.target.value)} 
                value={keyword}
                placeholder='Search Products...' 
                className='mr-sm-2 ml-sm-5'>
            </FormControl>
            <Button 
                type="submit" 
                variant="outline-light"
                className="p-2 mx-2 search-button"
                size="sm"
            >
                Search
            </Button>
        </Form>
    )
}

// Export the SearchBox component as the default export of this module
export default SearchBox
