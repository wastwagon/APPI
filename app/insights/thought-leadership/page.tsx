'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Lightbulb, 
  Users, 
  TrendingUp, 
  Calendar,
  ArrowRight,
  ExternalLink
} from 'lucide-react'

const thoughtLeadershipArticles = [
  {
    title: 'The Future of Democratic Governance in Africa',
    author: 'Dr. Sarah Johnson',
    date: 'March 15, 2024',
    category: 'Governance',
    excerpt: 'An exploration of emerging trends and challenges in democratic governance across the African continent.',
    readTime: '8 min read',
    featured: true
  },
  {
    title: 'Youth Political Participation: Beyond the Ballot Box',
    author: 'Prof. Michael Chen',
    date: 'March 10, 2024',
    category: 'Youth Engagement',
    excerpt: 'How young people are reshaping political participation through digital platforms and grassroots movements.',
    readTime: '6 min read',
    featured: false
  },
  {
    title: 'Women in Political Leadership: Breaking the Glass Ceiling',
    author: 'Dr. Amina Hassan',
    date: 'March 5, 2024',
    category: 'Gender Equality',
    excerpt: 'Analysis of progress and remaining challenges for women in political leadership across Africa.',
    readTime: '10 min read',
    featured: false
  },
  {
    title: 'Digital Democracy: Technology and Political Participation',
    author: 'Tech Policy Institute',
    date: 'February 28, 2024',
    category: 'Technology',
    excerpt: 'How digital technologies are transforming political participation and democratic processes.',
    readTime: '7 min read',
    featured: false
  }
]

const featuredTopics = [
  {
    title: 'Democratic Governance',
    description: 'Analysis and insights on democratic governance trends and challenges.',
    icon: TrendingUp,
    articles: 15
  },
  {
    title: 'Youth Engagement',
    description: 'Strategies and best practices for engaging young people in political processes.',
    icon: Users,
    articles: 12
  },
  {
    title: 'Gender Equality',
    description: "Promoting women's participation and leadership in political processes.",
    icon: Lightbulb,
    articles: 8
  }
]

import MainLayout from '@/app/main-layout'

export default function ThoughtLeadershipPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-appi-blue to-appi-teal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Thought Leadership
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Expert insights, analysis, and perspectives on democratic governance and political party development
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
                Read Latest Articles
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Article
            </h2>
          </div>

          <Card className="max-w-4xl mx-auto hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-appi-blue border-appi-blue">
                  Featured
                </Badge>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>March 15, 2024</span>
                </div>
              </div>
              <CardTitle className="text-2xl">The Future of Democratic Governance in Africa</CardTitle>
              <CardDescription className="text-lg">
                An exploration of emerging trends and challenges in democratic governance across the African continent.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>By Dr. Sarah Johnson</span>
                  <span>8 min read</span>
                </div>
                <p className="text-gray-700">
                  As Africa continues to evolve politically, the landscape of democratic governance is undergoing significant transformation. 
                  This article examines the key trends shaping the future of democracy on the continent, from digital transformation 
                  to youth participation and the role of political parties in fostering inclusive governance...
                </p>
                <Button className="w-full">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <p className="text-xl text-gray-600">
              Fresh insights and analysis from our thought leaders
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {thoughtLeadershipArticles.slice(1).map((article) => (
              <Card key={article.title} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-appi-blue border-appi-blue">
                      {article.category}
                    </Badge>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                  <CardDescription className="text-base">
                    {article.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>By {article.author}</span>
                      <span>{article.readTime}</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Topics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Topics
            </h2>
            <p className="text-xl text-gray-600">
              Explore our key areas of expertise and research
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredTopics.map((topic) => {
              const IconComponent = topic.icon
              return (
                <Card key={topic.title} className="text-center hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="mx-auto w-16 h-16 bg-appi-blue/10 rounded-lg mb-4 flex items-center justify-center">
                      <IconComponent className="h-8 w-8 text-appi-blue" />
                    </div>
                    <CardTitle className="text-xl">{topic.title}</CardTitle>
                    <CardDescription className="text-base">
                      {topic.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-600">
                        {topic.articles} articles available
                      </p>
                      <Button variant="outline" className="w-full">
                        Explore Topic
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-appi-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Informed
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights and analysis on democratic governance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-appi-blue hover:bg-gray-100">
              Subscribe to Newsletter
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-appi-blue">
              Contact Our Experts
            </Button>
          </div>
        </div>
      </section>
      </div>
    </MainLayout>
  )
}
