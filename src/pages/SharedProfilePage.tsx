import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useGetSharedProfileQuery } from '../api/shareApi'
import { FiUser, FiExternalLink } from 'react-icons/fi'
import LoadingSpinner from '../components/LoadingSpinner'
import RadarChart from '../components/RadarChart'

const SharedProfilePage = () => {
  const { profileId } = useParams()
  const { data: profileData, isLoading, error } = useGetSharedProfileQuery(profileId)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-lg text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (error || !profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <FiUser className="h-6 w-6 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Profile Not Found</h1>
          <p className="text-gray-600 mb-4">
            The profile you're looking for doesn't exist or has been removed.
          </p>
          <a
            href={import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000'}
            className="btn btn-primary"
          >
            Create Your Own Profile
          </a>
        </div>
      </div>
    )
  }

  const { profile, radarData, user } = profileData

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-primary-500 rounded-full flex items-center justify-center">
                <FiUser className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {user?.displayName || 'Professional Profile'}
                </h1>
                <p className="text-sm text-gray-500">Radar Chart Profile</p>
              </div>
            </div>

            <a
              href={import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000'}
              className="btn btn-outline flex items-center space-x-1"
            >
              <FiExternalLink className="h-4 w-4" />
              <span>Create Your Own</span>
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Radar Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Professional Skills Radar
              </h2>

              <div className="h-96">
                <RadarChart 
                  data={radarData}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            {/* Profile Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Experience</span>
                  <span className="text-sm font-medium text-gray-900">
                    {profile.yearsOfExperience} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Technical Skills</span>
                  <span className="text-sm font-medium text-gray-900">
                    {Object.keys(profile.technicalSkills || {}).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Companies</span>
                  <span className="text-sm font-medium text-gray-900">
                    {profile.pastCompanies?.length || 0}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Certifications</span>
                  <span className="text-sm font-medium text-gray-900">
                    {profile.certifications?.length || 0}
                  </span>
                </div>
              </div>
            </div>

            {/* Skills Breakdown */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Radar Scores</h3>
              <div className="space-y-3">
                {radarData.labels.map((label, index) => (
                  <div key={label} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 flex-1">{label}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${(radarData.scores[index] / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">
                        {radarData.scores[index]}/10
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            {profile.technicalSkills && Object.keys(profile.technicalSkills).length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Skills</h3>
                <div className="space-y-2">
                  {Object.entries(profile.technicalSkills).map(([skill, level]) => (
                    <div key={skill} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{skill}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-12 bg-gray-200 rounded-full h-1.5">
                          <div
                            className="bg-blue-600 h-1.5 rounded-full"
                            style={{ width: `${(level / 10) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-500 w-6">{level}/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Past Companies */}
            {profile.pastCompanies && profile.pastCompanies.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience</h3>
                <div className="space-y-2">
                  {profile.pastCompanies.map((company, index) => (
                    <div key={index} className="text-sm text-gray-700">
                      • {company}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <span>Powered by</span>
            <a
              href={import.meta.env.VITE_FRONTEND_URL || 'http://localhost:3000'}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              Radar Chart AI
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SharedProfilePage