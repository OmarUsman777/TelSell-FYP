import React from 'react';
import {Link} from 'react-router-dom'
import FadeIn from 'react-fade-in/lib/FadeIn'
import {Card,Container, Row, Col, Tabs, Tab} from "react-bootstrap";

const ProfileCard = () => {
  




    return (
        <FadeIn>
            <Row>
                <Col md={4}>
                <Card className= 'my-3 p-3 rounded'>
            <Link to= {`/users/profile`}>
                <Card.Img src= "" variant = 'top'/>
            </Link>
            <Card.Body>
        <Card.Text as='h3'>"Omar Usman"</Card.Text>
        <Card.Title as='div'>
            <strong>"Email"</strong>
          </Card.Title>

        <Card.Text as='h3'>Awaen</Card.Text>
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