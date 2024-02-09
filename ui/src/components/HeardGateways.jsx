import React from 'react'

function HeardGateways(arg) {
    const api= arg.api
    const heard = arg.heard
    const installed = arg.installed
    const loading = arg.loading

    async function pokeInstall(gateway) {
        console.log(gateway)
        console.log({'install': {
            'identifier' : {'ship' : gateway.ship, 
                            'id' : gateway.id}, 
            'metadata' : {'name' : gateway.name,
                            'url' : gateway.url} 
        }})
        api.poke({
            app:"near-gateways",
            mark:"near-action",
            json:{'install': {
                'identifier' : {'ship' : gateway.ship, 
                                'id' : gateway.id}, 
                'metadata' : {'name' : gateway.name,
                                'url' : gateway.url} 
            }}, 
            onSuccess: () => console.log('installed'),  //window.location.reload(), //reload page here
            onError: () => console.log("install of " + gateway.name + " failed")
        })
    }
    
const heardContainer = "font-medium p-4 mt-4"
const gatewayContainer = "border-2 border-gray-100 p-4 grid align-center"
const btnStyle = "text-white bg-gray-400 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium w-full sm:w-auto px-3 py-2 text-center m-3"
const header = "text-center p-3"
const frame = "border-2 border-grey-900 w-fit"
const linkStyle= "text-center pt-3 hover:font-semibold"

    return(
         <div className={heardContainer}>
        <h2 className={header}>Heard:</h2>
        {(heard !== null) && !loading ?
        <div>{heard.map((gateway, index) => {
            let name = gateway.name
            let isInstalled = installed.find(instGateway => instGateway.id === gateway.id)
            //let url = 'http://localhost:80/apps/near/' + gateway.ship + '/' + gateway.id + '/index.html'
            let url = './' + gateway.ship + '/' + gateway.id + '/index.html'

            return(
            <div key={index} className={gatewayContainer}>
                {(isInstalled !== undefined) &&
                <div className="text-center">
                <iframe src={url} title={url} className={frame}></iframe>
                <a href={url} className={linkStyle}>visit {name}</a>
                </div>}
                <h2 className="text-left">{name}</h2>
                <h3 className="text-left">{gateway.ship}</h3>
                {(isInstalled === undefined) &&
                <button onClick={() => pokeInstall(gateway)} className={btnStyle}
                >install</button>}
                </div>)}
        )
            }
        </div> :
        <div>Yet to be dicovered</div>}
    </div>
    )

}
export default HeardGateways