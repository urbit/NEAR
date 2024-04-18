import Urbit from '@urbit/http-api';

function scryUrbit(app, path) {
  const api = new Urbit('');
  return api.scry({
    app: app,
    path: path
  });
}

export async function scryHeard() {
  const response = await scryUrbit('near-gateways', '/heard')
  return response
}

export async function scryInstalled() {
  const response = await scryUrbit('near-gateways', '/installed')
  return response
}

export async function scryPublished() {
  const response = await scryUrbit('near-gateways', '/published')
  return response
}
