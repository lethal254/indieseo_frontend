"use client"

import * as React from "react"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface MetricsChartProps {
  chartData: Array<{
    date: string
    performance: number
    seo: number
    accessibility: number
    bestPractices: number
  }>
}

const chartConfig = {
  performance: {
    label: "Performance",
    color: "hsl(var(--chart-1))",
  },
  seo: {
    label: "SEO",
    color: "hsl(var(--chart-2))",
  },
  accessibility: {
    label: "Accessibility",
    color: "hsl(var(--chart-3))",
  },
  bestPractices: {
    label: "Best Practices",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

export function MetricsChart({ chartData }: MetricsChartProps) {
  console.log(chartData)
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const now = new Date()
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    now.setDate(now.getDate() - daysToSubtract)
    return date >= now
  })

  return (
    <Card>
      <CardHeader className='flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row'>
        <div className='grid flex-1 gap-1 text-center sm:text-left'>
          <CardTitle className='text-base'>Metrics Line Chart</CardTitle>
          <CardDescription className='text-xs'>
            Showing various performance metrics over time
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className='w-[160px] rounded-lg sm:ml-auto'
            aria-label='Select a value'>
            <SelectValue placeholder='Last 3 months' />
          </SelectTrigger>
          <SelectContent className='rounded-xl'>
            <SelectItem value='90d' className='rounded-lg'>
              Last 3 months
            </SelectItem>
            <SelectItem value='30d' className='rounded-lg'>
              Last 30 days
            </SelectItem>
            <SelectItem value='7d' className='rounded-lg'>
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'>
          <LineChart data={filteredData}>
            <defs>
              <linearGradient id='fillPerformance' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-performance)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-performance)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillSEO' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-seo)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-seo)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id='fillAccessibility'
                x1='0'
                y1='0'
                x2='0'
                y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-accessibility)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-accessibility)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient
                id='fillBestPractices'
                x1='0'
                y1='0'
                x2='0'
                y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-bestPractices)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-bestPractices)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <Tooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator='dot'
                />
              }
            />
            <Line
              dataKey='performance'
              type='monotone'
              stroke='var(--color-performance)'
              fill='url(#fillPerformance)'
            />
            <Line
              dataKey='seo'
              type='monotone'
              stroke='var(--color-seo)'
              fill='url(#fillSEO)'
            />
            <Line
              dataKey='accessibility'
              type='monotone'
              stroke='var(--color-accessibility)'
              fill='url(#fillAccessibility)'
            />
            <Line
              dataKey='bestPractices'
              type='monotone'
              stroke='var(--color-bestPractices)'
              fill='url(#fillBestPractices)'
            />
            <ChartLegend content={<ChartLegendContent />} />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
