import react from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './pages/HomeScreen'
import ProductScreen from './pages/ProductScreen';
import CartScreen from './pages/CartScreen'
import LoginScreen from './pages/LoginScreen'
import SignUp from './pages/SignupScreen'
import ProfileCard from './pages/ProfileScreen'



const App = ()=> {
  return (
    <Router>
    <Header/>
    
    <main className='py-3'>
    <Container>
    <Route path = '/' component= {HomeScreen} exact/>
    <Route path = '/product/:id' component = {ProductScreen}/>    
    <Route path = '/cart/:id?' component = {CartScreen} />    
    <Route path = '/login' component = {LoginScreen} />    
    <Route path = '/register' component = {SignUp}/> 
    <Route path = '/profile' component = {ProfileCard}/>    
   


    </Container>
    </main>
    
    <Footer/>
    </Router>
    );
  }
  
  export default App;
  