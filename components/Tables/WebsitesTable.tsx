import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
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

export interface IWebsite {
  id: number
  domain: string
  url: string
  userid: number
}

const WebsitesTable = ({ tableData }: { tableData: IWebsite[] }) => {
  console.log(tableData)
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Domain</TableHead>
          <TableHead className='w-[50px]'>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableData.map((item) => (
          <TableRow key={item.id} className='cursor-pointer'>
            <TableCell className=' flex flex-col'>
              <div className='font-medium uppercase'>{item.domain}</div>
              <div className='font-normal mt-4 text-gray-500 text-xs'>
                {item.url}
              </div>
            </TableCell>
            <TableCell>
              <Popover>
                <PopoverTrigger>
                  <Ellipsis className='hover:text-gray-300 transition-all duration-150 ease-linear' />
                </PopoverTrigger>

                <PopoverContent className='text-sm'>
                  <h4 className='font-medium leading-none'>Actions</h4>

                  <div className=' flex items-center justify-between mt-4'>
                    <Link href={`/dashboard/audit/${item.id}`}>
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
    </Table>
  )
}

export default WebsitesTable
