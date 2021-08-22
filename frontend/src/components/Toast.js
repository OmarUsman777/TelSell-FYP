import React from 'react'
import { Alert } from 'react-bootstrap'

const Toast = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

Toast.defaultProps = {
  variant: 'info',
}

export default Toast