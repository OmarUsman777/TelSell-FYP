import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CircleLoader from '../components/CircleLoader'
import toast from '../components/Toast'
import Login from '../components/LoginForm'
import {addShippingAddress} from '../actions/actionCart'
import PaymentSteps from '../components/Steps'

const ShippingScreen = ({history}) => {

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [phone, setPhone] = useState(shippingAddress.phone)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch();

    const submitFormFun = (e)=>{

        e.preventDefault()
        dispatch(addShippingAddress({address, city, phone, country}))
    history.push('/payment')
    }


    return (
        <Login>
          <PaymentSteps check1 check2 />
          <h1>Shipping</h1>
          <Form onSubmit={submitFormFun}>
            <Form.Group controlId='address'>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter address'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group controlId='city'>
              <Form.Label>City</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter city'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group controlId='postalCode'>
              <Form.Label> Phone</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter postal code'
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group controlId='country'>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter country'
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Button type='submit' variant='primary'>
              Continue
            </Button>
          </Form>
        </Login>
      )
}

export default ShippingScreen
