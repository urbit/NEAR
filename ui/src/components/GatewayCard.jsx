import React, { useEffect } from 'react'
import useGatewaysState from '../../state/useGatewayState'
import useUiStore from '../../state/uiStore'

function getImage(url) {
  // TODO get image and fallback if bad response
  return url
}

function GatewayCard({ gateway, isPublished, isInstalled }) {
  const { setDelGateway, instGateway, setInstGateway } = useGatewaysState()
  const { installWindow, setShowDelete, setInstallWindow } = useUiStore()

  useEffect(() => {
    console.log('instGateway:', instGateway)
    console.log('installWindow:', installWindow)
  }, [instGateway, installWindow])

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
    // TODO accomodate unpublishing in UI / copy
    setShowDelete(true)
  }

  return (
    <div className='gateway-container'>
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
        {isPublished &&
        <button onClick={handleUnpublishClick}>
          Unpublish
        </button>}
        {isInstalled &&
        <button onClick={handleDeleteClick}>
          Delete
        </button>}
        {/* XX "Hide" button to remove gateway from state if not installed */}
        <button onClick={() => {
          isInstalled ? handleOpenClick() : handleInstallClick()
        }}>
          {isInstalled ? 'Open' : 'Install'}
        </button>
      </div>
    </div>
  )
}

export default GatewayCard
