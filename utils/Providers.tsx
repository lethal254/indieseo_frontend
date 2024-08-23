"use client"

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { useState, ReactNode } from "react"

interface ReactQueryProviderProps {
  children: ReactNode
}

const ReactQueryProvider = ({ children }: ReactQueryProviderProps) => {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default ReactQueryProvider
