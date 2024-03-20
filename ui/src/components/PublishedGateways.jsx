import React, { useState } from 'react'
import NewGateway from './NewGateway.jsx'

function PublishedGateways(props) {
    const [showNew, setShowNew] = useState(false)

    const published = props.published
    const loading = props.loading 
    const api = props.api

    // const published = [{name:'react-app-lates', ship:'zod', url:'http://localhost/apps/near/~zod/0v1.1u794.eh94h.2fdr0.ncemq.j4va0/gateway/home', about:'Added Urbit component from testnet chain'}, {name:'gateway', ship:'~zod', url:'http://localhost/apps/near/~zod/0v3.rd4le.ge11r.0jsbv.5mchr.l3rh2/gateway/', about:''}]

    return(
        <div>
        <div className="newGateway">
        {showNew ?
        <div>
          <NewGateway api={api} setShowNew={setShowNew}/></div> : 
        <div></div>}
        </div>
        {(published !== null)  && !loading ?
        <div>
            <div className='flexBox'>{published.map((gateway, index) => {
                let name = gateway.name
                let url = './near/' + gateway.ship + '/' + gateway.id + '/gateway/'
                //let url = 'http://localhost:80/apps/near/' + gateway.ship + '/' + gateway.id + '/gateway/'
                return(
                <div key={index} className='gatewayContainer'>
                    <iframe src={url} title={url} className='frame'></iframe>
                    <div className='info'>
                    <h2 className='name' href={url}>{name}</h2>
                    <h3 className='ship'>{ship}</h3>
                    <h4 className='text'>{gateway.about}</h4>
                    </div>
                    <div className="git">
                    <a href={url}>Gateway</a>
                    </div></div>)})
                }
                <div className='addGateway' onClick={()=>{setShowNew(true)}}>
                <h1 className='addButton'>+</h1>
                <div className='info'>
                    <h2 className='name'>Upload Your Gateway</h2>
                    <h4 className='text'>Once uploaded, NEAR gateways can be mirrored by any other urbit server for better availability.</h4>
                </div>
                </div>
                </div>
            </div> : <div className='flexBox'><div className='addGateway' onClick={()=>{setShowNew(true)}}>
                    <h1 className='addButton'>+</h1>
                <div className='info'>
                    <h2>Upload Your Gateway</h2>
                    <h4 className='text'>Once uploaded, NEAR gateways can be mirrored by any other urbit server for better availability.</h4>
                </div>
                </div>
                </div>}
        </div>
    )
}
export default PublishedGateways