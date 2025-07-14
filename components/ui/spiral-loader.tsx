"use client"

interface SpiralLoaderProps {
  show: boolean
}

export const SpiralLoader = ({ show }: SpiralLoaderProps) => {
  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
      <div className="relative">
        {/* Outer spiral */}
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        {/* Inner spiral */}
        <div
          className="absolute top-2 left-2 w-12 h-12 border-4 border-blue-100 border-t-blue-500 rounded-full animate-spin"
          style={{
            animationDirection: "reverse",
            animationDuration: "0.8s",
          }}
        ></div>
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
      </div>
    </div>
  )
}
