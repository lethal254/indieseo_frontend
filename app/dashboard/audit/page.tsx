"use client"

import WebsiteSheet from "@/components/Sheets/WebsiteSheet"
import WebsitesTable, { IWebsite } from "@/components/Tables/WebsitesTable"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { LoaderPinwheel, Plus } from "lucide-react"
import React, { useState } from "react"

const fetchWebsites = async (): Promise<IWebsite[]> => {
  const response = await axios.get(
    "https://indieseo.onrender.com/website/all",
    {
      withCredentials: true,
    }
  ) // Adjust the URL based on your API route
  return response.data.result
}

const AuditPage = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["websites_get"],
    queryFn: fetchWebsites,
  })

  return (
    <div className='mx-auto  w-[80%]'>
      <div className='flex  p-4 justify-end'>
        <Button variant='outline' onClick={() => setOpen(!open)}>
          Add Website
          <Plus className='ml-1' />
        </Button>
      </div>
      <Card className=' min-h-40 '>
        {isLoading && (
          <div className='flex items-center justify-center h-full mt-6'>
            <p className='text-gray-500 text-sm'>
              <LoaderPinwheel className='animate-spin' />
            </p>
          </div>
        )}
        {data && data?.length < 0 && (
          <div className='flex items-center justify-center h-full mt-6'>
            <p className='text-gray-500 text-sm'>No websites added yet</p>
          </div>
        )}
        {!isLoading && data && data?.length > 0 && (
          <WebsitesTable tableData={data} />
        )}
      </Card>
      <WebsiteSheet open={open} setOpen={setOpen} />
    </div>
  )
}

export default AuditPage
