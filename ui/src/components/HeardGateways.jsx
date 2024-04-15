import React, { useState, useEffect } from 'react'

function HeardGateways(props) {
    const [installedGateways, setInstalledGateways] = useState([])
    const [newGateways, setNewGateways] = useState([]) 

    const heard = props.heard
    const installed = props.installed
    const loading = props.loading
    const setShowDelete = props.setShowDelete
    const setDelGateway = props.setDelGateway
    const setInstallWindow = props.setInstallWindow
    const setInstGateway = props.setInstGateway

    const sortHeard = () =>{ 
        if (heard  !==  null &&  installed !== null){
            for (let i = 0; i < heard.length; i++){
                let gateway = heard[i]
                let isInstalled = installed.find(instGateway => instGateway.id === gateway.id)
                if (isInstalled !== undefined){
                    setInstalledGateways(current => [...current, gateway])
                }else{
                        setNewGateways(current => [...current, gateway])
                }
            }
        }else if (heard  !==  null &&  installed === null){
            setNewGateways(heard)
        }else{
            setNewGateways([])
        }
    }

    useEffect(() => {
        if (heard !== null){
        sortHeard()
        }
      }, [])


    return(
         <div>
        {(heard !== null) && !loading ?
        <div className='flexBox'>
            {installedGateways.map((gateway, index) => {
                let name = gateway.name
                let url = 'http://localhost:8080/apps/near/' + gateway.ship + '/' + gateway.id + '/gateway/'
                //let url = './near/' + gateway.ship + '/' + gateway.id + '/gateway/'
                return(
                <div className='gatewayContainer' id={index} key={index}>
                    <iframe src={url} title={url} className='frame'></iframe>
                    <div className='info'>
                    <h2 className='name' href={url}>{name}</h2>
                    <h3 className='ship'>{gateway.ship}</h3>
                    <h4 className='text'>{gateway.about}</h4>
                    </div>
                    <div className="git">
                    <a href={url}>Gateway</a>
                    <button onClick={() => {setShowDelete(true), setDelGateway(gateway)}}>
                        Delete
                    </button>
                    </div>
                </div>
                )})}
            {newGateways !== null ?
            (newGateways.map((gateway, index) => {
                return(
            <div className='gatewayContainer' id='new' key={index}> 
            <h1 className='addButton'>+</h1>
            <div className='info'>
            <h2 className="name">{gateway.name}</h2>
            <h3 className="ship">{gateway.ship}</h3>
            <h4 className='text'>{gateway.about}</h4>
            </div>
            <div className='install'>
            <button onClick={() => {setInstallWindow(true), setInstGateway(gateway)}}
            >Install</button>
            </div>
            </div>)})):<div></div>}
        </div>
        : <div><h2 className="headers">Yet to be discovered.  Get some %pals</h2></div>
        }
    </div>
    )

}
export default HeardGateways