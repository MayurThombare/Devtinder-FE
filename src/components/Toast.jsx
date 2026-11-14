import React from 'react'

const Toast = ({message}) => {
  return (
    <div className="toast toast-top toast-center my-2 ">

  <div className="alert alert-success">
    <span>{message}</span>
  </div>
</div>
  )
}

export default Toast