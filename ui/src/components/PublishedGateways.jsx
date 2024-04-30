import React, { useEffect } from 'react'
import NewGateway from './NewGateway.jsx'
import useUiStore from '../state/uiStore.js'
import useGatewaysStore from '../state/gatewaysStore.js'
import { scryPublished } from '../api/scries.js'
import GatewayCard from './GatewayCard.jsx'
import UploadCard from './UploadCard.jsx'

function PublishedGateways() {
  const { published, setPublished } = useGatewaysStore()
  const { loading, showNew } = useUiStore()

  useEffect(() => {
    (async () => {
      setPublished(await scryPublished())
    })()
  }, [])

  if (published === null && !loading) {
    return (
        <>
          <div className="new-gateway">
            {showNew &&
              <div>
                <NewGateway />
              </div>
            }
          </div>
          <UploadCard />
        </>
    )
  }

  return (
    <div>
      <div>
        <div className='flex-box'>
          <UploadCard />
          {Array.isArray(published) && published.map((gateway) => {
            return (
              <GatewayCard
                key={gateway.id}
                gateway={gateway}
              />
            )
          })}
      </div>
    </div>
    </div>
  )
}

export default PublishedGateways
