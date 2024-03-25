import React from 'react'

function DeleteGateway(props) {
    const setShowDelete = props.setShowDelete
    const gateway = props.gateway
    const deleteGateway = props.deleteGateway


    return(
        <div className="deleteGateway"><h2 className='paragraph'>Are you sure you want to delete {gateway.name}?</h2>
        <div className="delButtons">
        <button onClick ={()=>{deleteGateway(gateway)}}>yes, delete</button>
        <button onClick={()=>{setShowDelete(false)}}>no</button>
        </div>
        </div>
    )

}
export default DeleteGateway