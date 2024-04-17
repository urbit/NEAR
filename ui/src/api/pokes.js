import Urbit from '@urbit/http-api'

function defaultOnError(app, mark, json) {
  console.error(`Failed to poke ${app} with mark ${mark} and json ${json}`)
}

function pokeUrbit(app, mark, json, onSuccess, onError) {
  const api = new Urbit('', '', 'near')
  api.ship = window.ship
  return api.poke({
    app: app,
    mark: mark,
    json: json,
    onSuccess: onSuccess || {},
    onError: onError || defaultOnError
  })
}

export function installGateway(gateway) {
  return pokeUrbit(
    'near-gateways',
    'near-action',
    {
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
    () => window.location.reload()
  )
}

export function publishGateway(gateway, setNewGateway) {
  return pokeUrbit(
  'near-gateways',
  'near-action',
  {
    publish: {
      name: gateway.name,
      url: gateway.url,
      about: gateway.about
    }
  },
  setNewGateway({}),
  () => console.error(`Failed to fetch glob from ${gateway.url}`))
}
