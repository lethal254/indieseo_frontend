"use client"
import Link from "next/link"
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Users2,
  User2Icon,
  Edit,
  TargetIcon,
  Edit2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import useStore from "@/hooks/userStore"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ModeToggle } from "../toggles/theme-toggle"
const TopNav = () => {
  const { user, loading, error, fetchUser, logoutUser, setUser } = useStore()
  const router = useRouter()

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const logout = async () => {
    logoutUser()
    router.push("/auth/login")
  }

  return (
    <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
      <header className='sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6'>
        <Sheet>
          <SheetTrigger asChild>
            <Button size='icon' variant='outline' className='sm:hidden'>
              <PanelLeft className='h-5 w-5' />
              <span className='sr-only'>Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='sm:max-w-xs'>
            <nav className='grid gap-6 text-lg font-medium'>
              <Link
                href='#'
                className='group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base'>
                <Package2 className='h-5 w-5 transition-all group-hover:scale-110' />
                <span className='sr-only'>Acme Inc</span>
              </Link>
              <Link
                href='/dashboard'
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
                <Home className='h-5 w-5' />
                Dashboard
              </Link>
              <Link
                href='/dashboard/edit'
                className='flex items-center gap-4 px-2.5 text-foreground'>
                <Edit className='h-5 w-5' />
                Edit
              </Link>
              <Link
                href='#'
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
                <Edit2 className='h-5 w-5' />
                Template Edit
              </Link>

              <Link
                href='#'
                className='flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground'>
                <LineChart className='h-5 w-5' />
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <div className='relative ml-auto flex-1 md:grow-0'></div>
        <div>
          <ModeToggle />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='overflow-hidden rounded-full'>
              <User2Icon
                width={36}
                height={36}
                className='overflow-hidden rounded-full text-gray-700 p-1'
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>{!!user && user?.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3'></main>
    </div>
  )
}

export default TopNav
