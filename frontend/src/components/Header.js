import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { logoutAction } from '../actions/actionUsers'
import Search from './Search'
import { Route } from 'react-router-dom'


const Header = () => {

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const logoutFunc = () => {
    dispatch(logoutAction())
  }

    return (
        <header>
        <Navbar bg="dark" variant='dark' expand="lg" collapseOnSelect>
        <Container>
        <LinkContainer to='/'>
          <Navbar.Brand>TelSell</Navbar.Brand>
        </LinkContainer> 
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Route render={({history})=> <Search history = {history}/>}/>
        <Nav className='ms-auto'>
        <LinkContainer to='/cart'>
           <Nav.Link ><i className= 'fas fa-shopping-cart'></i>Cart</Nav.Link>
        </LinkContainer> 
        {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutFunc}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ):(
         <LinkContainer to='/login'>
            <Nav.Link ><i className= 'fas fa-user'></i>Sign In</Nav.Link>
        </LinkContainer> 
              )}
        <NavDropdown title="set" id='category'>
        <LinkContainer to='/usedproducts'>
                    <NavDropdown.Item>Used Phones</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/newproducts'>
                    <NavDropdown.Item>New Phones</NavDropdown.Item>
                  </LinkContainer>
        </NavDropdown>


        </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        </header>
        )
    }
    
    export default Header
    