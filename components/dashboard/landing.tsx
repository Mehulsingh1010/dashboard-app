"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  LayoutDashboard,
  BarChart,
  Package,
  Users,
  Cloud,
  Shield,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

const slideInVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.6 } }
}

// Light mode custom icons
function LineGraph({ color = "#2563eb" }: { color?: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg p-2 border border-gray-200">
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

function FeatureIconWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50 border border-blue-100">
      {children}
    </div>
  )
}

function OTPIconWithCircle() {
  return (
    <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-50 border border-blue-100">
      <svg className="absolute w-full h-full" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="35" stroke="#cbd5e1" strokeWidth="2" />
      </svg>
      <div className="relative z-10">
        <Shield className="w-7 h-7 md:w-8 md:h-8 text-blue-600" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">✓</span>
        </div>
      </div>
    </div>
  )
}

// AnimatedText component with line break support
function AnimatedText({ text, className = "" }: { text: string; className?: string }) {
  const lines = text.split('\n');
  
  return (
    <div className={className}>
      {lines.map((line, lineIndex) => (
        <div key={lineIndex} className="flex justify-center">
          {Array.from(line).map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: lineIndex * 0.3 + letterIndex * 0.05,
                type: "spring",
                damping: 12,
                stiffness: 100
              }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}

// Navbar Component with animation
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-between p-4 md:p-6 max-w-7xl mx-auto relative z-30 font-poppins fixed w-full ${
        scrolled ? 'bg-blue-600/90 backdrop-blur-sm shadow-md' : 'bg-transparent'
      }`}
    >
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center space-x-2"
      >
        <Link href="/">
          <Image
            src="/logo.png"
            alt="StockFlow Logo"
            width={34}
            height={34}
            className="hover:scale-110 transition-transform duration-300"
          />
        </Link>
        <span className="text-white text-lg md:text-xl font-bold">Stocker</span>
      </motion.div>
      <div className="hidden md:flex space-x-6 lg:space-x-8">
        {['Home', 'Features', 'Pricing', 'Demo', 'Contact'].map((item, index) => (
          <motion.div
            key={item}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Link 
              href="#" 
              className="text-white hover:text-gray-200 transition-colors relative group"
            >
              {item}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          asChild
          className="bg-white text-slate-800 hover:bg-gray-100 rounded-full px-4 py-2 md:px-6 md:py-2 font-semibold text-sm md:text-base hover:scale-105 transition-transform"
        >
          <Link href="/auth">Enter Dashboard</Link>
        </Button>
      </motion.div>
    </motion.nav>
  )
}

// Footer Component with animations restored
function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-12 md:py-16 font-poppins"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
        {/* Company Info */}
        <div className="flex flex-col items-start">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center space-x-2 mb-4"
          >
            <Image
              src="/logo.png"
              alt="StockFlow Logo"
              width={34}
              height={34}
              className="hover:rotate-12 transition-transform duration-300"
            />
            <span className="text-xl font-bold">Stocker</span>
          </motion.div>
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-blue-100 text-sm leading-relaxed"
          >
            Streamlining inventory management with smart analytics and secure solutions.
          </motion.p>
        </div>

        {/* Product Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-blue-100 text-sm">
            {['Features', 'Pricing', 'Integrations', 'Demo'].map((item) => (
              <motion.li
                key={item}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link href="#" className="hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-blue-300 rounded-full mr-2"></span>
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Company Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-blue-100 text-sm">
            {['About Us', 'Careers', 'Blog', 'Contact'].map((item) => (
              <motion.li
                key={item}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link href="#" className="hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-blue-300 rounded-full mr-2"></span>
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Legal & Social Media */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="md:col-span-2 lg:col-span-1"
        >
          <h3 className="text-lg font-semibold mb-4">Legal</h3>
          <ul className="space-y-2 text-blue-100 text-sm mb-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <motion.li
                key={item}
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Link href="#" className="hover:text-white transition-colors flex items-center">
                  <span className="w-1 h-1 bg-blue-300 rounded-full mr-2"></span>
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            {[
              { icon: Facebook, label: 'Facebook' },
              { icon: Twitter, label: 'Twitter' },
              { icon: Linkedin, label: 'LinkedIn' },
              { icon: Instagram, label: 'Instagram' }
            ].map((social, index) => (
              <motion.div
                key={social.label}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                whileHover={{ y: -3 }}
              >
                <Link 
                  href="#" 
                  className="text-blue-100 hover:text-white transition-colors" 
                  aria-label={social.label}
                >
                  <social.icon className="w-6 h-6" />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Copyright */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-12 pt-8 border-t border-blue-700 text-center text-blue-200 text-sm"
      >
        &copy; {new Date().getFullYear()} Stocker. All rights reserved.
      </motion.div>
    </motion.footer>
  )
}

// Main Home Component
export default function Landing() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (featuresRef.current) {
      observer.observe(featuresRef.current)
    }

    return () => {
      if (featuresRef.current) {
        observer.unobserve(featuresRef.current)
      }
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen font-poppins">
      {/* Hero section with gradient background */}
      <div className="relative w-full bg-gradient-to-r from-blue-600 to-indigo-700">
        <Navbar />
        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-12 py-12 md:py-16 lg:py-20 pt-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight max-w-4xl mb-4 md:mb-6"
          >
            <AnimatedText text={"Streamline Your Inventory\nManagement with Smart\nAnalytics"} />
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white text-base md:text-lg lg:text-xl max-w-3xl mb-8 md:mb-10 opacity-90 leading-relaxed"
          >
            Take control of your inventory with our powerful management system. Track products, analyze trends, and make
            data-driven decisions with secure OTP authentication and real-time insights.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          >
            <Button
              asChild
              className="bg-slate-800 text-white hover:bg-slate-700 rounded-full px-6 py-3 md:px-8 md:py-3 text-base md:text-lg font-semibold hover:scale-105 transition-transform"
            >
              <Link href="/auth">Dive In</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-800 rounded-full px-6 py-3 md:px-8 md:py-3 text-base md:text-lg font-semibold hover:scale-105 transition-transform"
            >
              <Link href="/auth">Enter Dashboard</Link>
            </Button>
          </motion.div>
        </div>
        {/* Dashboard image section positioned to overlap with white background */}
        <div className="relative w-full px-4 md:px-8 lg:px-12 pb-16 md:pb-20 lg:pb-24">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="relative w-full max-w-6xl mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border border-gray-300 bg-gray-100 z-20"
          >
            <Image
              src="/landing/home2.png"
              alt="Inventory Management Dashboard"
              fill
              style={{ objectFit: "contain" }}
              className="rounded-xl"
              priority
            />
          </motion.div>
        </div>
      </div>

      {/* White background section with features */}
      <div className="relative w-full bg-white -mt-48 md:-mt-60 lg:-mt-72 pt-56 md:pt-72 lg:pt-80 pb-16 md:pb-24 lg:pb-32 flex-grow">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          {/* Features Grid Section */}
          <div className="py-12 md:py-16 lg:py-20">
            {/* Section Header */}
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4">
                Powerful Features for Smart Inventory Management
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to manage your inventory efficiently with advanced analytics and secure access
              </p>
            </div>
            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Card 1: Inventory Dashboard */}
              <Card className="bg-white border border-gray-200 p-6 md:p-8 rounded-xl flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <FeatureIconWrapper>
                  <LayoutDashboard className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                </FeatureIconWrapper>
                <h3 className="text-lg md:text-xl font-bold mt-4 md:mt-6 text-gray-900">Inventory Dashboard</h3>
                <p className="text-gray-600 mt-2 md:mt-3 text-sm leading-relaxed">
                  Get a comprehensive overview of your product listings, product performance, and key inventory metrics at a
                  glance.
                </p>
              </Card>
              {/* Card 2: OTP Authentication */}
              <Card className="bg-white border border-gray-200 p-6 md:p-8 rounded-xl flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <OTPIconWithCircle />
                <h3 className="text-lg md:text-xl font-bold mt-4 md:mt-6 text-gray-900">OTP Authentication</h3>
                <p className="text-gray-600 mt-2 md:mt-3 text-sm leading-relaxed">
                  Secure access to your inventory data with one-time password authentication for enhanced security.
                </p>
              </Card>
              {/* Card 3: Real-time Analytics */}
              <Card className="bg-white border border-gray-200 p-6 md:p-8 rounded-xl flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between w-full mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <BarChart className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                    <span className="text-xs md:text-sm font-medium">Live Analytics</span>
                  </div>
                  <span className="text-green-600 text-xs md:text-sm font-medium">Active</span>
                </div>
                <div className="h-12 md:h-16 mb-4">
                  <LineGraph />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center">Sales Analytics</h3>
                <p className="text-gray-600 mt-2 md:mt-3 text-sm text-center leading-relaxed">
                  Track sales trends, inventory turnover, and product performance with interactive charts and reports.
                </p>
              </Card>
              {/* Card 4: Product Management */}
              <Card className="bg-white border border-gray-200 p-6 md:p-8 rounded-xl flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <FeatureIconWrapper>
                    <Package className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                  </FeatureIconWrapper>
                </div>
                <div className="h-12 md:h-16 mb-4">
                  <LineGraph color="#10b981" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center">Product Management</h3>
                <p className="text-gray-600 mt-2 md:mt-3 text-sm text-center leading-relaxed">
                  Add, edit, and organize your products with detailed information, pricing, and stock level tracking.
                </p>
              </Card>
              {/* Card 5: User Management */}
              <Card className="bg-white border border-gray-200 p-6 md:p-8 rounded-xl flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-center mb-4">
                  <FeatureIconWrapper>
                    <Users className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                  </FeatureIconWrapper>
                </div>
                <div className="flex items-center justify-center mb-4 -space-x-2">
                  <Avatar className="w-6 h-6 md:w-8 md:h-8 border-2 border-white shadow-sm">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback className="text-xs bg-blue-500 text-white">A</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-6 h-6 md:w-8 md:h-h8 border-2 border-white shadow-sm">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Manager" />
                    <AvatarFallback className="text-xs bg-green-500 text-white">M</AvatarFallback>
                  </Avatar>
                  <Avatar className="w-6 h-6 md:w-8 md:h-8 border-2 border-white shadow-sm">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Staff" />
                    <AvatarFallback className="text-xs bg-purple-500 text-white">S</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex justify-center gap-2 md:gap-4 mb-4 text-xs">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Admin</span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Manager</span>
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">Staff</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 text-center">Team Management</h3>
                <p className="text-gray-600 mt-2 md:mt-3 text-sm text-center leading-relaxed">
                  Manage team access, assign roles, and control permissions for different levels of inventory
                  management.
                </p>
              </Card>
              {/* Card 6: Cloud-Based & Secure */}
              <Card className="bg-white border border-gray-200 p-6 md:p-8 rounded-xl flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <FeatureIconWrapper>
                  <Cloud className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
                </FeatureIconWrapper>
                <h3 className="text-lg md:text-xl font-bold mt-4 md:mt-6 text-gray-900">Cloud-Based & Secure</h3>
                <p className="text-gray-600 mt-2 md:mt-3 text-sm text-center leading-relaxed">
                  Access your inventory from anywhere with secure cloud storage and automatic data backups.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-12 md:py-16 lg:py-20"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 text-center">
          <motion.h3 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6"
          >
            Ready to take control of your inventory?
          </motion.h3>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-blue-100 text-base md:text-lg max-w-2xl mx-auto mb-6 md:mb-8"
          >
            Join hundreds of businesses who have streamlined their inventory management with our smart analytics
            platform.
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              asChild
              className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-6 py-3 md:px-8 md:py-3 text-base md:text-lg font-semibold"
            >
              <Link href="/auth">Start managing inventory today</Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer Section with animations restored */}
      <Footer />
    </div>
  )
}