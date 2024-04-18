import React from 'react'
import useGatewaysState from '../../state/useGatewayState'

function DeleteGateway({ deleteGateway }) {
  const { delGateway, setDelGateway, setShowDelete } = useGatewaysState()

  return(
      <div className="delete-gateway">
        <h2 className='paragraph'>
          Are you sure you want to delete {delGateway.name}?
        </h2>
        <div className="del-buttons">
        <button onClick ={() => {
          deleteGateway(
            delGateway,
            () => {
            setDelGateway(),
            window.location.reload(),
            setShowDelete()
          })}}>
          Delete
        </button>
        <button onClick={()=>{setShowDelete(false)}}>
          Cancel
        </button>
        </div>
      </div>
  )
}

export default DeleteGateway
