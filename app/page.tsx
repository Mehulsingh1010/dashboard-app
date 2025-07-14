
import Landing from '@/components/dashboard/landing'
import PreloaderProvider from '@/components/loader'
import React from 'react'

const page = () => {
  return (
    <div>
      <PreloaderProvider>

      <Landing/>

      </PreloaderProvider>
   
    
      
    </div>
  )
}

export default page
