import { Outlet } from 'react-router-dom'
import Navigation from '@/components/molecules/Navigation'

const Layout = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="pb-16">
        <Outlet />
      </main>
      <Navigation />
    </div>
  )
}

export default Layout