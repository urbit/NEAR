import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import HeardGateways from './components/HeardGateways.jsx'
import PublishedGateways from './components/PublishedGateways.jsx'
import DeleteGateway from './components/DeleteGateway.jsx'
import InstallGatewayModal from './components/InstallGatewayModal.jsx'

export function App() {
  const [loading, setLoading] = useState(true)
  const [showDelete, setShowDelete] = useState(false)
  const [delGateway, setDelGateway] = useState({})
  const [installWindow, setInstallWindow] = useState(false)
  const [instGateway, setInstGateway] = useState({})
  const [subEvent, setSubEvent] = useState({});
  const [heard, setHeard] = useState([])
  const [published, setPublished] = useState([])
  const [installed, setInstalled] = useState([])

  const api = new Urbit('', '', 'near');
  api.ship = window.ship

  async function scryToGateways() {
    console.log('scrying to gateways')
    let scryPublish = await api.scry({
      app: 'near-gateways',
      path: '/published'
    })

    let scryInstalled = await api.scry({
      app: 'near-gateways',
      path: '/installed'
    })

    let scryHeard = await api.scry({
      app: 'near-gateways',
      path: '/heard'
    })

    setHeard(scryHeard)
    setPublished(scryPublish)
    setInstalled(scryInstalled)
    setLoading(false)
  }

  function getUpdates(){
    api.subscribe({
      app:'near-gateways',
      path:'/updates',
      event: setSubEvent,
      err: () => (console.log('Failed to subscribe to near-gateways/updates')),
      quit: () => (console.log("Kicked from near-gateways/updates"))})
    }

  useEffect(() => {
    if (loading === true){
      scryToGateways()
    }
  }, [loading])

  useEffect(() => {
    getUpdates()
  }, [subEvent])

  async function deleteGateway(gateway) {
    api.poke({
        app: "near-gateways",
        mark: "near-action",
        json: {delete: {ship: gateway.ship, id: gateway.id}},
        onSuccess: () =>  {
          setDelGateway({})
          window.location.reload()
          setShowDelete(false)
        },
        onError: () => setError('Failed to delete gateway')
    })
  }

  return (
    <div className='containerBody'>
      <div className='containerMain'>
        {!loading &&
          <div>
            {subEvent.url != undefined &&
              <div className='errWindow'>
                <h2>Couldn't find glob for gateway at {subEvent.url}</h2>
                <button onClick={()=>{window.location.reload()}}>Reload</button>
              </div>
            }
            {showDelete &&
              <div>
                <DeleteGateway
                  gateway={delGateway}
                  setShowDelete={setShowDelete}
                  deleteGateway={deleteGateway}
                />
              </div>
            }
            {installWindow &&
              <div>
                <InstallGatewayModal
                  gateway={instGateway}
                  setInstallWindow={setInstallWindow}
                  api={api}
                  setInstGateway={setInstGateway}
                />
              </div>
            }
            <h2 className='headers'>Published</h2>
            <div className='containerComponent'>
              <PublishedGateways
                  published={published}
                  loading={loading}
                  api={api}
                  showDelete={showDelete}
                  setShowDelete={setShowDelete}
                  delGateway={delGateway}
                  setDelGateway={setDelGateway}
                  deleteGateway={deleteGateway}
              />
            </div>
            <h2 className='headers'>Heard</h2>
            <div className='containerComponent'>
              <HeardGateways
                heard={heard}
                installed={installed}
                loading={loading}
                setShowDelete={setShowDelete}
                setDelGateway={setDelGateway}
                setInstallWindow={setInstallWindow}
                setInstGateway={setInstGateway}
              />
            </div>
          </div>
        }
      </div>
    </div>
  )
}
