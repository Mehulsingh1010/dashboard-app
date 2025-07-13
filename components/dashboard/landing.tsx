'use client'
import React, { useState, useEffect } from 'react';
import { Shield, Package, TrendingUp, Users, Zap, Lock, CheckCircle, ArrowRight, Star, BarChart3, Database, Clock, Globe, Award, Play, Check } from "lucide-react";
import Image from 'next/image';

function LandingPage() {
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  

  
  const heroMetrics = [
    { value: "99.9%", label: "Uptime", icon: Shield },
    { value: "40%", label: "Cost Reduction", icon: TrendingUp },
    { value: "2x", label: "Faster Processing", icon: Zap }
  ];



  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Advanced encryption, multi-factor authentication, and compliance with industry standards keep your data safe.",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: Package,
      title: "Smart Inventory Management",
      description: "Real-time tracking, automated alerts, and intelligent forecasting for seamless inventory operations.",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Data-driven insights, custom reports, and predictive analytics to optimize your business decisions.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Role-based access control, team workspaces, and real-time collaboration tools for your entire organization.",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with sub-second response times and 99.9% uptime guaranteed.",
      gradient: "from-yellow-500 to-orange-600"
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Multi-location support, international compliance, and 24/7 customer support worldwide.",
      gradient: "from-cyan-500 to-blue-600"
    }
  ];

  const stats = [
    { number: "10K+", label: "Active Users", icon: Users },
    { number: "99.9%", label: "Uptime", icon: Clock },
    { number: "50M+", label: "Items Tracked", icon: Database },
    { number: "150+", label: "Countries", icon: Globe }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      company: "TechCorp Inc.",
      content: "SecureStock transformed our inventory management. The real-time tracking and automated alerts have reduced our stock-outs by 90%.",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "Global Logistics",
      content: "The security features are exceptional. We handle sensitive data across multiple locations, and SecureStock gives us complete peace of mind.",
      rating: 5
    },
    {
      name: "Emma Rodriguez",
      role: "Supply Chain Director",
      company: "RetailMax",
      content: "The analytics dashboard provides insights we never had before. Our efficiency has improved by 40% since implementing SecureStock.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">SecureStock</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">Features</a>
              <a href="#testimonials" className="text-gray-600 hover:text-gray-900 transition-colors">Testimonials</a>
              <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative bg-white ">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  <span className="block">{typedText}</span>
                  <span className="block text-blue-600 mt-2">for Modern Business</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
                  Experience enterprise-grade security with intelligent inventory management. 
                  Protect your assets, optimize operations, and scale with confidence.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-3">
                {[
                  "Bank-level security with advanced encryption",
                  "Real-time inventory tracking & forecasting",
                  "Multi-location & warehouse management",
                  "Advanced analytics & business intelligence"
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="group inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                  <span>Start Free Trial</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  className="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
                  onMouseEnter={() => setIsVideoHovered(true)}
                  onMouseLeave={() => setIsVideoHovered(false)}
                >
                  <Play className={`mr-2 w-5 h-5 transition-transform ${isVideoHovered ? 'scale-110' : ''}`} />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Metrics */}
              
            </div>

            {/* Right Content - Dashboard Preview */}
            <div className="relative lg:ml-8">
              <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
                
                {/* Browser Chrome */}
                <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="text-sm text-gray-500">securestock.com/dashboard</div>
                  </div>
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                </div>

                {/* Dashboard Content */}
                <div className=" space-y-6">
                  
                  {/* Header */}
                  <Image  src="landing/analys.png" alt="pic" width={1500} height={1500}/>

                  {/* Stats Grid */}
                  

                  {/* Chart Area */}
                  {/* <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium text-gray-900">Inventory Trends</h4>
                      <div className="text-sm text-gray-500">Last 30 days</div>
                    </div>
                    <div className="h-32 flex items-end justify-between space-x-2">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={i}
                          className="bg-blue-600 rounded-t flex-1 max-w-6 transition-all duration-300 hover:bg-blue-700"
                          style={{
                            height: `${Math.random() * 80 + 20}%`,
                            animationDelay: `${i * 0.1}s`
                          }}
                        />
                      ))}
                    </div>
                  </div> */}

                  {/* Security Status */}
                  {/* <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">All systems secure</span>
                    </div>
                    <div className="text-xs text-green-600 mt-1">Last security scan: 2 minutes ago</div>
                  </div> */}
                </div>
              </div>

              {/* Floating Elements */}
               </div>
          </div>
        </div>

        {/* Bottom Section */}
      
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to streamline your inventory management while maintaining the highest security standards.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 group hover:border-gray-200">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} w-fit mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              See what our customers say about SecureStock
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-blue-600">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Inventory Management?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses that trust SecureStock with their most valuable assets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 inline-flex items-center">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <span className="ml-3 text-xl font-bold">SecureStock</span>
              </div>
              <p className="text-gray-400">
                Secure inventory management for modern businesses.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SecureStock. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;