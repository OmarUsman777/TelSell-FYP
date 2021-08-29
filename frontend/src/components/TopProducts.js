import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Toast from './Toast'
import { productTopAction } from '../actions/productActions'
import WaitingLoader from './WaitingLoader'
import './carousal.css'


const TopProduct = () => {
  const dispatch = useDispatch()

  const productTop = useSelector((state) => state.productTop)
  const { loading, error, products } = productTop

  useEffect(() => {
    dispatch(productTopAction())
  }, [dispatch])

  return loading ? (
    <WaitingLoader />
  ) : error ? (
    <Toast variant='danger'>{error}</Toast>
  ) : (

<Carousel className='carousel-control-prev-icon:after carousel-control-next-icon:after' pause= 'hover'>
  {products.map((product) => (
  <Carousel.Item key = {product._id}>
      <Link to={`/product/${product._id}`}>

    <img
      className="d-block w-30"
      src={product.image}
      alt="First product"
      fluid
    />
    <Carousel.Caption>
      <h4>{product.name}</h4>
    </Carousel.Caption>
    </Link>

  </Carousel.Item>
))}
</Carousel>

  )}

    // <Carousel pause='hover' className='bg-dark'>
    //   {products.map((product) => (
    //     <Carousel.Item key={product._id}>
    //       <Link to={`/product/${product._id}`}>
    //         <Image src={product.image} alt={product.name} fluid />
    //         <Carousel.Caption className='carousel-caption'>
    //           <h2>
    //             {product.name} (${product.price})
    //           </h2>
    //         </Carousel.Caption>
    //       </Link>
    //     </Carousel.Item>
    //   ))}
    // </Carousel>
  


export default TopProduct