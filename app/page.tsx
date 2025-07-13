import Link from "next/link";
import React from "react";
import { Shield, Package, TrendingUp, Users, Zap, Lock, CheckCircle, ArrowRight, Star, BarChart3, Database, Clock, Globe, Award } from "lucide-react";

function LandingPage() {
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
              <Link href="/auth" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-32 left-20 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-20 right-32 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-16 w-24 h-24 bg-indigo-200/30 rounded-full blur-xl animate-pulse delay-2000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Secure Inventory,
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smart Management
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Experience enterprise-grade security with intelligent inventory management. 
              Protect your assets, optimize your operations, and scale your business with confidence.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
              <Link href="/auth" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 inline-flex items-center">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
                Watch Demo
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

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
            <Link href="/auth" className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 inline-flex items-center">
              Start Your Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
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