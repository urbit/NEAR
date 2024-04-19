import { create } from 'zustand'

const useGatewaysStore = create(set => ({
  heard: [],
  setHeard: heard => set({ heard }),
  published: [],
  setPublished: published => set({ published }),
  installed: [],
  setInstalled: installed => set({ installed }),
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
