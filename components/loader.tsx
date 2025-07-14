"use client"

import React, { useState, ReactNode, useEffect } from 'react'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

// Preloader Screen Component
const PreloaderScreen = () => {
  const [dots, setDots] = useState('')
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-white/15 rounded-full blur-lg animate-pulse delay-500"></div>
        <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-indigo-300/25 rounded-full blur-md animate-pulse delay-1500"></div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 flex flex-col items-center space-y-8">
        {/* Logo with Animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/20 rounded-2xl blur-xl animate-pulse"></div>
          <div className="relative rounded-2xl border border-white/20">
            <Image src="logo.png" alt='logo' height={60} width={60}/>
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Stocker</h1>
          <p className="text-blue-100 text-lg">
            Loading
            <span className="inline-block w-8 text-left">{dots}</span>
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="flex items-center space-x-4">
          <Loader2 className="h-8 w-8 text-white animate-spin" />
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-100"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 bg-white/20 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-white to-blue-200 rounded-full animate-pulse"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center text-white/80">
          <p className="text-sm">
            Setting up your experience...
          </p>
        </div>
      </div>
    </div>
  )
}

// Preloader Provider Component
export const PreloaderProvider = ({ 
  children,
  duration = 2000 // Default 2 seconds
}: { 
  children: ReactNode
  duration?: number
}) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, duration)

    return () => clearTimeout(timer)
  }, [duration])

  if (isLoading) {
    return <PreloaderScreen />
  }

  return <>{children}</>
}


export default PreloaderProvider