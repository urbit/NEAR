import React from 'react'
import useUiState from '../../state/useUiState'
import useGatewaysState from '../../state/useGatewayState'

function getImage(url) {
  // TODO get image and fallback if bad response
  return url
}

function GatewayCard({ key, gateway, isPublished, isInstalled }) {
  const { setInstGateway } = useGatewaysState()
  const { setShowDelete, setInstallWindow } = useUiState()

  function handleInstallClick() {
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
    // TODO accomodate unpublishing in UI / copy
    setShowDelete(true)
  }

  return (
    <div key={key} className='gateway-container'>
      <img
        src={getImage('https://pbs.twimg.com/profile_images/1631021064171196431/_ahCp9jR_400x400.jpg')}
        alt={`${gateway.name} preview image`}
      />
      <div className='info'>
        <h2 className='title'>{gateway.name}</h2>
        <h3 className='ship'>{gateway.ship}</h3>
        <h4 className='text'>{gateway.about}</h4>
      </div>
      <div className="git">
        {isInstalled &&
        <button onClick={() => {
          isPublished ? handleUnpublishClick : handleDeleteClick
          }}>
          {isPublished ? 'Unpublish' : 'Delete'}
        </button>}
        <button onClick={() => {
          isInstalled ? handleOpenClick : handleInstallClick
          }}>
          {isInstalled ? 'Open' : 'Install'}
        </button>
      </div>
    </div>
  )
}

export default GatewayCard
