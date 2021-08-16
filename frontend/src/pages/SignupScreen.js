import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Filebase from 'react-file-base64'
import { Form, Button, Row, Col, Image, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CircleLoader from '../components/CircleLoader'
import toast from '../components/Toast'
import Login from '../components/LoginForm'
import { signupAction } from '../actions/actionUsers'
import "./styles.css";

const SignupScreen = ({ location, history }) => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  // const onChangePicture = e => {
  //   console.log('picture: ', profileImage);
  //   setProfileImage(URL.createObjectURL(e.target.files[0]));
  // };

  const dispatch = useDispatch()

  const userSignup = useSelector((state) => state.userSignup)
  const { loading, error, userInfo } = userSignup

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])


  const signupFunc = (e) => {
    e.preventDefault()
    console.log(profileImage)
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(signupAction(name, email, password,profileImage))
    }
  }

  return (
    <Container>
      {message && <toast variant='danger'>{message}</toast>}
      {error && <toast variant='danger'>{error}</toast>}
      {loading && <CircleLoader/>}
     <Row className="justify-content-md-center">
     <h1 className= "ml-20">Sign Up</h1>
      <Image className= "avatar-big" src={profileImage} roundedCircle />   
     </Row>
     <Row>
     <Login>
      <Form onSubmit={signupFunc}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div><Filebase type="file" onDone= {({base64}) =>setProfileImage(base64)}/></div>
          <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an Account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </Login>
     </Row>
    </Container>
    
  )
}

export default SignupScreen