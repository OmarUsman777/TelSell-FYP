import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Filebase from 'react-file-base64'
import { Form, Button, Row, Col, Image, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CircleLoader from '../components/CircleLoader'
import toast from '../components/Toast'
import Login from '../components/LoginForm'
import { UserProfileAction, userUpdateAction } from '../actions/actionUsers'
import { signupAction } from '../actions/actionUsers'
import "./styles.css";
import { USER_UPDATE_RESET } from '../constants/constantUsers'

const UserUpdateScreen = ({ match, history }) => {
    const userId = match.params.id
    const dispatch = useDispatch()


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [phone, setPhone] = useState()


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  const userProfile = useSelector((state) => state.userProfile)
  const { loading, error, user } = userProfile

  const userUpdate = useSelector((state) => state.userUpdate)
  const { success } = userUpdate

  


 useEffect(() => {
     if(success){
         dispatch({type: USER_UPDATE_RESET})
         history.push('/profile')
     }
     else{
        if(!user.name || userId !== user._id){
            dispatch(UserProfileAction(userId))
     }
     else {
            setName(user.name)
            setEmail(user.email)
            setProfileImage(user.profileImage)
     }
     }
      
    
  }, [dispatch, history, userId, user, success])


  const updateFunc = (e) => {
    e.preventDefault()
    dispatch(userUpdateAction({_id: userId, name, email, phone, profileImage, isAdmin}))
   
  }

  return (
      <>
      <Container>
      {error && <toast variant='danger'>{error}</toast>}
      {loading && <CircleLoader/>}
     <Row className="justify-content-md-center">
     <h1 className= "ml-20">Update User Data</h1>
      <Image className= "avatar-big" src={profileImage} roundedCircle />   
     </Row>
     <Row>
     <Login>
      <Form onSubmit={updateFunc}>
        <Form.Group controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='name'
            placeholder="Enter New Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter New email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='email'>
          <Form.Label>Phone</Form.Label>
          <Form.Control
                type='text'
                placeholder='Enter Phone '
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
              ></Form.Control>
        </Form.Group>
{(userInfo.email ==='admin@example.com') && (<Form.Group controlId='isadmin'>
          <Form.Check
            type='checkbox'
            label='Make ADMIN ?'
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          ></Form.Check>
        </Form.Group>)}
        

        <div className= "mt-3"><Filebase type="file" onDone= {({base64}) =>setProfileImage(base64)}/></div>
          <Button type='submit' variant='primary'>
          Update    
        </Button>
      </Form>

      
    </Login>
     </Row>
    </Container>
      </>
    
    
  )
}

export default UserUpdateScreen