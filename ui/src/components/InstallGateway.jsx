import React from 'react'

function InstallGateway({ api, gateway, setInstallWindow, setInstGateway }) {
  async function pokeInstall(gateway) {
    api.poke({
      app: "near-gateways",
      mark: "near-action",
      json: {
        install: {
          identifier: {
            ship: gateway.ship,
            id: gateway.id
          },
          metadata: {
            name: gateway.name,
            url: gateway.url,
            about: gateway.about
          }
        }
      },
      onSuccess: () => window.location.reload(),
      onError: () => console.log(`Failed to install ${gateway.name}`)
    })
  }

  return (
    <div className="deleteGateway">
      <h2 className='paragraph'>
        BOS gateways can access all data on your ship, just like any other Urbit app. Only install gateways from developers you trust!
      </h2>
      <h2 className='paragraph-2'>
        Would you like to install {gateway.name}?
      </h2>
      <div className="instButtons">
        <button onClick={() => {pokeInstall(gateway)}}>
          Install
        </button>
        <button onClick={() => { setInstallWindow(false), setInstGateway({}) }}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default InstallGateway
