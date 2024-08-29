import { APIurl } from "@/apiconfig"
import axios from "axios"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface Iuser {
  name: string
  email: string
  googleId: string
  id: string
  updatedAt: string
  createdAt: string
  customerid?: string
}

interface StoreState {
  user: Iuser | null
  loading: boolean
  error: string | null
  fetchUser: () => Promise<void>
  setUser: (user: Iuser) => void
  logoutUser: () => void
}

const useUserStore = create<StoreState>()(
  devtools((set) => ({
    user: null,
    loading: false,
    error: null,

    fetchUser: async () => {
      set({ loading: true, error: null })
      try {
        const { data } = await axios.get(`${APIurl}/user`, {
          withCredentials: true,
        })
        set({ user: data.user, loading: false })
      } catch (error) {
        set({ error: (error as Error).message, loading: false })
      }
    },

    setUser: (user: Iuser) => set({ user }),

    logoutUser: async () => {
      set({ loading: true, error: null })
      try {
        const { data } = await axios.get(`${APIurl}/auth/logout`, {
          withCredentials: true,
        })
        set({ user: null, loading: false })
      } catch (error) {
        set({ error: (error as Error).message, loading: false })
      }
    },
  }))
)

export default useUserStore
