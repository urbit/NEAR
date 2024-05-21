import { create } from 'zustand'

const useGatewaysStore = create(set => ({
  heard: [],
  setHeard: heard => set({ heard }),
  published: [],
  setPublished: published => set({ published }),
  addToPublished: gateway => set(state => ({
    published: [gateway, ...state.published]
  })),
  installed: [],
  setInstalled: installed => set({ installed }),
  addToInstalled: gateway => set(state => ({
    installed: [...state.installed, gateway]
  })),
  uploading: [],
  addToUploading: gateway => set(state => ({
    uploading: [gateway, ...state.uploading]
  })),
  removeFromUploading: gateway => set(state => ({
    uploading: state.uploading.filter(uploadingGateway => {
      return !(
        uploadingGateway.name === gateway.name &&
        uploadingGateway.about === gateway.about &&
        uploadingGateway.thumbnail === gateway.thumbnail
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
