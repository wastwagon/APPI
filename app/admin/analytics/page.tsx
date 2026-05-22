'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Eye, 
  Download,
  Calendar,
  Globe,
  Building2,
  FileText,
  Mail,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin
} from 'lucide-react'

interface AnalyticsData {
  pageViews: number
  uniqueVisitors: number
  bounceRate: number
  avgSessionDuration: number
  topPages: Array<{
    name: string
    views: number
    uniqueVisitors: number
    bounceRate: number
  }>
  trafficSources: Array<{
    source: string
    visitors: number
    percentage: number
  }>
  topCountries: Array<{
    country: string
    visitors: number
    percentage: number
  }>
  deviceTypes: Array<{
    device: string
    visitors: number
    percentage: number
  }>
  monthlyTrends: Array<{
    month: string
    pageViews: number
    uniqueVisitors: number
  }>
}

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d')
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    pageViews: 89400,
    uniqueVisitors: 45200,
    bounceRate: 32,
    avgSessionDuration: 272, // in seconds
    topPages: [
      {
        name: 'Homepage',
        views: 15200,
        uniqueVisitors: 8300,
        bounceRate: 28
      },
      {
        name: 'About Us',
        views: 8700,
        uniqueVisitors: 5100,
        bounceRate: 35
      },
      {
        name: 'Events',
        views: 6300,
        uniqueVisitors: 3800,
        bounceRate: 42
      },
      {
        name: 'Publications',
        views: 5200,
        uniqueVisitors: 3100,
        bounceRate: 38
      },
      {
        name: 'Contact',
        views: 4100,
        uniqueVisitors: 2400,
        bounceRate: 45
      }
    ],
    trafficSources: [
      {
        source: 'Direct',
        visitors: 18000,
        percentage: 40
      },
      {
        source: 'Organic Search',
        visitors: 13500,
        percentage: 30
      },
      {
        source: 'Social Media',
        visitors: 9000,
        percentage: 20
      },
      {
        source: 'Referral',
        visitors: 4500,
        percentage: 10
      }
    ],
    topCountries: [
      {
        country: 'Nigeria',
        visitors: 12000,
        percentage: 27
      },
      {
        country: 'South Africa',
        visitors: 9000,
        percentage: 20
      },
      {
        country: 'Ghana',
        visitors: 7200,
        percentage: 16
      },
      {
        country: 'Kenya',
        visitors: 6300,
        percentage: 14
      },
      {
        country: 'Uganda',
        visitors: 4500,
        percentage: 10
      }
    ],
    deviceTypes: [
      {
        device: 'Desktop',
        visitors: 22500,
        percentage: 50
      },
      {
        device: 'Mobile',
        visitors: 18000,
        percentage: 40
      },
      {
        device: 'Tablet',
        visitors: 4500,
        percentage: 10
      }
    ],
    monthlyTrends: [
      { month: 'Jan', pageViews: 82000, uniqueVisitors: 41000 },
      { month: 'Feb', pageViews: 85000, uniqueVisitors: 42500 },
      { month: 'Mar', pageViews: 88000, uniqueVisitors: 44000 },
      { month: 'Apr', pageViews: 92000, uniqueVisitors: 46000 },
      { month: 'May', pageViews: 89000, uniqueVisitors: 44500 },
      { month: 'Jun', pageViews: 89400, uniqueVisitors: 45200 }
    ]
  })

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}m ${remainingSeconds}s`
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return num.toString()
  }

  const getPercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
  }

  const calculatePercentageChange = () => {
    const currentMonth = analyticsData.monthlyTrends[analyticsData.monthlyTrends.length - 1]
    const previousMonth = analyticsData.monthlyTrends[analyticsData.monthlyTrends.length - 2]
    
    return {
      pageViews: getPercentageChange(currentMonth.pageViews, previousMonth.pageViews),
      uniqueVisitors: getPercentageChange(currentMonth.uniqueVisitors, previousMonth.uniqueVisitors)
    }
  }

  const percentageChanges = calculatePercentageChange()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Website analytics and performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData.pageViews)}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              {percentageChanges.pageViews >= 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-600" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-600" />
              )}
              <span className={percentageChanges.pageViews >= 0 ? 'text-green-600' : 'text-red-600'}>
                {Math.abs(percentageChanges.pageViews).toFixed(1)}%
              </span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analyticsData.uniqueVisitors)}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              {percentageChanges.uniqueVisitors >= 0 ? (
                <ArrowUpRight className="h-3 w-3 text-green-600" />
              ) : (
                <ArrowDownRight className="h-3 w-3 text-red-600" />
              )}
              <span className={percentageChanges.uniqueVisitors >= 0 ? 'text-green-600' : 'text-red-600'}>
                {Math.abs(percentageChanges.uniqueVisitors).toFixed(1)}%
              </span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.bounceRate}%</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <ArrowDownRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">2.1%</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatDuration(analyticsData.avgSessionDuration)}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <ArrowUpRight className="h-3 w-3 text-green-600" />
              <span className="text-green-600">12s</span>
              <span>from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <Card>
          <CardHeader>
            <CardTitle>Top Pages</CardTitle>
            <CardDescription>Most visited pages on your website</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topPages.map((page, index) => (
                <div key={page.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium">{page.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatNumber(page.views)} views • {formatNumber(page.uniqueVisitors)} unique
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{page.bounceRate}%</p>
                    <p className="text-xs text-muted-foreground">Bounce rate</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
            <CardDescription>Where your visitors come from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.trafficSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Globe className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">{source.source}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatNumber(source.visitors)} visitors
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{source.percentage}%</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-2 bg-green-500 rounded-full" 
                        style={{ width: `${source.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Countries */}
        <Card>
          <CardHeader>
            <CardTitle>Top Countries</CardTitle>
            <CardDescription>Visitor distribution by country</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topCountries.map((country) => (
                <div key={country.country} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <MapPin className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">{country.country}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatNumber(country.visitors)} visitors
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{country.percentage}%</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-2 bg-purple-500 rounded-full" 
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Device Types */}
        <Card>
          <CardHeader>
            <CardTitle>Device Types</CardTitle>
            <CardDescription>Visitor distribution by device</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.deviceTypes.map((device) => (
                <div key={device.device} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium">{device.device}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatNumber(device.visitors)} visitors
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{device.percentage}%</p>
                    <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                      <div 
                        className="h-2 bg-orange-500 rounded-full" 
                        style={{ width: `${device.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Trends Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
          <CardDescription>Page views and unique visitors over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.monthlyTrends.map((trend, index) => {
              const maxViews = Math.max(...analyticsData.monthlyTrends.map(t => t.pageViews))
              const maxVisitors = Math.max(...analyticsData.monthlyTrends.map(t => t.uniqueVisitors))
              const viewsHeight = (trend.pageViews / maxViews) * 100
              const visitorsHeight = (trend.uniqueVisitors / maxVisitors) * 100
              
              return (
                <div key={trend.month} className="flex-1 flex flex-col items-center space-y-2">
                  <div className="flex flex-col items-center space-y-1">
                    <div 
                      className="w-8 bg-blue-500 rounded-t"
                      style={{ height: `${viewsHeight}%` }}
                    ></div>
                    <div 
                      className="w-8 bg-green-500 rounded-t"
                      style={{ height: `${visitorsHeight}%` }}
                    ></div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{trend.month}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatNumber(trend.pageViews)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-sm">Page Views</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-sm">Unique Visitors</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2:00 PM</div>
            <p className="text-xs text-muted-foreground">
              Most active time of day
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Day</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Tuesday</div>
            <p className="text-xs text-muted-foreground">
              Most active day of week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Return Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23%</div>
            <p className="text-xs text-muted-foreground">
              Visitors who return
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
