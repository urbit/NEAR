import React, { useEffect, useState } from 'react';
import Urbit from '@urbit/http-api';
import NewGateway from './components/NewGateway.jsx'
import HeardGateways from './components/HeardGateways.jsx'
import PublishedGateways from './components/PublishedGateways.jsx'


// const api = new Urbit(
//   'http://localhost:80',
//   'lidlut-tabwed-pillex-ridrup',
//   'near-handler'
// )
// api.ship = 'zod'
const api = new Urbit('', '', 'near-handler');
api.ship = window.ship;

export function App() {
  const [heard, setHeard] = useState([])
  const [published, setPublished] = useState([])
  const [installed, setInstalled] = useState([])
  const [showHeard, setShowHeard] = useState(false)
  const [showPublished, setShowPublished] = useState(false)
  const [showNew, setShowNew] = useState(true)
  const [loading, setLoading] = useState(false)

  async function scryToGateways() {
    console.log('scrying to gateways')
    let scryPublish = await api.scry({
      app: 'near-gateways',
      path: '/published'
    })
    setPublished(scryPublish)
    let scryInstalled = await api.scry({
      app: 'near-gateways',
      path: '/installed'
    })
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


const containerBody = "grid grid-cols-3 justify-items-stretch"
const containerNav = "col-start-2 col-end-3 grid grid-cols-3 justify-items-stretch gap-4"
  const btnStyle= "text-center pt-3 hover:font-semibold"
const containerComponent = "" 
const containerMain = "col-start-2 col-end-3"

  return (
    <div className={containerBody}>
      <div className={containerNav}>
        <button onClick={()=>{setShowHeard(true), setShowNew(false), setShowPublished(false),setLoading(true)}}
        className={btnStyle}>Heard</button>
        <button onClick={()=>{setShowPublished(true), setShowNew(false), setShowHeard(false), setLoading(true)}}
        className={btnStyle}>Published</button>
        <button onClick={()=>{setShowNew(true), setShowHeard(false), setShowPublished(false)}}
        className={btnStyle}>New Gateway</button>
      </div>
      <div className={containerMain}> 
      {loading ? <div>loading</div> :
      <div>
        <div>
      {showNew ?
        <div className={containerComponent}>
          <NewGateway api={api}/></div> : 
        <div></div>
          }</div>
      {showPublished &&  !loading ?
        <div className={containerComponent}>
          <PublishedGateways published={published} loading={loading}/></div> : <div></div>}
      {showHeard &&  !loading ? 
        <div className={containerComponent}> 
        <HeardGateways api={api} heard={heard} installed={installed} loading={loading}/></div> :
      <div></div>}
      </div>
  }</div>
    </div>
  )
}