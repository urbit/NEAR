import React from 'react'

function DeleteGateway({gateway, deleteGateway, setShowDelete}) {
  return(
      <div className="deleteGateway">
        <h2 className='paragraph'>
          Are you sure you want to delete {gateway.name}?
        </h2>
        <div className="delButtons">
        <button onClick ={()=>{deleteGateway(gateway)}}>
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
