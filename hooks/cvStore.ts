import axios from "axios"
import { create } from "zustand"
import { devtools } from "zustand/middleware"

interface ICV {
  personalDetails: {
    wantedJobTitle: string
    firstName: string
    lastName: string
    email: string
    phone: string
    country: string
    city: string
  }
  professionalSummary: string
}

interface IUpdates {
  personalDetails?: Partial<ICV["personalDetails"]>
  professionalSummary?: string
}

interface StoreState {
  cv: ICV | null
  loading: boolean
  error: string | null
  editcv: (updates: IUpdates) => void
}

const useUserStore = create<StoreState>()(
  devtools((set) => ({
    cv: {
      personalDetails: {
        wantedJobTitle: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        country: "",
        city: "",
      },
      professionalSummary: "",
    },
    loading: false,
    error: null,

    editcv: (updates) => {
      set((state) => {
        // Ensure that the current state is valid before updating
        if (!state.cv) return state

        return {
          cv: {
            ...state.cv,
            personalDetails: {
              ...state.cv.personalDetails,
              ...updates,
            },
            professionalSummary:
              updates.professionalSummary ?? state.cv.professionalSummary, // Merge professionalSummary update
          },
        }
      })
    },
  }))
)

export default useUserStore
