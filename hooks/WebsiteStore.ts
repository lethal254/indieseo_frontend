import { create } from "zustand"

interface WebsiteState {
  id: number | null
  setId: (id: number | null) => void
}

const useWebsiteStore = create<WebsiteState>((set) => ({
  id: null,
  setId: (id) => set({ id }),
}))

export default useWebsiteStore
