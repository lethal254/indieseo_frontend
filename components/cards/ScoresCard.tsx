// ScoresCard.tsx
"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts"
import useAuditStore from "@/hooks/AuditStore"

const ScoresCard = () => {
  const { result } = useAuditStore()
  const [scores, setScores] = useState({
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
  })

  // Update the scores state whenever the result in the store changes
  useEffect(() => {
    if (result && result.scores) {
      setScores({
        performance: result.scores.performance || 0,
        accessibility: result.scores.accessibility || 0,
        bestPractices: result.scores.bestPractices || 0,
        seo: result.scores.seo || 0,
      })
    }
  }, [result])

  console.log(result)

  return (
    <Card className='max-w-md '>
      <CardContent className='flex gap-4 p-4'>
        <div className='grid items-center gap-2'>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>
              Performance Score
            </div>
            <div className='flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none'>
              {scores.performance * 100}
              <span className='text-sm font-normal text-muted-foreground'>
                %
              </span>
            </div>
          </div>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>
              Accessibility Score
            </div>
            <div className='flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none'>
              {scores.accessibility * 100}
              <span className='text-sm font-normal text-muted-foreground'>
                %
              </span>
            </div>
          </div>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>
              Best Practices Score
            </div>
            <div className='flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none'>
              {scores.bestPractices * 100}
              <span className='text-sm font-normal text-muted-foreground'>
                %
              </span>
            </div>
          </div>
          <div className='grid flex-1 auto-rows-min gap-0.5'>
            <div className='text-sm text-muted-foreground'>SEO Score</div>
            <div className='flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none'>
              {scores.seo * 100}
              <span className='text-sm font-normal text-muted-foreground'>
                %
              </span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            performance: {
              label: "Performance",
              color: "hsl(var(--chart-1))",
            },
            accessibility: {
              label: "Accessibility",
              color: "hsl(var(--chart-2))",
            },
            bestPractices: {
              label: "Best Practices",
              color: "hsl(var(--chart-3))",
            },
            seo: {
              label: "SEO",
              color: "hsl(var(--chart-4))",
            },
          }}
          className='mx-auto aspect-square w-full max-w-[80%]'>
          <RadialBarChart
            margin={{
              left: -10,
              right: -10,
              top: -10,
              bottom: -10,
            }}
            data={[
              {
                activity: "performance",
                value: scores.performance * 100,
                fill: "var(--color-performance)",
              },
              {
                activity: "accessibility",
                value: scores.accessibility * 100,
                fill: "var(--color-accessibility)",
              },
              {
                activity: "bestPractices",
                value: scores.bestPractices * 100,
                fill: "var(--color-bestPractices)",
              },
              {
                activity: "seo",
                value: scores.seo * 100,
                fill: "var(--color-seo)",
              },
            ]}
            innerRadius='20%'
            barSize={24}
            startAngle={90}
            endAngle={450}>
            <PolarAngleAxis
              type='number'
              domain={[0, 100]}
              dataKey='value'
              tick={false}
            />
            <RadialBar dataKey='value' background cornerRadius={5} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default ScoresCard
