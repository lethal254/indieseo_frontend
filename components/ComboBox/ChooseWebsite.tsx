"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import useWebsiteStore from "@/hooks/WebsiteStore" // Import the Zustand store
import { IWebsite } from "../Tables/WebsitesTable"
import Link from "next/link"

const fetchWebsites = async (): Promise<IWebsite[]> => {
  const response = await axios.get(
    "https://indieseo.onrender.com/website/all",
    {
      withCredentials: true,
    }
  )
  return response.data.result
}

export function Combobox() {
  const [open, setOpen] = React.useState(false)
  const { id, setId } = useWebsiteStore() // Use the Zustand store

  const { data, isLoading, isError } = useQuery({
    queryKey: ["websites_get"],
    queryFn: fetchWebsites,
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[200px] justify-between'>
          {id
            ? data?.find((item) => item.id === id)?.domain
            : "Select website..."}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput placeholder='Search website...' />
          <CommandList>
            <CommandEmpty>No website found.</CommandEmpty>
            <CommandEmpty className='flex items-center justify-center'>
              <Link href='/dashboard/audit' className='flex items-center'>
                <Button variant='outline'>
                  <Plus />
                  Create Website
                </Button>
              </Link>
            </CommandEmpty>
            <CommandGroup>
              {data?.map((item) => (
                <CommandItem
                  key={item.id}
                  value={item.domain}
                  onSelect={() => {
                    setId(item.id === id ? null : item.id) // Update the Zustand store
                    setOpen(false)
                  }}>
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      id === item.id ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {item.domain}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
