import Urbit from '@urbit/http-api'

function subscribeToUrbit(app, path, err, event, quit) {
  const api = new Urbit('')

  return api.subscribe({
    app: app,
    path: path,
    ship: window.ship,
    err: err || {},
    event: event,
    quit: quit || {}
  })
}

export async function subscribeToUpdates(setSubEvent) {
  return await subscribeToUrbit(
    'near-gateways',
    '/updates',
    () => {console.error('Failed to subscribe to /updates')},
    setSubEvent,
    () => {console.log('Kicked from /charges')}
  )
}
