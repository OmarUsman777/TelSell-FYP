import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import toast from '../components/Toast'
import loader from '../components/CircleLoader'
import { allUsersAction, userDeleteAction} from '../actions/actionUsers'



const UserListScreen = ({ history }) => {
  const dispatch = useDispatch()

  const allUsersList = useSelector((state) => state.allUsersList)
  const { loading, error, users } = allUsersList

  const userDelete = useSelector((state) => state.userDelete)
  const {  success } = userDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin



  useEffect(() => {
      dispatch(allUsersAction())
   
  }, [dispatch, success])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(userDeleteAction(id))
    }
  }

  return (
    <>
      {loading ? (
        <loader />
      ) : error ? (
        <toast variant='danger'>{error}</toast>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen