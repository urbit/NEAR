import React from 'react'
import useUiStore from '../state/uiStore'
import useGatewaysStore from '../state/gatewaysStore'
import { deleteGateway } from '../api/pokes'

function DeleteGateway() {
  const { setShowDelete } = useUiStore()
  const { delGateway, installed, published, setDelGateway, setInstalled, setPublished } = useGatewaysStore()

  const isPublished = published.some(publishedGateway => {
    return publishedGateway.id === delGateway.id
  })
  const buttonText = isPublished ? 'Unpublish' : 'Delete'
  const promptText = `Are you sure you want to ${isPublished ? 'unpublish' : 'delete'} ${delGateway.name}?`

  return(
      <div className="delete-gateway">
        <h2 className='paragraph'>
          {promptText}
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
          {buttonText}
        </button>
        <button onClick={()=>{setShowDelete(false)}}>
          Cancel
        </button>
        </div>
      </div>
  )
}

export default DeleteGateway
