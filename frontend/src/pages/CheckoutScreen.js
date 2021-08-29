import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import Toast from '../components/Toast'
import CircleLoader from '../components/CircleLoader'
import PaymentForm from '../components/StripePayment'
import {
  getOrderAction
} from '../actions/actionOrder'
import './StripeStyle.css'




const Checkout = ({ match, history }) => {
  const orderId = match.params.id


  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

//   const orderPay = useSelector((state) => state.orderPay)
//   const { loading: loadingPay, success: successPay } = orderPay

//   const orderDeliver = useSelector((state) => state.orderDeliver)
//   const { loading: loadingDeliver, success: successDeliver } = orderDeliver

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const [stripeVal , setStripeVal] = useState(false)
  const [isPaid, setIsPaid] =useState(false)
  const [p, setP] =useState(false)


  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }
useEffect(()=>{
  const PaymentStatus = localStorage.getItem('PaymentStatus');
  setP(PaymentStatus === 'true')
    dispatch(getOrderAction(orderId))
}, [])
  const successPaymentHandler = (paymentResult) => {
    console.log("Hann click kiya mujhy Checkout par")
  
  }


const PUBLIC_KEY = "pk_test_51JRBhZGy1yuCYfBdN1oEjZNixnOjJku3oeq7tDHsVpMELeuyuFoq3f3VcniiyfhJJeM6T7oInQRsviwEfQYL7c6S00ijgNAhxR"
const stripeTestPromise = loadStripe(PUBLIC_KEY)
const donePaymentFunc = ()=>{
 
<div className="StripeStyle" >
		<Elements stripe={stripeTestPromise}>
			< PaymentForm/>
		</Elements>
	  </div>
    {setIsPaid(true)}
}
  return loading ? (
    <CircleLoader />
  ) : stripeVal ? (
    <div className="App" >
    <Elements stripe={stripeTestPromise}>
    < PaymentForm/>
  </Elements>
  </div>
  ) : (
    <>
      <h1>Order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                {order.shippingAddress.phone},{' '}
                {order.shippingAddress.country}
              </p>
              {order.isPaid ? (
                <Toast variant='success'>
                  Your Package Will be Dilivered in 3 days {order.deliveredAt}
                </Toast>
              ) : (
                <Toast variant='danger'>Not Delivered</Toast>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Toast variant='success'>Paid on {order.paidAt}</Toast>
              ) : (
                <Toast variant='danger'>Not Paid</Toast>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Toast>Order is empty</Toast>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
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
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
              <Button
                      type='button'
                      className='btn btn-block'
                      disabled = {order.isPaid}
                      onClick={(e) => setStripeVal(true) }                 
                   
                    >
                    Give Card Details
                    </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  ) 
}
export default Checkout