import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useGenerateRadarScoresMutation, useGetRadarConfigQuery } from '../api/radarApi'
import { setRadarData, setChartConfig } from '../store/slices/radarChartSlice'
import { FiShare2, FiDownload, FiCopy, FiExternalLink } from 'react-icons/fi'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'
import RadarChart from '../components/RadarChart'

const RadarChartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { finalProfile } = useSelector(state => state.profile)
  const { radarData, profileSummary, isGenerating } = useSelector(state => state.radarChart)

  const [generateRadarScores] = useGenerateRadarScoresMutation()
  const { data: configData } = useGetRadarConfigQuery()

  const [shareableLink, setShareableLink] = useState('')
  const [showShareModal, setShowShareModal] = useState(false)

  useEffect(() => {
    if (!finalProfile) {
      navigate('/review')
      return
    }

    if (!radarData && finalProfile) {
      handleGenerateRadarChart()
    }

    if (configData) {
      dispatch(setChartConfig(configData.config))
    }
  }, [finalProfile, radarData, configData])

  const handleGenerateRadarChart = async () => {
    try {
      const result = await generateRadarScores(finalProfile).unwrap()
      dispatch(setRadarData({
        radarData: result.radarData,
        profileSummary: result.profileSummary
      }))
      toast.success('Radar chart generated successfully!')
    } catch (error) {
      toast.error('Failed to generate radar chart')
    }
  }

  const handleGenerateShareableLink = () => {
    // In a real implementation, this would create a unique profile ID
    // and store the profile data on the backend
    const profileId = Date.now().toString() // Temporary ID generation
    const link = `${window.location.origin}/share/${profileId}`
    setShareableLink(link)
    setShowShareModal(true)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareableLink)
    toast.success('Link copied to clipboard!')
  }

  const handleDownloadChart = () => {
    // This would typically generate and download a PDF or image
    toast.info('Download feature coming soon!')
  }

  if (isGenerating) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-lg text-gray-600">Generating your radar chart...</p>
        </div>
      </div>
    )
  }

  if (!radarData) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <p className="text-lg text-gray-600">No radar chart data available</p>
          <button
            onClick={() => navigate('/review')}
            className="mt-4 btn btn-primary"
          >
            Go to Profile Review
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Radar Chart Profile</h1>
        <p className="mt-2 text-gray-600">
          Your professional profile visualized as an interactive radar chart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Chart */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Profile Radar Chart</h2>
              <div className="flex space-x-2">
                <button
                  onClick={handleDownloadChart}
                  className="btn btn-outline flex items-center space-x-1"
                >
                  <FiDownload className="h-4 w-4" />
                  <span>Download</span>
                </button>
                <button
                  onClick={handleGenerateShareableLink}
                  className="btn btn-primary flex items-center space-x-1"
                >
                  <FiShare2 className="h-4 w-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div className="h-96">
              <RadarChart 
                data={radarData}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="space-y-6">
          {/* Summary Stats */}
          {profileSummary && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Years of Experience</span>
                  <span className="text-sm font-medium text-gray-900">
                    {profileSummary.yearsExperience}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Technical Skills</span>
                  <span className="text-sm font-medium text-gray-900">
                    {profileSummary.totalSkills}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Companies Worked</span>
                  <span className="text-sm font-medium text-gray-900">
                    {profileSummary.companiesWorked}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Certifications</span>
                  <span className="text-sm font-medium text-gray-900">
                    {profileSummary.certificationsCount}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Score Breakdown */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Breakdown</h3>
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

          {/* Actions */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate('/review')}
                className="w-full btn btn-outline text-left"
              >
                Edit Profile Data
              </button>
              <button
                onClick={handleGenerateRadarChart}
                className="w-full btn btn-secondary text-left"
              >
                Regenerate Chart
              </button>
              <button
                onClick={handleGenerateShareableLink}
                className="w-full btn btn-primary text-left flex items-center justify-center space-x-2"
              >
                <FiExternalLink className="h-4 w-4" />
                <span>Create Shareable Link</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Share Your Profile
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Share this link to showcase your professional profile:
            </p>

            <div className="flex items-center space-x-2 mb-4">
              <input
                type="text"
                value={shareableLink}
                readOnly
                className="input flex-1 text-sm"
              />
              <button
                onClick={handleCopyLink}
                className="btn btn-primary flex items-center space-x-1"
              >
                <FiCopy className="h-4 w-4" />
                <span>Copy</span>
              </button>
            </div>

            <div className="text-xs text-gray-500 mb-4">
              This link allows others to view your radar chart profile without requiring login.
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowShareModal(false)}
                className="btn btn-secondary"
              >
                Close
              </button>
              <a
                href={shareableLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary flex items-center space-x-1"
              >
                <FiExternalLink className="h-4 w-4" />
                <span>Preview</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RadarChartPage