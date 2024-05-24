import React, { useEffect } from 'react';
import HeardGateways from './components/HeardGateways.jsx'
import PublishedGateways from './components/PublishedGateways.jsx'
import DeleteGateway from './components/DeleteGateway.jsx'
import InstallGatewayModal from './components/InstallGatewayModal.jsx'
import useUiStore from './state/uiStore'
import useGatewaysStore from './state/gatewaysStore.js';
import { scryInstalled, scryPublished } from './api/scries.js';
import { subscribeToUpdates } from './api/subscriptions.js';
import NewGateway from './components/NewGateway.jsx';
import helpIcon from './assets/help.svg'

export function App() {
  const {
    published,
    uploading,
    setInstalled,
    setPublished,
    addToInstalled,
    addToPublished,
    removeFromUploading
  } = useGatewaysStore()
  const {
    subEvent,
    setSubEvent,
    showNew,
    showFailedGlob,
    setShowFailedGlob,
    showDelete,
    installWindow
  } = useUiStore()

  const hasPublishedOrIsUploading =
    Array.isArray(published) && published.length > 0 ||
    Array.isArray(uploading) && uploading.length > 0

    useEffect(() => {
      async function init() {
        const initInstalled = await scryInstalled();
        const initPublished = await scryPublished();

        setInstalled(initInstalled === null ? [] : initInstalled)
        setPublished(initPublished === null ? [] : initPublished)
      }
      init();
    }, []);

  useEffect(() => {
    subscribeToUpdates(update => {
      console.log('Update:', update)
      switch (update.updateTag) {
        case 'installed':
          addToInstalled(update.gateways[0])
          break
        case 'published':
          addToPublished(update.gateways[0])
          removeFromUploading(update.gateways[0])
          break
        case 'failed-glob':
          setSubEvent(update)
          setShowFailedGlob(true)
          break
        default:
          console.error('Unrecognized update:', update)
          break
      }
    })
  }, [subEvent])

  return (
    <div className='container-body'>
      <div className='container-main'>
          <div>
            {showFailedGlob &&
              <div className='err-window'>
                <h2>Couldn't find glob for gateway at {subEvent.url}</h2>
                <button onClick={()=>{window.location.reload()}}>Reload</button>
              </div>}
            {showDelete &&
              <div>
                <DeleteGateway />
              </div>}
            {installWindow &&
              <div>
                <InstallGatewayModal />
              </div>}
            {showNew &&
              <div>
                <NewGateway />
              </div>}
            <div className="app-header">
              <span>NEAR Gateways</span>
              <img src={helpIcon} alt="help icon" />
            </div>
            {hasPublishedOrIsUploading &&
            <>
              <h2 className='headers'>Published</h2>
              <div className='containerComponent'>
                <PublishedGateways />
              </div>
            </>}
            {hasPublishedOrIsUploading && <h2 className='headers'>Heard</h2>}
            <div className='containerComponent'>
              <HeardGateways />
            </div>
          </div>
      </div>
    </div>
  )
}
