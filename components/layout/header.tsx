'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Menu, 
  X, 
  ChevronDown, 
  Globe, 
  ChevronRight,
  Users,
  Target,
  Calendar,
  Handshake,
  BookOpen,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'am', name: 'አማርኛ', flag: '🇪🇹' },
  { code: 'sw', name: 'Kiswahili', flag: '🇹🇿' },
]

const navigation = [
  {
    name: 'ABOUT',
    href: '/about',
    icon: Users,
    subpages: [
      { name: 'Who We Are', href: '/about/who-we-are' },
      { name: 'Strategic Objectives', href: '/about/strategic-objectives' },
      { name: 'Leadership & Governance', href: '/about/leadership' },
      { name: 'Implementation Framework', href: '/about/framework' },
      { name: 'Declarations & Communiqués', href: '/about/declarations' },
    ]
  },
  {
    name: 'OUR PLATFORMS',
    href: '/platforms',
    icon: Target,
    subpages: [
      { name: 'African Political Parties Summit', href: '/platforms/summit' },
      { name: 'Political Academy', href: '/platforms/academy' },
      { name: 'Working Groups', href: '/platforms/working-groups' },
      { name: 'Reform Dialogues', href: '/platforms/reform-dialogues' },
      { name: 'Inclusive Leadership', href: '/platforms/inclusive-leadership' },
      { name: 'Learning Hubs', href: '/platforms/learning-hubs' },
      { name: 'Mediation Unit', href: '/platforms/mediation' },
    ]
  },
  {
    name: 'SUMMIT',
    href: '/summit',
    icon: Calendar,
    subpages: [
      { name: 'About APPS', href: '/summit/about' },
      { name: 'Next Summit', href: '/summit/next' },
      { name: 'Registration', href: '/summit/register' },
      { name: 'Media Toolkit', href: '/summit/media' },
    ]
  },
  {
    name: 'ENGAGEMENT',
    href: '/engagement',
    icon: Handshake,
    subpages: [
      { name: 'For Political Parties', href: '/engagement/parties' },
      { name: 'Youth & Women', href: '/engagement/youth-women' },
      { name: 'CTPE-AfCFTA', href: '/engagement/ctpe-afcfta' },
      { name: 'Join as Partner', href: '/engagement/partner' },
    ]
  },
  {
    name: 'INSIGHTS',
    href: '/insights',
    icon: BookOpen,
    subpages: [
      { name: 'Publications', href: '/insights/publications' },
      { name: 'Thought Leadership', href: '/insights/thought-leadership' },
      { name: 'Events Calendar', href: '/insights/events' },
      { name: 'Press Releases', href: '/insights/press' },
      { name: 'Media Coverage', href: '/insights/media' },
    ]
  },
  {
    name: 'CONTACT',
    href: '/contact',
    icon: Mail,
    subpages: [
      { name: 'Contact Secretariat', href: '/contact/secretariat' },
      { name: 'Social Media', href: '/contact/social' },
      { name: 'Member Login', href: '/contact/login' },
    ]
  },
]

const socialLinks = [
  { name: 'Facebook', href: 'https://facebook.com/appi-africa', icon: Facebook },
  { name: 'Twitter', href: 'https://twitter.com/appi_africa', icon: Twitter },
  { name: 'Instagram', href: 'https://instagram.com/appi_africa', icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/appi-africa', icon: Linkedin },
  { name: 'YouTube', href: 'https://youtube.com/@appi-africa', icon: Youtube },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [expandedMobileSections, setExpandedMobileSections] = useState<string[]>([])

  const toggleMobileSection = (sectionName: string) => {
    setExpandedMobileSections(prev => 
      prev.includes(sectionName) 
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    )
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setExpandedMobileSections([])
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/home" className="flex items-center">
              <Image
                src="/images/appi-logo.png"
                alt="APPI Logo"
                width={120}
                height={48}
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <div className="flex items-center">
                  {/* Main menu item as clickable link */}
                  <Link
                    href={item.href}
                    className="flex items-center text-gray-700 hover:text-appi-blue hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                  >
                    <span>{item.name}</span>
                  </Link>
                  {/* Dropdown trigger button */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 hover:bg-gray-50 ml-1"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-64 p-2"
                      align="start"
                    >
                      {item.subpages.map((subpage) => (
                        <DropdownMenuItem key={subpage.name} asChild>
                          <Link
                            href={subpage.href}
                            className="block px-3 py-2 text-sm text-gray-700 hover:text-appi-blue hover:bg-gray-50 rounded-md"
                          >
                            {subpage.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </nav>

          {/* Language Selector and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">EN</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang.code}>
                    <span className="mr-2">{lang.flag}</span>
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 max-h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="px-2 pt-2 pb-3">
            {navigation.map((item) => {
              const isExpanded = expandedMobileSections.includes(item.name)
              const IconComponent = item.icon
              return (
                <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                  {/* Section Header */}
                  <div className="flex items-center justify-between px-3 py-3">
                    {/* Main menu item as clickable link */}
                    <Link
                      href={item.href}
                      className="flex items-center space-x-3 text-base font-medium text-gray-700 hover:text-appi-blue hover:bg-gray-50 rounded-md transition-colors flex-1 py-2 px-2"
                      onClick={closeMobileMenu}
                    >
                      <IconComponent className="h-5 w-5 text-appi-blue" />
                      <span>{item.name}</span>
                    </Link>
                    {/* Dropdown toggle button */}
                    <button
                      onClick={() => toggleMobileSection(item.name)}
                      className="p-2 hover:bg-gray-50 rounded-md transition-colors"
                    >
                      <ChevronRight 
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isExpanded ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                  </div>
                  
                  {/* Collapsible Submenu */}
                  <div className={`overflow-hidden transition-all duration-200 ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="pl-4 space-y-1 pb-2">
                      {item.subpages.map((subpage) => (
                        <Link
                          key={subpage.name}
                          href={subpage.href}
                          className="block px-3 py-2 text-sm text-gray-600 hover:text-appi-blue hover:bg-gray-50 rounded-md transition-colors"
                          onClick={closeMobileMenu}
                        >
                          {subpage.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
            
            {/* Social Media Section */}
            <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="px-3 py-2 text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
                Connect With Us
              </div>
              <div className="flex justify-center space-x-4 px-3">
                {socialLinks.map((social) => {
                  const SocialIcon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-appi-blue hover:text-white rounded-full transition-colors duration-200"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <SocialIcon className="h-5 w-5" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
