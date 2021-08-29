import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import toast from '../components/Toast'
import CircleLoader from '../components/CircleLoader'
import {listProducts, productDeleteAction, productCreateAction} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/constantProducts'

const ProductList = ({ match }) => {
//   const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()
const history = useHistory()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete

  const productCreate = useSelector((state) => state.productCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product:createdProduct,
  } = productCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET })

    if (!userInfo) {
      history.push('/login')
    }

    if (successCreate) {
      history.push(`/product/${createdProduct._id}/edit`)
    } else {
      dispatch(listProducts())
    }
  }, [
    dispatch,
    history,
    userInfo,
    createdProduct,
    successDelete,
    successCreate,
     
  ])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(productDeleteAction(id))
    }
  }

  const createProductHandler = () => {
    dispatch(productCreateAction())
  }

  return (
    <>
      <Row className='align-items-center'>
        <Col>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
    {loadingDelete && <CircleLoader/>}
    {errorDelete && <toast variant = 'danger'>{errorDelete}</toast>}
    {loadingCreate&& <CircleLoader/>}
    {errorCreate && <toast variant = 'danger'>{errorCreate}</toast>}
      {loading ? (
        <CircleLoader />
      ) : error ? (
        <toast variant='danger'>{error}</toast>
      ) : (
        <>
          <Table striped bordered hover responsive  size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </>
      )}
    </>
  )
}

export default ProductList