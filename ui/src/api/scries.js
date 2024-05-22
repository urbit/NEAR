import Urbit from '@urbit/http-api';

function scryUrbit(app, path) {
  const api = new Urbit('');
  return api.scry({
    app: app,
    path: path
  });
}

export async function scryHeard() {
  console.log('Scrying /heard')
  const response = await scryUrbit('near-gateways', '/heard')
  console.log('Response on /heard:', response)
  return response
}

export async function scryInstalled() {
  console.log('Scrying /installed')
  const response = await scryUrbit('near-gateways', '/installed')
  console.log('Response on /installed:', response)
  return response
}

export async function scryPublished() {
  console.log('Scrying /published')
  const response = await scryUrbit('near-gateways', '/published')
  console.log('Response on /published:', response)
  return response
}
