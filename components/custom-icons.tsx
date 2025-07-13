import type React from "react"
export function LineGraph({ color = "#4285F4" }: { color?: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-neutral-800 rounded-lg p-2">
      <svg
        className="w-full h-full"
        viewBox="0 0 100 50"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 40 C 10 20, 20 30, 30 10 C 40 0, 50 20, 60 10 C 70 0, 80 30, 90 20 C 100 10"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export function FeatureIconWrapper({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-center w-24 h-24 rounded-full bg-neutral-800">{children}</div>
}

export function FingerprintIconWithLine() {
  return (
    <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-neutral-800">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" stroke="#4A4A4A" strokeWidth="2" />
      </svg>
      <div className="relative z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-fingerprint text-gray-400"
        >
          <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" />
          <path d="M12 14.5V17.5" />
          <path d="M12 10.5V12.5" />
          <path d="M12 6.5V8.5" />
          <path d="M15.5 11.5L17.5 13.5" />
          <path d="M8.5 11.5L6.5 13.5" />
          <path d="M15.5 15.5L17.5 17.5" />
          <path d="M8.5 15.5L6.5 17.5" />
          <path d="M15.5 7.5L17.5 9.5" />
          <path d="M8.5 7.5L6.5 9.5" />
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-blue-500 rounded-full" />
      </div>
    </div>
  )
}
