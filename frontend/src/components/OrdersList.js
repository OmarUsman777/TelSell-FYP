import React, { useState, useEffect } from 'react'
import { Table, Form, Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { myOrderListAction } from '../actions/actionOrder'
import SpinLoader from '../components/CircleLoader'
import toast from '../components/Toast'




const OrdersList = () => {

 const myOrderList = useSelector((state) => state.myOrderList)
const {loading, error, orders} = myOrderList

const userProfile = useSelector((state) => state.userProfile)
const {  user } = userProfile

const dispatch = useDispatch()

useEffect(()=> {
    dispatch(myOrderListAction())
    
}, [dispatch])

    return (
        <Row><Col>
         {loading ? (
            <SpinLoader />
          ) : error ? (
            <toast variant='danger'>{error}</toast>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt
                      ) : (
                        <i className='fas fa-times' style={{ color: 'red' }}></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/orders/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
        </Row>
    )
}

export default OrdersList
