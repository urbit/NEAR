import { create } from 'zustand'

const useUiStore = create(set => ({
  showNew: false,
  setShowNew: showNew => set({ showNew }),
  subEvent: {},
  setSubEvent: subEvent => set({ subEvent }),
  loading: true,
  setLoading: loading => set({ loading }),
  showDelete: false,
  setShowDelete: showDelete => set({ showDelete }),
  installWindow: false,
  setInstallWindow: installWindow => set({ installWindow }),
}))

export default useUiStore
