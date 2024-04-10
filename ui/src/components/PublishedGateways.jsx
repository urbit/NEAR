import React, { useState } from 'react'
import NewGateway from './NewGateway.jsx'

function PublishedGateways(props) {
    const [showNew, setShowNew] = useState(false)

    const published = props.published
    const loading = props.loading 
    const api = props.api
    const setShowDelete = props.setShowDelete
    const setDelGateway = props.setDelGateway


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
                return(
                <div key={index} className='gatewayContainer'>
                    <iframe src={url} title={url} className='frame'></iframe>
                    <div className='info'>
                    <h2 className='name' href={url}>{name}</h2>
                    <h3 className='ship'>{gateway.ship}</h3>
                    <h4 className='text'>{gateway.about}</h4>
                    </div>
                    <div className="git">
                    <button onClick={() => {setShowNew(false), setShowDelete(true), setDelGateway(gateway)}}>Delete</button>
                    <a href={url}>Gateway</a>
                    </div></div>)})
                }
                <div className='addGateway' onClick={()=>{setShowNew(true), setDelGateway({}), setShowDelete(false)}}>
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