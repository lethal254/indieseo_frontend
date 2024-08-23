"use client"

import { useEffect, useState } from "react"
import MetricCard from "@/components/cards/Scorecard" // Import the MetricCard component
import { Gauge, TrendingUp, Accessibility, ShieldCheck } from "lucide-react" // Import the icons
import useAuditStore from "@/hooks/AuditStore"

export default function MetricsOverview() {
  const { result } = useAuditStore()
  const [metrics, setMetrics] = useState({
    cumulativeLayoutShift: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
  })

  // Utility function to parse numerical values from strings
  const parseMetric = (metric: string | undefined) => {
    if (!metric) return 0
    const value = parseFloat(metric.replace(/[^\d.]/g, "")) // Remove non-numeric characters except '.'
    return isNaN(value) ? 0 : value
  }

  // Function to determine color class based on value
  const getColorClass = (value: number, type: string) => {
    if (type === "metric") {
      return value > 0.9
        ? "text-green-500"
        : value > 0.6
        ? "text-yellow-500"
        : "text-red-500"
    } else if (type === "score") {
      return value > 80
        ? "text-green-500"
        : value > 50
        ? "text-yellow-500"
        : "text-red-500"
    }
    return ""
  }

  // Update the metrics state whenever the result in the store changes
  useEffect(() => {
    if (result) {
      const { metrics: metricResults, scores } = result

      setMetrics({
        cumulativeLayoutShift: metricResults
          ? parseMetric(metricResults.cumulativeLayoutShift)
          : 0,
        firstContentfulPaint: metricResults
          ? parseMetric(metricResults.firstContentfulPaint)
          : 0,
        largestContentfulPaint: metricResults
          ? parseMetric(metricResults.largestContentfulPaint)
          : 0,
        performance: scores ? scores.performance || 0 : 0,
        accessibility: scores ? scores.accessibility || 0 : 0,
        bestPractices: scores ? scores.bestPractices || 0 : 0,
        seo: scores ? scores.seo || 0 : 0,
      })
    }
  }, [result])

  return (
    <div className='flex gap-4 justify-between w-full'>
      {/* Metrics Cards */}
      <div className='flex-1 grid grid-cols-2 gap-4'>
        <MetricCard
          title='Performance Score'
          value={`${(metrics.performance * 100).toFixed(1)}%`}
          description='Performance score of the website'
          icon={Gauge}
          colorClass={getColorClass(metrics.performance * 100, "score")} // Pass color class based on performance score
        />
        <MetricCard
          title='Accessibility Score'
          value={`${(metrics.accessibility * 100).toFixed(1)}%`}
          description='Accessibility score of the website'
          icon={Accessibility}
          colorClass={getColorClass(metrics.accessibility * 100, "score")} // Pass color class based on accessibility score
        />
        <MetricCard
          title='Best Practices Score'
          value={`${(metrics.bestPractices * 100).toFixed(1)}%`}
          description='Best practices score of the website'
          icon={ShieldCheck}
          colorClass={getColorClass(metrics.bestPractices * 100, "score")} // Pass color class based on best practices score
        />
        <MetricCard
          title='SEO Score'
          value={`${(metrics.seo * 100).toFixed(1)}%`}
          description='SEO score of the website'
          icon={TrendingUp}
          colorClass={getColorClass(metrics.seo * 100, "score")} // Pass color class based on SEO score
        />
      </div>
      <div className='flex-1 grid grid-cols-2 gap-4'>
        <MetricCard
          title='Cumulative Layout Shift'
          value={`${metrics.cumulativeLayoutShift.toFixed(2)}`}
          description='Cumulative layout shift score of the website'
          icon={Gauge}
          colorClass={getColorClass(metrics.cumulativeLayoutShift, "metric")} // Pass color class based on layout shift
        />
        <MetricCard
          title='First Contentful Paint'
          value={`${metrics.firstContentfulPaint.toFixed(2)}`}
          description='First contentful paint score of the website'
          icon={TrendingUp}
          colorClass={getColorClass(metrics.firstContentfulPaint, "metric")} // Pass color class based on paint score
        />
        <MetricCard
          title='Largest Contentful Paint'
          value={`${metrics.largestContentfulPaint.toFixed(2)}`}
          description='Largest contentful paint score of the website'
          icon={Accessibility}
          colorClass={getColorClass(metrics.largestContentfulPaint, "metric")} // Pass color class based on paint score
        />
      </div>
    </div>
  )
}
