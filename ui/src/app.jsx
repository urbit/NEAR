import React, { useEffect } from 'react';
import HeardGateways from './components/HeardGateways.jsx'
import PublishedGateways from './components/PublishedGateways.jsx'
import DeleteGateway from './components/DeleteGateway.jsx'
import InstallGatewayModal from './components/InstallGatewayModal.jsx'
import useUiState from '../state/useUiState.js';
import useGatewaysState from '../state/useGatewayState.js';
import { scryHeard, scryInstalled, scryPublished } from './api/scries.js';
import { subscribeToUpdates } from './api/subscriptions.js';

export function App() {
  const {
    subEvent,
    setSubEvent,
    loading,
    setLoading,
    showDelete,
    installWindow,
  } = useUiState()
  const {
    setHeard,
    setPublished,
    setInstalled,
  } = useGatewaysState()

  async function scryToGateways() {
    console.log('Scrying to gateways')

    setHeard(scryHeard())
    setPublished(scryPublished())
    setInstalled(scryInstalled())
    setLoading(false)
  }

  useEffect(() => {
    if (loading === true){
      scryToGateways()
    }
  }, [loading])

  useEffect(() => {
    subscribeToUpdates(setSubEvent)
  }, [subEvent])

  return (
    <div className='container-body'>
      <div className='container-main'>
        {!loading &&
          <div>
            {subEvent.url != undefined &&
              <div className='err-window'>
                <h2>Couldn't find glob for gateway at {subEvent.url}</h2>
                <button onClick={()=>{window.location.reload()}}>Reload</button>
              </div>
            }
            {showDelete &&
              <div>
                <DeleteGateway />
              </div>
            }
            {installWindow &&
              <div>
                <InstallGatewayModal />
              </div>
            }
            <h2 className='headers'>Published</h2>
            <div className='containerComponent'>
              <PublishedGateways />
            </div>
            <h2 className='headers'>Heard</h2>
            <div className='containerComponent'>
              <HeardGateways />
            </div>
          </div>
        }
      </div>
    </div>
  )
}
