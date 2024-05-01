import React, { useEffect, useState } from 'react'
import useGatewaysStore from '../state/gatewaysStore'
import useUiStore from '../state/uiStore'
import { hideGateway } from '../api/pokes'
import fallbackImage from '../assets/fallback.svg'

function GatewayCard({ gateway }) {
  const [hidden, setHidden] = useState(false)
  const { setShowDelete, setInstallWindow } = useUiStore()
  const {
    heard,
    installed,
    published,
    setHeard,
    setDelGateway,
    setInstGateway
  } = useGatewaysStore()

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
    setShowDelete(true)
  }

  useEffect(() => {
    console.log('new heard:', heard)
  }, [heard])

  function handleHideClick() {
    setHidden(true)
    hideGateway(gateway, () => setHeard(heard.filter(heardGateway => {
      return heardGateway.id !== gateway.id
    })))
  }

  return (
    <div
      className='gateway-container'
      style={{ display: hidden ? 'none' : 'auto' }}
    >
      <div className='image-container'>
        <img
          src={gateway.thumbnail ? gateway.thumbnail : fallbackImage }
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
        {/* 1st button */}
        {isPublished &&
        <button onClick={handleUnpublishClick}>
          Unpublish
        </button>}

        {isInstalled && !isPublished &&
        <button onClick={handleDeleteClick}>
          Delete
        </button>}

        {!isInstalled && !isPublished &&
        <button onClick={handleHideClick}>
          Hide
        </button>}

        {/* 2nd button */}
        {(isInstalled || isPublished) &&
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
