import { create } from 'zustand'

const useGatewaysStore = create(set => ({
  heard: [],
  setHeard: heard => set({ heard }),
  published: [],
  setPublished: published => set({ published }),
  addToPublished: gateway => set(state => ({
    published: state.published.length === 0
    ? [gateway]
    : [gateway, ...state.published]
  })),
  installed: [],
  setInstalled: installed => set({ installed }),
  addToInstalled: gateway => set(state => ({
    installed: state.installed.length === 0
    ? [gateway]
    : [...state.installed, gateway]
  })),
  uploading: [],
  addToUploading: gateway => set(state => ({
    uploading: state.uploading.length === 0
    ? [gateway]
    : [gateway, ...state.uploading]
  })),
  removeFromUploading: gateway => set(state => ({
    uploading: state.uploading.filter(uploadingGateway => {
      return !(
        uploadingGateway.name === gateway.name &&
        uploadingGateway.about === gateway.about
      )
    })
  })),
  delGateway: {},
  setDelGateway: delGateway => set({ delGateway }),
  newGateway: {},
  setNewGateway: newGateway => set({ newGateway }),
  instGateway: {},
  setInstGateway: instGateway => set({ instGateway }),
  newGateways: [],
  setNewGateways: newGateways => set({ newGateways }),
  installedGateways: [],
  setInstalledGateways: installedGateways => set({ installedGateways })
}))

export default useGatewaysStore
