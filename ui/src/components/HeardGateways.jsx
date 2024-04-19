import React, { useEffect } from 'react'
import useGatewaysStore from '../state/gatewaysStore'
import useUiStore from '../state/uiStore'
import { scryHeard } from '../api/scries'
import GatewayCard from './GatewayCard'

function HeardGateways() {
  const {
    loading
  } = useUiStore()
  const {
    heard,
    installed,
    newGateways,
    installedGateways,
    setHeard,
    setNewGateways,
    setInstalledGateways
  } = useGatewaysStore()

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

  if (heard === null && !loading) {
    return <div><h2 className="headers">Yet to be discovered. Get some %pals</h2></div>
  }

  return (
    <div>
      <div className='flex-box'>
        {installedGateways.map((gateway) => (
          <GatewayCard
            key={gateway.id}
            gateway={gateway}
            isPublished={false}
            isInstalled={true}
          />
        ))}
        {newGateways.map((gateway) => (
          <GatewayCard
            key={gateway.id}
            gateway={gateway}
            isPublished={false}
            isInstalled={false}
          />
        ))}
      </div>
    </div>
  )
}

export default HeardGateways
