"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast" // Added missing import
import { Mail, Loader2, Shield, Package, BarChart, Lock, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is already authenticated
    const token = localStorage.getItem("authToken")
    if (token) {
      router.push("/dashboard")
    }
  }, [router])

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("verificationEmail", email)
        toast({
          title: "OTP Sent!",
          description: "Please check your email for the verification code",
        })
        router.push("/verify-otp")
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to send OTP",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Advanced encryption and multi-factor authentication protect your data",
    },
    {
      icon: Package,
      title: "Smart Inventory",
      description: "Real-time tracking and automated alerts for seamless management",
    },
    {
      icon: BarChart,
      title: "Powerful Analytics",
      description: "Data-driven insights to optimize your business operations",
    },
  ]

  return (
    <div className="flex bg-gradient-to-br from-blue-600 to-indigo-700 flex-col lg:flex-row min-h-screen">
      {/* Left Section - Desktop Only (Hero-like background) */}
      <div className="hidden lg:flex lg:flex-[0.6] relative overflow-hidden p-12">
        {/* Go back home button for desktop */}
        <div className="absolute top-8 left-12 z-20">
          <Link href="/" passHref>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back home
            </Button>
          </Link>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center">
          {/* Logo/Brand */}
          <div className="flex items-center mb-8">
            <Image src="/logo.png" alt="Stocker Logo" width={34} height={34} className="" />
            <span className="ml-4 text-3xl font-bold text-white">Stocker</span>
          </div>
          {/* Main Heading */}
          <div className="mb-6">
            <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">
              {"Secure Login, "}
              <span className="text-blue-300">{"Smart Management"}</span>
            </h1>
            <p className="text-lg text-white opacity-90 leading-relaxed max-w-lg">
              {
                "Experience enterprise-grade security with intuitive product management. Your inventory, protected and optimized."
              }
            </p>
          </div>
          {/* Features */}
          <div className="space-y-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="p-2 bg-white/20 rounded-md flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                  <p className="text-white text-sm opacity-80">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Security Badge */}
          <div className="mt-8 flex items-center space-x-3 text-white opacity-80">
            <Lock className="h-5 w-5" />
            <span className="text-sm">{"ISO 27001 Certified • SOC 2 Type II Compliant"}</span>
          </div>
        </div>
      </div>
      {/* Right Section - Login Form & Mobile Content */}
      <div className="flex-1 lg:flex-[0.4] flex flex-col items-center justify-center p-6 sm:p-8">
        {/* Go back home button for mobile */}
        <div className="lg:hidden flex justify-start w-full max-w-md mb-4">
          <Link href="/" passHref>
            <Button variant="ghost" className="text-white hover:bg-white/10">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back home
            </Button>
          </Link>
        </div>
        {/* Mobile Logo/Brand - Visible on small screens */}
        <div className="lg:hidden flex items-center justify-center mb-8 mt-8">
          <Image src="/logo.png" alt="Stocker Logo" width={34} height={34} className="" />
          <span className="ml-2 text-xl font-bold text-white">Stocker</span>
        </div>
        <div className="w-full max-w-md">
          <Card className="border border-gray-200 shadow-lg bg-white rounded-xl p-6 sm:p-8">
            <CardHeader className="space-y-1 text-center pb-8">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-100 rounded-full">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600 text-base">
                {"Enter your email to receive a secure verification code"}
              </CardDescription>
            </CardHeader>
            

<CardContent className="space-y-6">
  <form onSubmit={handleSendOTP} className="space-y-6">
    <div className="space-y-2">
      <Label htmlFor="email" className="text-gray-700 font-medium">
        Email Address
      </Label>
      <Input
        id="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && email) {
            handleSendOTP(e)
          }
        }}
      />
    </div>
    <Button
      type="submit"
      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-all duration-200"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Sending Code...
        </>
      ) : (
        <>
          Send Verification Code
          <ArrowRight className="ml-2 h-5 w-5" />
        </>
      )}
    </Button>
  </form>
  
  {/* Rest of your existing code (Security Notice, Help Text, etc.) */}
  <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
    <div>
      <p className="text-sm text-green-800 font-medium">Secure Authentication</p>
      <p className="text-xs text-green-700">
        {"Your login is protected with end-to-end encryption and time-based OTP verification."}
      </p>
    </div>
  </div>
  
  <div className="text-center">
    <p className="text-sm text-gray-500">
      {"Having trouble? Check your spam folder or "}
      <button className="text-blue-600 hover:text-blue-700 font-medium">contact support</button>
    </p>
  </div>
</CardContent>
          </Card>
        </div>
        {/* Mobile Features - Visible on small screens, below the form */}
        <div className="lg:hidden w-full max-w-md mt-8 space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="p-2 bg-white/20 rounded-md flex-shrink-0">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">{feature.title}</h3>
                <p className="text-white text-sm opacity-80">{feature.description}</p>
              </div>
            </div>
          ))}
          {/* Mobile Security Badge */}
          <div className="flex items-center justify-center space-x-3 text-white opacity-80 mt-6">
            <Lock className="h-5 w-5" />
            <span className="text-sm">{"ISO 27001 Certified • SOC 2 Type II Compliant"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
