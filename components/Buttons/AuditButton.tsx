"use client"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import axios from "axios"
import { useQuery, useMutation } from "@tanstack/react-query"
import { CheckCircle, LoaderPinwheel } from "lucide-react"
import useAuditStore from "@/hooks/AuditStore"
import { APIurl } from "@/apiconfig"

interface AuditStatus {
  status: string
  result: any // Adjust this type based on the actual structure of your result
}

// Function to start the audit and fetch the job ID
const fetchAuditJob = async (url: string) => {
  const response = await axios.get(
    `${APIurl}/audit?url=${encodeURIComponent(url)}`,
    {
      withCredentials: true,
    }
  )
  return response.data.result.jobid
}

// Function to check the status of the audit job
const fetchAuditStatus = async (
  jobId: number,
  websiteId: number
): Promise<AuditStatus> => {
  const response = await axios.post(
    `${APIurl}/audit/status/${jobId}`,
    { websiteId },
    {
      withCredentials: true,
    }
  )
  return response.data
}

// Define the type for audit status data
interface AuditStatus {
  state: string
  result: any // Adjust this based on the actual result structure
}

const AuditButton = ({
  url,
  websiteId,
}: {
  url: string
  websiteId: number
}) => {
  const [jobId, setJobId] = useState<number | null>(null)
  const { setResult, result } = useAuditStore()

  const useAuditStatus = (jobId: number | null) => {
    return useQuery<AuditStatus, Error>({
      queryKey: ["auditStatus", jobId],
      queryFn: () => fetchAuditStatus(jobId!, websiteId),
      enabled: jobId !== null, // Only fetch if jobId is available
      refetchInterval: (data) => {
        const state = (data as any)?.state?.data?.state // Safely access the state property
        return state === "completed" ? false : 5000
      },
    })
  }

  // Mutation to start the audit
  const { mutate: startAudit, isPending: isStartingAudit } = useMutation({
    mutationFn: () => fetchAuditJob(url),
    onSuccess: (jobId) => {
      setJobId(jobId) // Save jobId to state
    },
    onError: (error) => {
      console.error("Error starting audit:", error)
    },
  })

  // Query to check the status of the audit
  const { data, isFetching, isError } = useAuditStatus(jobId)

  useEffect(() => {
    if (data?.state === "completed") {
      setResult(data.result)
    }
  }, [data?.state, setResult, data])

  const isPolling = isFetching && jobId !== null
  const isLoading = isStartingAudit || isPolling

  return data?.state === "active" ? (
    <div className='flex flex-col items-center'>
      <LoaderPinwheel className='text-2xl text-orange-400 animate-spin' />
      <span className='text-sm'>Running Audit</span>
    </div>
  ) : data?.state === "completed" ? (
    <div className='flex flex-col items-center'>
      <CheckCircle className='text-2xl text-green-400 ' />
      <span className='text-sm'>Audit Complete</span>
    </div>
  ) : (
    <div>
      <Button
        variant='default'
        onClick={() => startAudit()} // Trigger audit
        disabled={isLoading}>
        Audit
      </Button>
      {isError && <p>Error: {(data as any).message}</p>}
    </div>
  )
}

export default AuditButton
