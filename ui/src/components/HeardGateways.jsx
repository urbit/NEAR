import React, { useEffect } from 'react'
import useGatewaysState from '../../state/useGatewayState'
import useUiState from '../../state/useUiState'
import { scryHeard } from '../api/scries'
import GatewayCard from './GatewayCard'

function HeardGateways() {
  const {
    loading,
    setShowDelete,
    setInstallWindow
  } = useUiState()
  const {
    heard,
    installed,
    newGateways,
    installedGateways,
    setHeard,
    setDelGateway,
    setInstGateway,
    setNewGateways,
    setInstalledGateways
  } = useGatewaysState()

  useEffect(() => {
    (async () => {
      const heardResult = await scryHeard();
      setHeard(heardResult);

      if (heardResult !== null) {
        if (installed !== null) {
          for (let i = 0; i < heardResult.length; i++) {
            let gateway = heardResult[i];
            let isInstalled = installed.find(installedGateway => {
              return installedGateway.id === gateway.id;
            });
            if (isInstalled !== undefined) {
              setInstalledGateways(prevInstalledGateways => {
                return [...prevInstalledGateways, gateway];
              });
            } else {
              setNewGateways(prevNewGateways => {
                return [...prevNewGateways, gateway];
              });
            }
          }
        } else {
          setNewGateways(heardResult);
        }
      } else {
        setNewGateways([]);
      }
    })();
  }, []);

  if (heard === null && !loading) {
    return (
      <div>
        <h2 className="headers">Yet to be discovered. Get some %pals</h2>
      </div>
    )
  }

  return (
    <div>
      <div className='flex-box'>
        {installedGateways.map((gateway, index) => {
          return (
            <GatewayCard
              key={index}
              gateway={gateway}
              isPublished={false}
              isInstalled={true}
            />
          )
        })}
        {newGateways &&
          (newGateways.map((gateway, index) => {
            return (
              <GatewayCard
                key={index}
                gateway={gateway}
                isPublished={false}
                isInstalled={installed.some(installedGateway => {
                  gateway.id === installedGateway.id
                })}
              />
            )
          }))
        }
      </div>
    </div>
  )
}

export default HeardGateways
