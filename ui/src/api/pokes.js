import Urbit from '@urbit/http-api'

function defaultOnSuccess() {}

function defaultOnError(app, mark, json) {
  console.error(`Failed to poke ${app} with mark ${mark} and json ${json}`)
}

function pokeUrbit(app, mark, json, onSuccess, onError) {
  const api = new Urbit('')
  api.ship = window.ship
  return api.poke({
    app: app,
    mark: mark,
    json: json,
    onSuccess: onSuccess || defaultOnSuccess(),
    onError: onError || defaultOnError(app, mark, json)
  })
}

export function deleteGateway(gateway, onSuccess) {
  return pokeUrbit(
    'near-gateways',
    'near-action',
    {
      delete: {
        id: gateway.id,
        ship: gateway.ship,
      }
    },
    onSuccess,
    console.error(`Failed to delete gateway ${gateway.id}`)
  )
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
        name: gateway.name,
        date: gateway.date,
        url: gateway.url,
        about: gateway.about,
        thumbnail: gateway.thumbnail
      }
    }
    }
  )
}

export function publishGateway(gateway) {
  return pokeUrbit(
    'near-gateways',
    'near-action',
    {
      publish: {
        name: gateway.name || '',
        url: gateway.url || '',
        about: gateway.about || '',
        thumbnail: gateway.thumbnail || ''
      }
    },
    () => {},
    () => console.error(`Failed to publish ${gateway.name}`))
}

export function hideGateway(gateway, onSuccess) {
  return pokeUrbit(
    'near-gateways',
    'near-action',
    {
      hide: {
        id: gateway.id,
        ship: gateway.ship
      }
    },
    onSuccess,
    () => console.error(`Failed to hide ${gateway.id}`)
  )
}
