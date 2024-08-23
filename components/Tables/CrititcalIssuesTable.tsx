"use client"
import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Edit, Ellipsis, Trash2Icon, View, ViewIcon } from "lucide-react"
import Link from "next/link"
import useAuditStore from "@/hooks/AuditStore"
import { Card } from "../ui/card"
import { ScrollArea } from "@radix-ui/react-scroll-area"

// Define the type for critical audits
interface CriticalAudit {
  id: string
  title: string
  description: string
  score: string
  displayValue: string
}

const CriticalAuditsTable = () => {
  const { result } = useAuditStore()
  const criticalAudits: CriticalAudit[] = result?.criticalAudits || []

  return (
    criticalAudits.length > 0 && (
      <Card className='w-full'>
        <div className='h-[500px] overflow-auto'>
          <Table>
            <ScrollArea>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {criticalAudits.map((audit) => (
                  <TableRow key={audit.id}>
                    <TableCell className='text-sm font-medium'>
                      {audit.title}
                    </TableCell>
                    <TableCell className='text-sm'>
                      {audit.description}
                    </TableCell>
                    <TableCell className='text-sm'>
                      <span
                        className={`inline-block px-2 py-1 rounded ${
                          audit.score === "N/A"
                            ? "bg-gray-200 text-gray-600"
                            : parseFloat(audit.score) < 0.5
                            ? "bg-red-200 text-red-600"
                            : "bg-green-200 text-green-600"
                        }`}>
                        {audit.displayValue}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Popover>
                        <PopoverTrigger>
                          <Ellipsis className='hover:text-gray-300 transition-all duration-150 ease-linear' />
                        </PopoverTrigger>

                        <PopoverContent className='text-sm'>
                          <h4 className='font-medium leading-none'>Actions</h4>

                          <div className='flex items-center justify-between mt-4'>
                            <Link href={`/dashboard/audit/${audit.id}`}>
                              <Button variant='outline' className='text-sm'>
                                <ViewIcon />
                              </Button>
                            </Link>

                            <Button variant='outline'>
                              <Trash2Icon />
                            </Button>
                            <Button variant='outline'>
                              <Edit />
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </ScrollArea>
          </Table>
        </div>
      </Card>
    )
  )
}

export default CriticalAuditsTable
