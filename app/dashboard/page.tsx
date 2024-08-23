"use client"

import { Combobox } from "@/components/ComboBox/ChooseWebsite"
import useWebsiteStore from "@/hooks/WebsiteStore"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { LoaderPinwheel } from "lucide-react"
import { useEffect, useState } from "react"
import MetricCard from "@/components/cards/Scorecard" // Assuming you saved the dynamic card as MetricCard
import { Gauge, TrendingUp, Accessibility, ShieldCheck } from "lucide-react" // Import appropriate icons
import { MetricsChart } from "@/components/Charts/MetricsCharts"
import { Card, CardContent } from "@/components/ui/card"

async function fetchAuditResults(websiteid: number) {
  const { data } = await axios.get(
    `https://indieseo.onrender.com/audit_results/${websiteid}`,
    { withCredentials: true }
  )
  return data
}

const Dashboard = () => {
  const [websiteid, setWebsiteId] = useState<number | null>(null)
  const { id } = useWebsiteStore() // Use the Zustand store

  const { data, isLoading, error } = useQuery({
    queryKey: ["audit_results", websiteid],
    queryFn: () =>
      websiteid ? fetchAuditResults(websiteid) : Promise.resolve({}), // Handle null case
    enabled: !!websiteid, // Only fetch when websiteid is not null or undefined
  })

  useEffect(() => {
    if (id) {
      setWebsiteId(id)
    }
  }, [id])

  // Check if data is available and in the correct format
  const results = data?.results
  const scores = results?.map((result: any) => ({
    date: new Date(result.fetchedAt).toISOString().split("T")[0],
    performance: result.scores.performance,
    seo: result.scores.seo,
    accessibility: result.scores.accessibility,
    bestPractices: result.scores.bestPractices,
  }))

  return (
    <div className='w-[80%] mx-auto p-4'>
      <Combobox />
      {/* Conditionally render the audit results or loading/error states */}
      {isLoading && (
        <div className='flex items-center justify-center min-h-40'>
          <LoaderPinwheel className='animate-spin' />
        </div>
      )}
      {error && <p>Error fetching data: {error.message}</p>}
      {results && scores?.length ? (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
            <MetricCard
              title='Performance'
              value={`${(scores[scores.length - 1].performance * 100).toFixed(
                1
              )}%`}
              description='Performance score of the website'
              icon={Gauge}
            />
            <MetricCard
              title='SEO'
              value={`${(scores[scores.length - 1].seo * 100).toFixed(1)}%`}
              description='SEO score of the website'
              icon={TrendingUp}
              iconClassName='text-green-600'
            />
            <MetricCard
              title='Accessibility'
              value={`${(scores[scores.length - 1].accessibility * 100).toFixed(
                1
              )}%`}
              description='Accessibility score of the website'
              icon={Accessibility}
              iconClassName='text-blue-600'
            />
            <MetricCard
              title='Best Practices'
              value={`${(scores[scores.length - 1].bestPractices * 100).toFixed(
                1
              )}%`}
              description='Best practices score of the website'
              icon={ShieldCheck}
              iconClassName='text-yellow-600'
            />
            {/* You can add more MetricCards for other metrics if needed */}
          </div>
          <div className='mt-4'>
            <MetricsChart chartData={scores} />
          </div>
        </>
      ) : (
        !isLoading && (
          <Card className='min-h-56 mt-4 flex items-center justify-center'>
            <CardContent>
              <p>Select/Create a website to get started</p>
            </CardContent>
          </Card>
        )
      )}
    </div>
  )
}

export default Dashboard
