import React from 'react'
import Header from '@/components/Header'
import MobileNavigation from '@/components/MobileNavigation'
import Sidebar from '@/components/Sidebar'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { Toaster } from '@/components/ui/toaster'

// Added this when deploying
export const dynamic = "force-dynamic";

const Layout = async ({children}: {children: React.ReactNode} ) => {

    const currentUser = await getCurrentUser();
    if(!currentUser) return redirect("/sign-in");

    currentUser.avatar = '/assets/images/avatar.png';

  return (
    <main className='flex h-screen'>
        <Sidebar {...currentUser} />

        <section className='flex h-full flex-1 flex-col'>

            <MobileNavigation {...currentUser} /> 
            <Header userId={currentUser.$id} accountId={currentUser.accountId} />
            <div className="main-content">{children}</div>

            {/* Header */}

        </section>

        <Toaster />
      
    </main>
  )
}

export default Layout