import React from 'react'
import useGatewaysStore from '../state/gatewaysStore'
import useUiStore from '../state/uiStore'

function getImage(url) {
  // TODO get image and fallback if bad response
  return url
}

function GatewayCard({ gateway }) {
  const { installed, published, setDelGateway, setInstGateway } = useGatewaysStore()
  const { setShowDelete, setInstallWindow } = useUiStore()

  const isInstalled = Array.isArray(installed) && installed.some(installedGateway => {
    return gateway.id === installedGateway.id
  })

  const isPublished = Array.isArray(published) && published.some(publishedGateway => {
    return gateway.id === publishedGateway.id
  })

  function handleInstallClick() {
    console.log('Attempting to install')
    setInstGateway(gateway)
    setInstallWindow(true)
  }

  function handleOpenClick() {
    window.open(
      `${window.location.origin}/apps/near/${gateway.ship}/${gateway.id}/gateway/`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  function handleDeleteClick() {
    setDelGateway(gateway)
    setShowDelete(true)
  }

  function handleUnpublishClick() {
    setDelGateway(gateway)
    // TODO accommodate unpublishing in UI / copy
    setShowDelete(true)
  }

  return (
    <div className='gateway-container'>
      <div className='image-container'>
        <img
          src={getImage(gateway.thumbnail)}
          alt={`${gateway.name} preview image`}
          className='gateway-image'
        />
      </div>
      <div className='info'>
        <h2 className='title'>{gateway.name}</h2>
        <h3 className='ship'>{gateway.ship}</h3>
        <h4 className='text'>{gateway.about}</h4>
      </div>
      <div className="git">
        {isPublished &&
        <button onClick={handleUnpublishClick}>
          Unpublish
        </button>}
        {isInstalled && !isPublished &&
        <button onClick={handleDeleteClick}>
          Delete
        </button>}
        {isInstalled &&
        <button onClick={handleOpenClick}>
          Open
        </button>}
        {!isInstalled && !isPublished &&
        <button onClick={handleInstallClick}>
          Install
        </button>}
      </div>
    </div>
  )
}

export default GatewayCard
