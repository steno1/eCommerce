import { Carousel, CarouselItem } from 'react-bootstrap' // Importing Carousel components from React Bootstrap

import { Image } from 'react-bootstrap' // Importing Image component from React Bootstrap
import { Link } from 'react-router-dom' // Importing Link component from React Router DOM
import Loader from './Loader' // Importing Loader component from a local file
import Message from './Message' // Importing Message component from a local file
import React from 'react' // Importing React module
import { useGetTopProductsQuery } from '../slices/productApiSlice' // Importing a custom hook (presumably) from productApiSlice

const ProductCarousal = () => { // Defining a functional component named ProductCarousal

    // Using the custom hook useGetTopProductsQuery to fetch data
    const { data: products, isLoading, error } = useGetTopProductsQuery();

    return isLoading ? ( // If isLoading is true, return the Loader component
        <Loader />
    ) : error ? ( // If error is present, return the Message component with the error message
        <Message variant="danger">
            {error}
        </Message>
    ) : (
        <Carousel // If neither isLoading nor error, return a Carousel component
            pause="hover" 
            className='bg-primary mb-4 custom-carousel'
        >
            {products.map(product => ( // Map over the products and generate a CarouselItem for each one
                <CarouselItem key={product._id}>
                    <Link to={`/product/${product._id}`}>
             <Image src={product.image} alt={product.name} fluid /> {/* Display product image */}
             <Carousel.Caption className='carousel-caption'>
                            <h2>
      {product.name} (${product.price}) {/* Display product name and price */}
                            </h2>
                        </Carousel.Caption>
                    </Link>
                </CarouselItem>
            ))}
        </Carousel>
    )
}

export default ProductCarousal // Exporting the ProductCarousal component as default
