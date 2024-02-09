import React from 'react'

function PublishedGateways(arg) {

const published = arg.published
const loading = arg.loading 
const publishContainer = "mt-4 p-4 font-medium"
const gatewayContainer = "border-2 border-gray-100 p-4 w-max"
const frame = "border-2 border-grey-900 w-fit"
const header = "text-center p-3"
const btnStyle= "text-center pt-3 hover:font-semibold"

    return(
        <div className={publishContainer}>
        {(published !== null)  && !loading ?
        <div>
        <h2 className={header}>Published:</h2>
            <div>{published.map((gateway, index) => {
                let name = gateway.name
                let url = './' + gateway.ship + '/' + gateway.id + '/index.html'
                //let url = 'http://localhost:80/apps/near/' + gateway.ship + '/' + gateway.id + '/index.html'
                return(
                <div key={index} className={gatewayContainer}>
                    <iframe src={url} title={url} className={frame}></iframe>
                    <a href={url} className={btnStyle}>{name}</a>
                    </div>)}
            )
                }</div>
            </div> : <div>No published gateways</div>}
        </div>
    )
}
export default PublishedGateways