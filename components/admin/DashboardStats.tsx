import {
  UsersIcon,
  CalendarIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
} from '@heroicons/react/24/outline'

interface StatsProps {
  stats: {
    users: number
    events: number
    publications: number
    parties: number
  }
}

const statConfigs = [
  {
    name: 'Total Users',
    key: 'users',
    icon: UsersIcon,
    color: 'bg-blue-500',
  },
  {
    name: 'Events',
    key: 'events',
    icon: CalendarIcon,
    color: 'bg-green-500',
  },
  {
    name: 'Publications',
    key: 'publications',
    icon: DocumentTextIcon,
    color: 'bg-purple-500',
  },
  {
    name: 'Political Parties',
    key: 'parties',
    icon: BuildingOfficeIcon,
    color: 'bg-orange-500',
  },
]

export default function DashboardStats({ stats }: StatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statConfigs.map((config) => {
        const Icon = config.icon
        
        return (
          <div
            key={config.name}
            className="bg-white overflow-hidden shadow rounded-lg"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${config.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      {config.name}
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {stats[config.key as keyof typeof stats]}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
