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
import Shipping from './pages/ShippingScreen'
import Payment from './pages/PaymentsScreen'
import Order from './pages/OrderScreen'
import Checkout from './pages/CheckoutScreen'







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
    <Route path = '/shipping' component = {Shipping}/>  
    <Route path = '/payment' component = {Payment}/>
    <Route path = '/placeorder' component = {Order}/>    
    <Route path = '/orders/:id' component = {Checkout}/>    

    
  
  
   


    </Container>
    </main>
    
    <Footer/>
    </Router>
    );
  }
  
  export default App;
  