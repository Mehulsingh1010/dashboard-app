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
import { toast } from "@/hooks/use-toast"
import { Shield, Loader2, ArrowLeft, Package, CheckCircle, Clock, Smartphone, Mail, Lock } from "lucide-react"

export default function VerifyOTPPage() {
  const [otp, setOtp] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const verificationEmail = localStorage.getItem("verificationEmail")
    if (!verificationEmail) {
      router.push("/")
      return
    }
    setEmail(verificationEmail)
  }, [router])

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!otp || otp.length !== 6) {
      toast({
        title: "Error",
        description: "Please enter a valid 6-digit OTP",
        variant: "destructive",
      })
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      })
      const data = await response.json()
      if (response.ok) {
        localStorage.setItem("authToken", data.token)
        localStorage.removeItem("verificationEmail")
        toast({
          title: "Success!",
          description: "Email verified successfully",
        })
        router.push("/dashboard")
      } else {
        toast({
          title: "Error",
          description: data.message || "Invalid OTP",
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

  const handleResendOTP = async () => {
    setIsResending(true)
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })
      if (response.ok) {
        toast({
          title: "OTP Resent!",
          description: "Please check your email for the new verification code",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to resend OTP",
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
      setIsResending(false)
    }
  }

  const verificationSteps = [
    {
      icon: Mail,
      title: "Email Sent",
      description: "Verification code delivered to your inbox",
      status: "completed",
    },
    {
      icon: Smartphone,
      title: "Enter Code",
      description: "Input the 6-digit verification code",
      status: "active",
    },
    {
      icon: CheckCircle,
      title: "Access Granted",
      description: "Secure access to your dashboard",
      status: "pending",
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
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.15),transparent_50%)]"></div>
        </div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-indigo-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>

        <div className="relative z-10 h-full flex flex-col justify-center">
          {/* Logo/Brand */}
          <div className="flex items-center mb-6">
            <div className="">
              <Image
                src="/logo.png"
                alt="Stocker Logo"
                width={34}
                height={34}
                className=""
              />
            </div>
            <span className="ml-4 text-2xl font-bold text-white">Stocker</span>
          </div>
          {/* Main Heading */}
          <div className="mb-4">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-4 leading-tight">
              Almost
              <br />
              <span className="text-blue-200">There!</span>
            </h1>
            <p className="text-lg text-blue-100 leading-relaxed max-w-lg opacity-90">
              We've sent a secure verification code to your email. This extra step ensures your inventory data stays
              protected.
            </p>
          </div>
          {/* Verification Steps */}
          <div className="space-y-3 mb-6">
            <h3 className="text-white text-lg font-semibold mb-2">Verification Process</h3>
            {verificationSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-4 group">
                <div
                  className={`p-2 rounded-md flex-shrink-0 transition-all duration-300 ${
                    step.status === "completed"
                      ? "bg-white/20 text-white"
                      : step.status === "active"
                        ? "bg-white/30 text-white"
                        : "bg-white/10 text-white/60"
                  }`}
                >
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="text-white font-semibold">{step.title}</h4>
                    {step.status === "completed" && <CheckCircle className="h-4 w-4 text-blue-200" />}
                    {step.status === "active" && <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>}
                  </div>
                  <p className="text-blue-100 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Security Notice */}
          <div className="flex items-center space-x-3 text-white opacity-80 mt-6">
            <Lock className="h-5 w-5" />
            <span className="text-sm">Code expires in 10 minutes • Secure authentication</span>
          </div>
        </div>
      </div>

      {/* Right Section - 40% */}
      <div className="flex-1 lg:flex-[0.4] flex flex-col items-center justify-center p-6 sm:p-8">
        {/* Go back home button for mobile */}
        <div className="lg:hidden flex justify-start mb-4">
          <Link href="/" passHref>
            <Button variant="ghost" className="text-gray-600 hover:bg-gray-100">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back home
            </Button>
          </Link>
        </div>
        {/* Mobile Logo/Brand - Visible on small screens */}
        <div className="lg:hidden flex items-center justify-center mb-8 mt-8">
          <Image
            src="/logo.png"
            alt="Stocker Logo"
            width={34}
            height={34}
            className=""
          />
          <span className="ml-2 text-xl font-bold text-gray-900">Stocker</span>
        </div>

        {/* Mobile Verification Steps - Visible on small screens, above the form */}
        <div className="lg:hidden w-full max-w-md mt-6 space-y-4">
          <h3 className="text-white text-lg font-semibold mb-4">Verification Process</h3>
          {verificationSteps.map((step, index) => (
            <div key={index} className="flex items-start space-x-4 group">
              <div
                className={`p-2 rounded-md flex-shrink-0 transition-all duration-300 ${
                  step.status === "completed"
                    ? "bg-blue-600/20 text-white"
                    : step.status === "active"
                      ? "bg-blue-600/30 text-white"
                      : "bg-blue-600/10 text-white/60"
                }`}
              >
                <step.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-white font-semibold">{step.title}</h4>
                  {step.status === "completed" && <CheckCircle className="h-4 w-4 text-blue-200" />}
                  {step.status === "active" && <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>}
                </div>
                <p className="text-blue-100 text-sm">{step.description}</p>
              </div>
            </div>
          ))}
          {/* Mobile Security Badge */}
          <div className="flex items-center justify-center space-x-3 text-white opacity-80 mt-4 mb-8">
            {" "}
            {/* Added mb-8 for spacing before the card */}
            <Lock className="h-5 w-5" />
            <span className="text-sm">Code expires in 10 minutes • Secure authentication</span>
          </div>
        </div>

        <Card className="border border-gray-200 shadow-lg bg-white rounded-xl p-6 sm:p-8">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold text-gray-900">Verify Your Email</CardTitle>
            <CardDescription className="text-gray-600 text-base">
              We've sent a 6-digit code to
              <br />
              <span className="font-medium text-gray-800">{email}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-gray-700 font-medium">
                  Verification Code
                </Label>
                <Input
                  id="otp"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  className="text-center text-2xl tracking-widest h-14 border-gray-300 focus:border-blue-500 focus:ring-blue-500 font-mono rounded-lg"
                  required
                />
              </div>
              <Button
                onClick={handleVerifyOTP}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Verify Code
                  </>
                )}
              </Button>
            </div>
            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-2">
              <Button
                onClick={() => router.push("/")}
                variant="ghost"
                className="text-gray-600 hover:text-gray-800 p-0 h-auto font-medium"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to login
              </Button>
              <Button
                onClick={handleResendOTP}
                disabled={isResending}
                variant="ghost"
                className="text-blue-600 hover:text-blue-700 p-0 h-auto font-medium"
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    Resending...
                  </>
                ) : (
                  "Resend Code"
                )}
              </Button>
            </div>
            {/* Security Notice */}
            <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-800 font-medium">Time-Limited Code</p>
                <p className="text-xs text-blue-700">
                  Your verification code expires in 10 minutes for security purposes.
                </p>
              </div>
            </div>
            {/* Help Text */}
            <div className="text-center">
              <p className="text-sm text-gray-500">
                Can't find the code?{" "}
                <button className="text-blue-600 hover:text-blue-700 font-medium">Contact support</button> or check your
                spam folder
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
