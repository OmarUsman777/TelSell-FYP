import React, { useState } from 'react'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CircleLoader from '../components/CircleLoader'
import Login from '../components/LoginForm'
import {addPaymentMethod} from '../actions/actionCart'
import PaymentSteps from '../components/Steps'

const PaymentScreen = ({history}) => {

    const [payment, setPayment] = useState("Stripe")
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    if(!shippingAddress.address){                                //if user did not fill Adress redirect to address
        history.push('/shipping')
    }

    const dispatch = useDispatch();

    const submitFormFun = (e)=>{

        e.preventDefault()
        dispatch(addPaymentMethod(payment))
        history.push('/placeorder')
    }


    return (
        <Login>
          <PaymentSteps check1 check2 check3  />
          <h1>Payment</h1>
          <Form onSubmit={submitFormFun}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col className='ml-4'>
            {/* <Form.Check
              type='radio'
              label='PayPal or Credit Card'
              id='PayPal'
              name='paymentMethod'
              value='PayPal'
              checked
              onChange={(e) => setPayment(e.target.value)}
            ></Form.Check> */}
            <Form.Check
              type='radio'
              label='Stripe or Credit Card'
              id='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={(e) => setPayment(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>

        <Button className = "mt-5" type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
        </Login>
      )
}

export default PaymentScreen
