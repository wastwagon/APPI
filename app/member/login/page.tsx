'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Eye, EyeOff, Lock, Mail, Shield, Users, BookOpen, Calendar } from 'lucide-react'

export default function MemberLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // TODO: Implement actual authentication logic
      // For now, simulate authentication
      if (email && password) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Redirect to member dashboard
        router.push('/member/dashboard')
      } else {
        setError('Please enter both email and password')
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-appi-blue via-appi-teal to-appi-blue-light flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/appi-logo.png"
              alt="APPI Logo"
              width={120}
              height={48}
              className="h-12 w-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Member Portal</h1>
          <p className="text-white/80">Secure access for political party members</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-appi-blue/10 rounded-full">
                <Shield className="h-8 w-8 text-appi-blue" />
              </div>
            </div>
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>
              Access your private content and tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-appi-blue hover:bg-appi-blue-dark" 
                disabled={isLoading}
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                href="/contact" 
                className="text-sm text-appi-blue hover:underline"
              >
                Need help accessing your account?
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Member Benefits */}
        <div className="mt-8">
          <h3 className="text-white text-lg font-semibold mb-4 text-center">Member Benefits</h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3">
              <Users className="h-5 w-5 text-white" />
              <div>
                <h4 className="text-white font-medium">Internal Reports</h4>
                <p className="text-white/70 text-sm">Access to confidential reports and draft declarations</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3">
              <BookOpen className="h-5 w-5 text-white" />
              <div>
                <h4 className="text-white font-medium">Training Materials</h4>
                <p className="text-white/70 text-sm">Custom toolkits and capacity building resources</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-white" />
              <div>
                <h4 className="text-white font-medium">Activity Scheduling</h4>
                <p className="text-white/70 text-sm">Tools for planning and managing upcoming activities</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm">
            Only verified users with assigned credentials can access this portal.
          </p>
          <div className="mt-4">
            <Link 
              href="/" 
              className="text-white/80 hover:text-white text-sm underline"
            >
              ← Back to Main Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
