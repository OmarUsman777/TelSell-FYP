import React, {useEffect} from 'react'
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import {productCreateAction, listProducts, getProductsUserAction} from '../actions/productActions'


import { Row, Col , Button, ListGroup, Image} from 'react-bootstrap'
import { PRODUCT_CREATE_RESET } from '../constants/constantProducts';


const MyShop = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const productUser = useSelector((state) => state.productUser)
  const {productsUser } = productUser

    const productCreate = useSelector((state) => state.productCreate)
  const {
    loading,
    error,
    success,
    product,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo) {
      history.push('/login')
    }
    else{
        dispatch(getProductsUserAction())

    }

    if (success) {
      history.push(`/product/${product._id}/edit`)
    } 
  }, [
    dispatch,
    history,
    userInfo,
    product,
    success,
     
  ])




    const createProductHandler = ()=> {
        dispatch(productCreateAction())


    }
    return (
        <>
            <Row className='align-items-center'>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      <ListGroup variant='flush'>
            {productsUser.map((item) => (
              <ListGroup.Item key={item.name}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={()=> console.log('Hello g')}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
               ))}
               </ListGroup>
        </>
    )
}

export default MyShop
