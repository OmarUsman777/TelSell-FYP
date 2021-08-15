import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CircleLoader from '../components/CircleLoader'
import FormContainer from '../components/LoginForm'
import { loginAction } from '../actions/actionUsers'
import  toast  from '../components/Toast'

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitFunc = (e) => {
    e.preventDefault()
    dispatch(loginAction(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <toast >{error}</toast>}
      {loading && <CircleLoader />}
      <Form onSubmit={submitFunc}>
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

        <Button className= 'mt-3' type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen







// import React, { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { Form, Button, Row, Col } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import SpinLoader from '../components/CircleLoader'
// import {loginAction} from '../actions/actionUsers'
// import LoginForm from '../components/LoginForm'
// import  Toast  from '../components/Toast'


// const LoginScreen = ({location, history}) => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')

//     const dispatch = useDispatch()

//   const userLogin = useSelector((state) => state.userLogin)
//   const { loading, error, userInfo } = userLogin

//   const redirect = location.search ? location.search.split('=')[1] : '/'

//   useEffect(() => {
//     if (userInfo) {
//       history.push(redirect)
//     }
//   }, [history, userInfo, redirect])

//   const submitfunc = (e) => {

//     e.preventDefault()
//     dispatch(loginAction(email, password))
//   }
//     return (
//         <LoginForm>
//                 <h3>Sign In</h3>
//                 {error && <Toast message = {error}/>}
//       {loading && <SpinLoader />}
//                 <div className="form-group" >
//                     <label>Email address</label>
//                     <input type="email"  className="form-control" placeholder="Enter email"  value={email}
//             onChange={(e) => setEmail(e.target.value)} />
//                 </div>

//                 <div className="form-group mt-3" >
//                     <label>Password</label>
//                     <input type="password" className="form-control" placeholder="Enter password" value={password}
//             onChange={(e) => setPassword(e.target.value)} />
//                 </div>

//                 <div className="form-group mt-5">
//                     <div className="custom-control custom-checkbox">
//                         <input type="checkbox" className="custom-control-input" id="customCheck1" />
//                         <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
//                     </div>
//                 </div>

//                 <button type="submit" className="btn btn-primary btn-block mt-4" onClick={submitfunc}>Sign In</button>
//                 <p className="forgot-password text-right">
//                     Forgot <a href="#">password?</a>
//                 </p>
//                 <Row className='py-3'>
//         <Col>
//           New Customer?{' '}
//           <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
//             Register
//           </Link>
//         </Col>
//       </Row>
//             </LoginForm>

//     )
// }

// export default LoginScreen
