"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  iconClassName?: string
  colorClass?: string // New prop for color coding
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  iconClassName,
  colorClass,
}) => {
  return (
    <Card className={`p-4 `}>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium'>{title}</CardTitle>
        <Icon className={`h-4 w-4 text-muted-foreground ${iconClassName}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colorClass}`}>{value}</div>
        {description && (
          <p className='text-xs text-muted-foreground'>{description}</p>
        )}
      </CardContent>
    </Card>
  )
}

export default MetricCard
