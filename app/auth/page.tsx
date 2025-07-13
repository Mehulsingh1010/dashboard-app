"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/hooks/use-toast"
import { Mail, Loader2, Shield, Package, TrendingUp, Lock, CheckCircle, ArrowRight } from "lucide-react"

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
      description: "Advanced encryption and multi-factor authentication protect your data"
    },
    {
      icon: Package,
      title: "Smart Inventory",
      description: "Real-time tracking and automated alerts for seamless management"
    },
    {
      icon: TrendingUp,
      title: "Powerful Analytics",
      description: "Data-driven insights to optimize your business operations"
    }
  ]

  return (
    <div className="min-h-screen flex">
      {/* Left Section - 65% */}
      <div className="flex-1 lg:flex-[0.65] bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-center px-12 lg:px-20">
          {/* Logo/Brand */}
          <div className="flex items-center mb-12">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Package className="h-8 w-8 text-white" />
            </div>
            <span className="ml-4 text-2xl font-bold text-white">SecureStock</span>
          </div>
          
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Secure Login,
              <br />
              <span className="text-blue-300">Smart Management</span>
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed max-w-lg">
              Experience enterprise-grade security with intuitive product management. 
              Your inventory, protected and optimized.
            </p>
          </div>
          
          {/* Features */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 group">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm group-hover:bg-white/30 transition-all duration-300">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{feature.title}</h3>
                  <p className="text-blue-100 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Security Badge */}
          <div className="mt-12 flex items-center space-x-3 text-blue-100">
            <Lock className="h-5 w-5" />
            <span className="text-sm">ISO 27001 Certified • SOC 2 Type II Compliant</span>
          </div>
        </div>
      </div>
      
      {/* Right Section - 35% */}
      <div className="flex-1 lg:flex-[0.35] bg-gray-50 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center pb-8">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-blue-100 rounded-2xl">
                  <Mail className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-gray-900">Welcome Back</CardTitle>
              <CardDescription className="text-gray-600 text-base">
                Enter your email to receive a secure verification code
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                
                <Button 
                  onClick={handleSendOTP}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02]" 
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
              </div>
              
              {/* Security Notice */}
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-green-800 font-medium">Secure Authentication</p>
                  <p className="text-xs text-green-700">
                    Your login is protected with end-to-end encryption and time-based OTP verification.
                  </p>
                </div>
              </div>
              
              {/* Help Text */}
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Having trouble? Check your spam folder or{" "}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    contact support
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}