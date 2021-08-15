import React from 'react'
import { Toast } from 'react-bootstrap'
const toast = ({message}) => {
    return (
        <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20"  className="rounded me-2" alt="toast" />
          <strong className="me-auto" > Error </strong>
        </Toast.Header>
        <Toast.Body >{message}</Toast.Body>
      </Toast>
    )
}

export default toast

// import { Alert } from 'react-bootstrap'

// const Message = ({ variant, children }) => {
//   return <Alert variant={variant}>{children}</Alert>
// }

// Message.defaultProps = {
//   variant: 'info',
// }

// export default Message