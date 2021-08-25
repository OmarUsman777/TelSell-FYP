import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState, useEffect } from 'react'
import { Button } from "react-bootstrap"
import {useSelector,useDispatch} from 'react-redux'
import {payOrderAction, getOrderAction} from '../actions/actionOrder'


const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#c4f0ff",
			color: "#fff",
			fontWeight: 500,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "#87bbfd" }
		},
		invalid: {
			iconColor: "#ffc7ee",
			color: "#ffc7ee"
		}
	}
}

export default function PaymentForm({match}) {
  const orderDetails = useSelector((state) => state.orderDetails)
  const { order } = orderDetails
  const dispatch = useDispatch();


    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()
     const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState({});
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: ""
  });

  //DISPATCH FUNCTIONS AND RELOADING NEW DOM

const PayFunc = () => {
  if(success){
    dispatch(payOrderAction(order._id, processing))

}
}
const updateDetails =()=>
{
  window.location.reload()
}


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

    if(!error) {
        try {
            const {id} = paymentMethod
            const response = await axios.post("http://localhost:3000/payment", {
                amount: order.totalPrice * 100,
                id
            })


            if(response.data.success) {
              setProcessing(response.data.PaymentResponse)
                setSuccess(true)
            } 
          
          

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}

const CardField = ({ onChange }) => (

  
  <div className="FormRow">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

 const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);
    return (
        <>
         <Button className = 'btn btn-light my-3' onClick={()=> updateDetails() }>
            Go Back
        </Button>
        {!success ? 
        <form className="Form" onSubmit={handleSubmit}>
       <fieldset className="FormGroup">
         <Field
          label="Name"
          id="name"
          type="text"
          placeholder={order.user.name}
          required
          autoComplete="name"
          value={billingDetails.name}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, name: e.target.value });
          }}
        />
        <Field
          label="Email"
          id="email"
          type="email"
          placeholder={order.user.email}
          required
          autoComplete="email"
          value={billingDetails.email}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, email: e.target.value });
          }}
        />
        <Field
          label="Phone"
          id="phone"
          type="tel"
          placeholder="(941) 555-0123"
          required
          autoComplete="tel"
          value={billingDetails.phone}
          onChange={(e) => {
            setBillingDetails({ ...billingDetails, phone: e.target.value });
          }}
        />
      </fieldset>
       <fieldset className="FormGroup">
                <div className="FormRow">
                    <CardElement options={CARD_OPTIONS}/>
                </div>
            </fieldset>
                  <button>Pay</button>

    </form>
        :
       <div>
           <h2>{`Thank You ${billingDetails.name} For Shopping..Your Billing Information has Been Saved`}</h2>
           {localStorage.setItem('PaymentStatus', true)}

           <Button
                      type='button'
                      className='btn btn-block'
                      onClick={()=> PayFunc() }
                    >
                    Ok
                    </Button>
       </div>
        }
            
        </>
    )
}