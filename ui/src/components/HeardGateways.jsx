import React, { useState, useEffect } from 'react'

function HeardGateways(props) {
    const api= props.api
    const heard = props.heard
    const installed = props.installed
    const loading = props.loading

    const [installedGateways, setInstalledGateways] = useState([])
    const [newGateways, setNewGateways] = useState([])

    async function pokeInstall(gateway) {
        console.log(gateway)
        console.log({'install': {
            'identifier' : {'ship' : gateway.ship, 
                            'id' : gateway.id}, 
            'metadata' : {'name' : gateway.name,
                            'url' : gateway.url,
                            'about' :gateway.about} 
        }})
        api.poke({
            app:"near-gateways",
            mark:"near-action",
            json:{'install': {
                'identifier' : {'ship' : gateway.ship, 
                                'id' : gateway.id}, 
                'metadata' : {'name' : gateway.name,
                                'url' : gateway.url,
                                'about' :gateway.about} 
            }}, 
            onSuccess: () => window.location.reload(), 
            onError: () => console.log("install of " + gateway.name + " failed")
        })
    }
    
    const sortHeard = () =>{
        if (heard  !==  null &&  installed !== null){
            for (let i = 0; i < heard.length; i++){
                let gateway = heard[i]
                let isInstalled = installed.find(instGateway => instGateway.id === gateway.id)
                console.log(installed.find(instGateway => instGateway.id === gateway.id))
                if (isInstalled !== undefined){
                    console.log('gateway installed', gateway)
                    setInstalledGateways(current => [...current, gateway])
                }else{
                    console.log('gatewa not installed', gateway)
                    setNewGateways(current => [...current, gateway])
                }
            }
        }else if (heard  !==  null &&  installed === null){
            console.log('no installed but heard')
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
                let url = './near/' + gateway.ship + '/' + gateway.id + '/gateway/'
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
                    </div></div>
                    )})}
            {newGateways !== null ?
            (newGateways.map((gateway, index) =>{
                return(
            <div className='gatewayContainer' id='new' key={index}> 
            <h1 className='addButton'>+</h1>
            <div className='info'>
            <h2 className="name">{gateway.name}</h2>
            <h3 className="ship">{gateway.ship}</h3>
            <h4 className='text'>{gateway.about}</h4>
            </div>
            <div className='install'>
            <button onClick={() => pokeInstall(gateway)}
            >Mirror</button>
            </div>
            </div>)})):<div></div>}
        </div>
        : <div><h2 className="headers">Yet to be dicovered.  Get some %pals</h2></div>
        }
    </div>
    )

}
export default HeardGateways