import React , { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import {listProducts} from '../actions/productActions'
import SpinLoader from '../components/CircleLoader'

const HomeScreen = ({match}) => {


    const dispatch = useDispatch()

    const productList = useSelector(state => state.productList)
    const {loading, error,products} = productList

    useEffect( ()=> {
    dispatch(listProducts())
    }, [dispatch])

    return (
        <>
        <h1>New Products</h1>
        {loading ? (<SpinLoader/>) : error ? (<h2>error</h2>) : (<Row>
        {products.map(product => ( product.category === 'Electronics' &&
            <Col key = {product._id} sm = {12} md = {6} lg = {4} xl = {3}>
               <Product product ={product}/>
            </Col>
        ))}
        </Row> )}
        </>
        )
    }
    
    export default HomeScreen
    