import { create } from 'zustand'

const useGatewaysStore = create(set => ({
  heard: [],
  setHeard: heard => set({ heard }),
  published: [],
  setPublished: published => set({ published }),
  appendToPublished: gateway => set(state => ({ published: [...state.published, gateway] })),
  installed: [],
  setInstalled: installed => set({ installed }),
  appendToInstalled: gateway => set(state => ({
    installed: [...state.installed, gateway].sort((a, b) => {
      return new Date(b.date) - new Date(a.date)
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
