import React from 'react'
import useGatewaysStore from '../state/gatewaysStore.js'
import GatewayCard from './GatewayCard.jsx'
import UploadCard from './UploadCard.jsx'
import UploadingCard from './UploadingCard.jsx'

function PublishedGateways() {
  const { published, uploading } = useGatewaysStore()

  return (
    <div>
      <div className='published-gateways'>
        <div className='flex-box'>
          {Array.isArray(published) && published.length > 0 && <UploadCard />}
          {Array.isArray(uploading) && uploading.map(gateway => {
            return <UploadingCard key={gateway.id} gateway={gateway} />
          })}
          {Array.isArray(published) && published.map(gateway => {
            return <GatewayCard key={gateway.id} gateway={gateway} />
          })}
      </div>
    </div>
    </div>
  )
}

export default PublishedGateways
