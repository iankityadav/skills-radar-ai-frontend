import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
  FiUpload, 
  FiEdit, 
  FiBarChart3, 
  FiShare2,
  FiUser,
  FiCheckCircle
} from 'react-icons/fi'

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth)
  const { cvText } = useSelector((state) => state.cvUpload)
  const { finalProfile } = useSelector((state) => state.profile)
  const { radarData } = useSelector((state) => state.radarChart)

  const steps = [
    {
      id: 1,
      title: 'Upload CV',
      description: 'Upload your CV file for AI analysis',
      icon: FiUpload,
      href: '/upload',
      completed: !!cvText,
      current: !cvText
    },
    {
      id: 2,
      title: 'Review Profile',
      description: 'Review and edit extracted profile data',
      icon: FiEdit,
      href: '/review',
      completed: !!finalProfile,
      current: !!cvText && !finalProfile
    },
    {
      id: 3,
      title: 'Generate Chart',
      description: 'Create your radar chart profile',
      icon: FiBarChart3,
      href: '/radar',
      completed: !!radarData,
      current: !!finalProfile && !radarData
    },
    {
      id: 4,
      title: 'Share Profile',
      description: 'Get shareable link for your profile',
      icon: FiShare2,
      href: '/radar',
      completed: false,
      current: !!radarData
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {user?.displayName || user?.username}! 👋
        </h1>
        <p className="mt-2 text-gray-600">
          Create your professional radar chart profile in just a few steps
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Your Progress
          </h2>

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center p-4 rounded-lg border transition-colors ${
                  step.completed
                    ? 'bg-green-50 border-green-200'
                    : step.current
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex-shrink-0">
                  {step.completed ? (
                    <FiCheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <step.icon
                      className={`h-6 w-6 ${
                        step.current ? 'text-blue-600' : 'text-gray-400'
                      }`}
                    />
                  )}
                </div>

                <div className="ml-4 flex-grow">
                  <h3
                    className={`text-sm font-medium ${
                      step.completed
                        ? 'text-green-900'
                        : step.current
                        ? 'text-blue-900'
                        : 'text-gray-900'
                    }`}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`text-sm ${
                      step.completed
                        ? 'text-green-700'
                        : step.current
                        ? 'text-blue-700'
                        : 'text-gray-500'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  {(step.current || step.completed) && (
                    <Link
                      to={step.href}
                      className={`btn text-sm ${
                        step.completed
                          ? 'btn-secondary'
                          : 'btn-primary'
                      }`}
                    >
                      {step.completed ? 'View' : 'Continue'}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiUser className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">
                Profile Status
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {finalProfile ? 'Complete' : 'In Progress'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiBarChart3 className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">
                Radar Chart
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {radarData ? 'Generated' : 'Pending'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FiShare2 className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-500">
                Shareable Link
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {radarData ? 'Available' : 'Not Ready'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/upload"
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FiUpload className="h-5 w-5 text-blue-600 mr-3" />
            <div>
              <div className="text-sm font-medium text-gray-900">
                Upload New CV
              </div>
              <div className="text-sm text-gray-500">
                Start with a fresh CV analysis
              </div>
            </div>
          </Link>

          {finalProfile && (
            <Link
              to="/radar"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FiBarChart3 className="h-5 w-5 text-green-600 mr-3" />
              <div>
                <div className="text-sm font-medium text-gray-900">
                  View Radar Chart
                </div>
                <div className="text-sm text-gray-500">
                  See your profile visualization
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage