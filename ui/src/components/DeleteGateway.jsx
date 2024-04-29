import React from 'react'
import useUiStore from '../state/uiStore'
import useGatewaysStore from '../state/gatewaysStore'
import { deleteGateway, publishGateway } from '../api/pokes'

function DeleteGateway() {
  const { setShowDelete } = useUiStore()
  const { delGateway, installed, published, setDelGateway, setInstalled, setPublished } = useGatewaysStore()

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
            if (published.some(publishedGateway => {
              return publishedGateway.id === delGateway.id
            })) {
              setPublished(published.filter(publishedGateway => {
                return publishedGateway.id !== delGateway.id
              }))
            } else {
              setInstalled(installed.filter(installedGateway => {
                return installedGateway.id !== delGateway.id
              }))
            }
            setDelGateway({}),
            setShowDelete(false)
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
