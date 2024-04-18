import React, { useEffect } from 'react'
import useGatewaysState from '../../state/useGatewayState'
import useUiState from '../../state/useUiState'
import { scryHeard } from '../api/scries'

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
          let name = gateway.name
          let url = `${window.location.origin}/apps/near/${gateway.ship}/${gateway.id}/gateway/`
          return (
            <div className='gateway-container' id={index} key={index}>
              <iframe src={url} title={url} className='frame'></iframe>
              <div className='info'>
                <h2 className='name' href={url}>{name}</h2>
                <h3 className='ship'>{gateway.ship}</h3>
                <h4 className='text'>{gateway.about}</h4>
              </div>
              <div className="git">
                <a href={url}>Gateway</a>
                <button onClick={() => {
                  setShowDelete(true)
                  setDelGateway(gateway)
                }}>
                  Delete
                </button>
              </div>
            </div>
          )
        })}
        {newGateways !== null &&
          (newGateways.map((gateway, index) => {
            return (
              <div className='gateway-container' id='new' key={index}>
                <h1 className='add-button'>+</h1>
                <div className='info'>
                  <h2 className="name">{gateway.name}</h2>
                  <h3 className="ship">{gateway.ship}</h3>
                  <h4 className='text'>{gateway.about}</h4>
                </div>
                <div className='install'>
                  <button onClick={() => {
                    setInstallWindow(true)
                    setInstGateway(gateway)
                  }}>
                    Install
                  </button>
                </div>
              </div>
            )
          }))
        }
      </div>
    </div>
  )
}

export default HeardGateways
