import SideNav from "@/components/nav/side-nav"
import TopNav from "@/components/nav/top-nav"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex min-h-screen w-full flex-col bg-muted/40'>
      <SideNav />
      <TopNav />
      {children}
    </div>
  )
}

export default DashboardLayout
