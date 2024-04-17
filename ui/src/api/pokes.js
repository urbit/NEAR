import Urbit from '@urbit/http-api'

function pokeUrbit(app, mark, json, onSuccess) {
  const api = new Urbit('', '', app)
  api.ship = window.ship
  return api.poke({
    app: app,
    mark: mark,
    json: json,
    onSuccess: onSuccess || {},
    onError: () => {
      console.error(`Failed to poke ${app} with mark ${mark} and json ${json}`)
    }
  })
}

export function installGateway(gateway) {
  return pokeUrbit('near-gateways', 'near-action', {
    install: {
      identifier: {
        id: gateway.id,
        ship: gateway.ship
      },
      metadata: {
        url: gateway.url,
        name: gateway.name,
        about: gateway.about
      }
    }
  },
  // onSuccess
  () => window.location.reload())
}
