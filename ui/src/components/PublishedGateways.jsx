import React, { useEffect } from 'react'
import NewGateway from './NewGateway.jsx'
import useUiState from '../../state/useUiState.js'
import useGatewaysState from '../../state/useGatewayState.js'
import { scryPublished } from '../api/scries.js'

function PublishedGateways() {
  const { published, setPublished, setDelGateway } = useGatewaysState()
  const { loading, showNew, setShowNew, setShowDelete } = useUiState()

  useEffect(() => {
    (async () => {
      setPublished(await scryPublished())
    })()
  }, [])

  if (published === null && !loading) {
    return (
      <div>
        <div className="new-gateway">
          {showNew &&
            <div>
              <NewGateway />
            </div>
          }
        </div>
        <div className='flex-box'>
          <div className='add-gateway' onClick={()=>{setShowNew(true)}}>
            <h1 className='add-button'>+</h1>
            <div className='info'>
              <h2>Upload your gateway</h2>
              <h4 className='text'>
                Once uploaded, people can install your BOS gateway on their ship to run locally.
              </h4>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="new-gateway">
        {showNew &&
          <div>
            <NewGateway />
          </div>
        }
      </div>
      <div>
        <div className='flex-box'>
          {published.map((gateway, index) => {
            let name = gateway.name
            let url = `${window.location.origin}/apps/near/${gateway.ship}/${gateway.id}/gateway/`

            return (
              <div key={index} className='gateway-container'>
                <iframe src={url} title={url} className='frame'></iframe>
                <div className='info'>
                  <h2 className='name' href={url}>{name}</h2>
                  <h3 className='ship'>{gateway.ship}</h3>
                  <h4 className='text'>{gateway.about}</h4>
                </div>
                <div className="git">
                  <button onClick={() => {
                    setShowNew(false)
                    setShowDelete(true)
                    setDelGateway(gateway)
                  }}>
                    Delete
                  </button>
                  <a href={url}>Gateway</a>
                </div>
              </div>
            )})
          }
          <div className='add-gateway' onClick={() => {
            setShowNew(true)
            setDelGateway({})
            setShowDelete(false)
          }}>
            <h1 className='add-button'>+</h1>
            <div className='info'>
              <h2 className='name'>Upload your gateway</h2>
              <h4 className='text'>
                Once uploaded, people can install your BOS gateway on their ship to run locally.
              </h4>
            </div>
          </div>
      </div>
    </div>
    </div>
  )
}

export default PublishedGateways
