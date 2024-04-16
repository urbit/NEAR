import React, { useState } from 'react'
import NewGateway from './NewGateway.jsx'

function PublishedGateways({ api, published, loading, setShowDelete, setDelGateway }) {
  const [showNew, setShowNew] = useState(false)

  if (published === null && !loading) {
    return (
      <div>
        <div className="newGateway">
          {showNew &&
            <div>
              <NewGateway api={api} setShowNew={setShowNew}/>
            </div>
          }
        </div>
        <div className='flexBox'>
          <div className='addGateway' onClick={()=>{setShowNew(true)}}>
            <h1 className='addButton'>+</h1>
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
      <div className="newGateway">
        {showNew &&
          <div>
            <NewGateway api={api} setShowNew={setShowNew}/>
          </div>
        }
      </div>
      <div>
        <div className='flexBox'>
          {published.map((gateway, index) => {
            let name = gateway.name
            let url = `${window.location.origin}/apps/near/${gateway.ship}/${gateway.id}/gateway/`

            return (
              <div key={index} className='gatewayContainer'>
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
          <div className='addGateway' onClick={() => {
            setShowNew(true)
            setDelGateway({})
            setShowDelete(false)
          }}>
          <h1 className='addButton'>+</h1>
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
