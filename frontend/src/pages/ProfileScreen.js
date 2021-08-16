import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { Row, Col, Card, Tabs, Tab } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { UserProfileAction } from '../actions/actionUsers'

const ProfileCard = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const dispatch = useDispatch()

  const userProfile = useSelector((state) => state.userProfile)
  const { loading, error, user } = userProfile

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


 

  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!user.name) {
        dispatch(UserProfileAction('profile'))
      } else {

        console.log(user)
        setName(user.name)
        setEmail(user.email)
        setProfileImage(user.profileImage)

      }
    }
  }, [dispatch, history, userInfo, user])

  // const getProfileFunc = (e) => {
  //   e.preventDefault()
  //   if (password !== confirmPassword) { 
  //     setMessage('Passwords do not match')
  //   } else {
  //     // dispatch(updateUserProfile({ id: user._id, name, email, password }))
  //   }
  // }
  


    return (
        <FadeIn>
            <Row>
                <Col md={4}>
                <Card className= 'my-3 p-3 rounded'>
            <Link to= {`/users/profile`}>
                <Card.Img src= {user.profileImage} variant = 'top' fluid/>
            </Link>
            <Card.Body>
        <Card.Text as='h3'>{user.name}</Card.Text>
        <Card.Title as='div'>
            <strong>Cell:</strong>
          </Card.Title>

        <Card.Text as='h6'>0332-5253409</Card.Text>
        <Card.Title as='div'>
            <strong>Email</strong>
          </Card.Title>

        <Card.Text as='h6'>{user.email}</Card.Text>
      </Card.Body>
        </Card>
            </Col>

            <Col md={8}>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
               <Tab eventKey="home" title="My Shop">
                   <h5 className = "mt-4">Items</h5> 
             {/* <Sonnet /> */}
               </Tab>
             <Tab eventKey="contact" title="Contact" >
             <h5 className = "mt-4">Details</h5> 

              </Tab>
              </Tabs>
            </Col>
        </Row>
            
            </FadeIn>
    )
}

export default ProfileCard;