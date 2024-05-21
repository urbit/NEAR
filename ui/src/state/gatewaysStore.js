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
