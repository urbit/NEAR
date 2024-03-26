import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import HeardGateways from './components/HeardGateways.jsx'
import PublishedGateways from './components/PublishedGateways.jsx'
import DeleteGateway from './components/DeleteGateway.jsx'


export function App() {
  const [showDelete, setShowDelete] = useState(false)
  const [delGateway, setDelGateway] = useState({})
  const api = new Urbit('', '', 'near-handler');
  api.ship = window.ship;



  const [heard, setHeard] = useState([])
  const [published, setPublished] = useState([])
  const [installed, setInstalled] = useState([])
  const [loading, setLoading] = useState(true)

  async function scryToGateways() {
    console.log('scrying to gateways')
    let scryPublish = await api.scry({
      app: 'near-gateways',
      path: '/published'
    })
    console.log(scryPublish)
    setPublished(scryPublish)
    let scryInstalled = await api.scry({
      app: 'near-gateways',
      path: '/installed'
    })
    console.log(scryInstalled)
    setInstalled(scryInstalled)
    let scryHeard = await api.scry({ app: 'near-gateways', path: '/heard' })
      setHeard(scryHeard)
    setLoading(false)
  }
 
  useEffect(() => {
  if (loading === true){
    scryToGateways()
  }
}, [loading])

async function deleteGateway(gateway) {
  api.poke({
      app: "near-gateways",
      mark: "near-action",
      json: {"delete": {"ship": gateway.ship, "id": gateway.id}},
      onSuccess: () =>  {setDelGateway({}), window.location.reload(), setShowDelete(false)},
      onError: () => setError('Failed to delete gateway')
  }) 
}



  return (
    <div className='containerBody'>
      <div className='containerMain'> 
      {loading ? <div>loading</div> :
        <div>
          {showDelete ? 
            <div><DeleteGateway gateway={delGateway} setShowDelete={setShowDelete} deleteGateway={deleteGateway}/></div> 
          :<div></div>}
        <h2 className='headers'>Published</h2>
        <div className='containerComponent'>
          <PublishedGateways published={published} loading={loading} api={api} showDelete={showDelete} setShowDelete={setShowDelete} delGateway={delGateway} setDelGateway={setDelGateway} deleteGateway={deleteGateway}/></div>
          <h2 className='headers'>Heard</h2>
          <div className='containerComponent'> 
        <HeardGateways api={api} heard={heard} installed={installed} loading={loading} setShowDelete={setShowDelete} setDelGateway={setDelGateway}/></div>
      </div>
  }</div>
    </div>
  )
}