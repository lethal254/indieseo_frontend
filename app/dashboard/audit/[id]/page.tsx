"use server"

import { IWebsite } from "@/components/Tables/WebsitesTable"
import { Card } from "@/components/ui/card"
import axios from "axios"
import React from "react"
import { cookies } from "next/headers"
import AuditButton from "@/components/Buttons/AuditButton"
import MetricCard from "@/components/cards/MetricCard"
import ScoresCard from "@/components/cards/ScoresCard"
import CriticalAuditsTable from "@/components/Tables/CrititcalIssuesTable"

const fetchWebsites = async (id: number): Promise<IWebsite> => {
  const response = await axios.get(
    `https://indieseo.onrender.com/website/${id}`,
    {
      withCredentials: true,
      headers: {
        Cookie: `connect.sid=${cookies().get("connect.sid")?.value}`,
      },
    }
  ) // Adjust the URL based on your API route
  return response.data.result
}

const RunAudit = async ({ params: { id } }: { params: { id: number } }) => {
  const data = await fetchWebsites(id)

  return (
    <div className='w-[80%] mx-auto  p-4'>
      <Card className='p-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='font-semibold uppercase'>{data.domain}</h3>
            <p className='text-sm text-gray-400 mt-4'>{data.url}</p>
          </div>
          <div>
            <AuditButton url={data.url} websiteId={data.id} />
          </div>
        </div>
      </Card>
      {/* Metrics */}
      <div className='flex gap-4 mt-4 mx-auto flex-wrap'>
        <MetricCard />
        <CriticalAuditsTable />
      </div>
    </div>
  )
}

export default RunAudit
