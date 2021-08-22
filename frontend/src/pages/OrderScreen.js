import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {orderCreateAction} from '../actions/actionOrder'


const OrderScreen = ({history}) => {
    const cart = useSelector((state) => state.cart)
    const orderCreate = useSelector(state=> state.orderCreate)
    const {order, success, error } =orderCreate
    const dispatch = useDispatch()

        //   Calculate prices
        const addDecimals = (num) => {
          return (Math.round(num * 100) / 100).toFixed(2)
        }

        cart.itemsPrice = addDecimals(
          cart.cartItems.reduce((acc, item)=> acc + item.price * item.qty, 0)
        )
        cart.shippingPrice = addDecimals(100)
        cart.taxPrice = addDecimals(Number((0.20 * cart.itemsPrice)))
        cart.totalPrice = addDecimals(
          Number(cart.itemsPrice) + Number(cart.taxPrice) +Number(cart.shippingPrice)
        )

useEffect(() => {
  if( success){
    history.push(`/orders/${order._id}`)
  }
}, [history, success])
const checkoutFunc = ()=>{

dispatch(orderCreateAction({
  orderItems: cart.cartItems,
  shippingAddress: cart.shippingAddress,
  paymentMethod:cart.paymentMethod,
  itemsPrice: cart.itemsPrice,
  shippingPrice: cart.shippingPrice,
  taxPrice: cart.taxPrice,
  totalPrice: cart.totalPrice
})) 
}






    return (
        
        <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
             
              <p>
                <strong>Address:</strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{' '}
                {cart.shippingAddress.phone},{' '}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>cart Items</h2>
              {cart.cartItems.length === 0 ? (
                <h1>cart is empty</h1>
              ) : (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>cart Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ {cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>$ {cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
            
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            
                  <ListGroup.Item>
                    <Button
                      type='button'
                      className='btn btn-block'
                      onClick={checkoutFunc
                    }
                    >
                    Place Order
                    </Button>
                  </ListGroup.Item>
             
            </ListGroup>
          </Card>
        </Col>
      </Row>
    )
}

export default OrderScreen
