import React from 'react'
import {Link} from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import FadeIn from 'react-fade-in/lib/FadeIn'
const Product = ({product}) => {
    return (
        <FadeIn><Card className= 'my-3 p-3 rounded'>
            <Link to= {`/product/${product._id}`}>
                <Card.Img src= {product.image} variant = 'top' fluid rounded/>
            </Link>
            <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as='div'>
        <Rating 
        value = {product.rating} 
        text = {`${product.numReviews} Reviews`}/>
          
        </Card.Text>

        <Card.Text as='h3'>${product.price}</Card.Text>
      </Card.Body>
        </Card></FadeIn>
    )
}

export default Product
