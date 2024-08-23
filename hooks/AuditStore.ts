import create from "zustand"

interface AuditState {
  jobId: number | null
  status: string
  result: any
  setJobId: (jobId: number | null) => void
  setStatus: (status: string) => void
  setResult: (result: any) => void
}

const useAuditStore = create<AuditState>((set) => ({
  jobId: null,
  status: "idle",
  result: null,
  setJobId: (jobId) => set({ jobId }),
  setStatus: (status) => set({ status }),
  setResult: (result) => set({ result }),
}))

export default useAuditStore
