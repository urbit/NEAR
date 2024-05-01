import React from 'react'
import useGatewaysStore from '../state/gatewaysStore.js'
import GatewayCard from './GatewayCard.jsx'
import UploadCard from './UploadCard.jsx'

function PublishedGateways() {
  const { published } = useGatewaysStore()

  return (
    <div>
      <div className='published-gateways'>
        <div className='flex-box'>
          {Array.isArray(published) && published.length > 0 && <UploadCard />}
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
