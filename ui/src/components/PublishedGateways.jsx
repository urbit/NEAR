import React from 'react'
import useGatewaysStore from '../state/gatewaysStore.js'
import GatewayCard from './GatewayCard.jsx'
import UploadCard from './UploadCard.jsx'
import UploadingCard from './UploadingCard.jsx'

function PublishedGateways() {
  const { published, uploading } = useGatewaysStore()

  const hasPublishedOrIsUploading =
    Array.isArray(published) && published.length > 0 ||
    Array.isArray(uploading) && uploading.length > 0

  return (
    <div>
      <div className='published-gateways'>
        <div className='flex-box'>
          {hasPublishedOrIsUploading && <UploadCard />}
          {Array.isArray(uploading) && uploading.map((gateway, index) => {
            return <UploadingCard key={index} gateway={gateway} />
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
