import React, { useEffect } from 'react'
import useGatewaysStore from '../state/gatewaysStore'
import { scryHeard } from '../api/scries'
import GatewayCard from './GatewayCard'
import UploadCard from './UploadCard'

function HeardGateways() {
  const {
    installed,
    published,
    uploading,
    newGateways,
    installedGateways,
    setHeard,
    setNewGateways,
    setInstalledGateways
  } = useGatewaysStore()

  const hasPublishedOrIsUploading =
    Array.isArray(published) && published.length > 0 ||
    Array.isArray(uploading) && uploading.length > 0

  useEffect(() => {
    (async () => {
      const heardResult = await scryHeard()
      setHeard(heardResult)

      if (heardResult !== null) {
        const newGatewaysArray = []
        const installedGatewaysArray = []

        for (let gateway of heardResult) {
          const isInstalled = installed.some(inst => inst.id === gateway.id)
          if (isInstalled) {
            installedGatewaysArray.push(gateway)
          } else {
            newGatewaysArray.push(gateway)
          }
        }

        setInstalledGateways(installedGatewaysArray)
        setNewGateways(newGatewaysArray)
      } else {
        setNewGateways([])
      }
    })()
  }, [])

  if (newGateways.length === 0) {
    return (
      <>
      {!hasPublishedOrIsUploading && <><UploadCard /><br /></>}
      <h2 className="headers" style={{ opacity: 0.5 }}>No heard gateways</h2>
      </>
    )
  }

  return (
    <div>
      <div className='flex-box'>
      {!hasPublishedOrIsUploading && <UploadCard />}
        {installedGateways.map((gateway) => (
          <GatewayCard
            key={gateway.id}
            gateway={gateway}
          />
        ))}
        {newGateways.map((gateway) => (
          <GatewayCard
            key={gateway.id}
            gateway={gateway}
          />
        ))}
      </div>
    </div>
  )
}

export default HeardGateways
