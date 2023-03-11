import React from 'react'

const OperationButton = ({Operation,dispatch}) => {
  return (
    <>
      <button onClick={()=>dispatch({
        type:'OPERATE',
        payload:{Operation}
      })}>{Operation}</button>
    </>
  )
}

export default OperationButton