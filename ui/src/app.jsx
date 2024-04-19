import React, { useEffect } from 'react';
import HeardGateways from './components/HeardGateways.jsx'
import PublishedGateways from './components/PublishedGateways.jsx'
import DeleteGateway from './components/DeleteGateway.jsx'
import InstallGatewayModal from './components/InstallGatewayModal.jsx'
import useUiStore from '../state/uiStore'
import useGatewaysStore from '../state/gatewaysStore.js';
import { scryInstalled } from './api/scries.js';
import { subscribeToUpdates } from './api/subscriptions.js';

export function App() {
  const {
    subEvent,
    setSubEvent,
    showDelete,
    installWindow
  } = useUiStore()
  const {
    setInstalled
  } = useGatewaysStore()

  useEffect(() => {
    console.log('app.jsx installWindow:', installWindow);
  }, [installWindow])

  useEffect(() => {
    (async () => {
      setInstalled(await scryInstalled());
    })();
  }, []);

  useEffect(() => {
    subscribeToUpdates(setSubEvent)
  }, [subEvent])

  return (
    <div className='container-body'>
      <div className='container-main'>
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
      </div>
    </div>
  )
}
