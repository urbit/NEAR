import Urbit from '@urbit/http-api'

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
    onSuccess: onSuccess || {},
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
        url: gateway.url,
        name: gateway.name,
        about: gateway.about,
        thumbnail: gateway.thumbnail
      }
    }
    }
  )
}

export function publishGateway(gateway, blob) {
  function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  blobToBase64(blob).then(base64 => {
    return pokeUrbit(
      'near-gateways',
      'near-action',
      {
        publish: {
          metadata: {
            name: gateway.name,
            url: gateway.url,
            about: gateway.about,
            thumbnail: `${window.location.origin}/apps/near/thumbnails/${crypto.randomUUID()}.jpg`
          },
          blob: base64.split(',')[1]
        }
      },
      {},
      () => console.error(`Failed to publish ${gateway.name}`))
  })
}
