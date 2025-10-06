import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useExtractProfileMutation, useSubmitManualDataMutation } from '../api/profileApi'
import { setExtractedProfile, setManualData } from '../store/slices/profileSlice'
import { FiEdit3, FiPlus, FiTrash2, FiCheck } from 'react-icons/fi'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'

const ProfileReviewPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { cvText } = useSelector(state => state.cvUpload)
  const { extractedProfile, finalProfile, isExtracting } = useSelector(state => state.profile)

  const [extractProfile] = useExtractProfileMutation()
  const [submitManualData] = useSubmitManualDataMutation()

  const [formData, setFormData] = useState({
    yearsOfExperience: 0,
    technicalSkills: {},
    softSkills: [],
    education: {
      collegeName: '',
      tier: 5
    },
    pastCompanies: [],
    certifications: [],
    jobTenureYears: []
  })

  const [newSkillName, setNewSkillName] = useState('')
  const [newSkillLevel, setNewSkillLevel] = useState(5)
  const [newSoftSkill, setNewSoftSkill] = useState('')
  const [newCompany, setNewCompany] = useState('')
  const [newCertification, setNewCertification] = useState('')
  const [newTenure, setNewTenure] = useState('')

  useEffect(() => {
    if (!cvText) {
      navigate('/upload')
      return
    }

    if (!extractedProfile && cvText) {
      handleExtractProfile()
    }
  }, [cvText, extractedProfile])

  useEffect(() => {
    if (extractedProfile) {
      setFormData(extractedProfile)
    }
  }, [extractedProfile])

  const handleExtractProfile = async () => {
    try {
      const result = await extractProfile(cvText).unwrap()
      dispatch(setExtractedProfile(result.profile))
      toast.success('Profile extracted successfully!')
    } catch (error) {
      toast.error('Failed to extract profile data')
    }
  }

  const handleAddTechnicalSkill = () => {
    if (newSkillName.trim()) {
      setFormData(prev => ({
        ...prev,
        technicalSkills: {
          ...prev.technicalSkills,
          [newSkillName.trim()]: newSkillLevel
        }
      }))
      setNewSkillName('')
      setNewSkillLevel(5)
    }
  }

  const handleRemoveTechnicalSkill = (skillName) => {
    setFormData(prev => {
      const newSkills = { ...prev.technicalSkills }
      delete newSkills[skillName]
      return { ...prev, technicalSkills: newSkills }
    })
  }

  const handleAddSoftSkill = () => {
    if (newSoftSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        softSkills: [...prev.softSkills, newSoftSkill.trim()]
      }))
      setNewSoftSkill('')
    }
  }

  const handleRemoveSoftSkill = (index) => {
    setFormData(prev => ({
      ...prev,
      softSkills: prev.softSkills.filter((_, i) => i !== index)
    }))
  }

  const handleAddCompany = () => {
    if (newCompany.trim()) {
      setFormData(prev => ({
        ...prev,
        pastCompanies: [...prev.pastCompanies, newCompany.trim()]
      }))
      setNewCompany('')
    }
  }

  const handleRemoveCompany = (index) => {
    setFormData(prev => ({
      ...prev,
      pastCompanies: prev.pastCompanies.filter((_, i) => i !== index)
    }))
  }

  const handleAddCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }))
      setNewCertification('')
    }
  }

  const handleRemoveCertification = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }))
  }

  const handleAddTenure = () => {
    const tenure = parseFloat(newTenure)
    if (!isNaN(tenure) && tenure > 0) {
      setFormData(prev => ({
        ...prev,
        jobTenureYears: [...prev.jobTenureYears, tenure]
      }))
      setNewTenure('')
    }
  }

  const handleRemoveTenure = (index) => {
    setFormData(prev => ({
      ...prev,
      jobTenureYears: prev.jobTenureYears.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    try {
      await submitManualData(formData).unwrap()
      dispatch(setManualData(formData))
      toast.success('Profile data saved successfully!')
      navigate('/radar')
    } catch (error) {
      toast.error('Failed to save profile data')
    }
  }

  if (isExtracting) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-lg text-gray-600">Extracting profile data from your CV...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Review Your Profile</h1>
        <p className="mt-2 text-gray-600">
          Review and edit the extracted information before generating your radar chart
        </p>
      </div>

      <div className="space-y-6">
        {/* Years of Experience */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Years of Experience</h3>
          <input
            type="number"
            min="0"
            max="50"
            value={formData.yearsOfExperience}
            onChange={(e) => setFormData(prev => ({ ...prev, yearsOfExperience: parseInt(e.target.value) || 0 }))}
            className="input w-32"
          />
        </div>

        {/* Technical Skills */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Technical Skills</h3>

          <div className="space-y-3 mb-4">
            {Object.entries(formData.technicalSkills).map(([skill, level]) => (
              <div key={skill} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700 min-w-0 flex-1">{skill}</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={level}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    technicalSkills: {
                      ...prev.technicalSkills,
                      [skill]: parseInt(e.target.value)
                    }
                  }))}
                  className="w-24"
                />
                <span className="text-sm text-gray-500 w-8">{level}/10</span>
                <button
                  onClick={() => handleRemoveTechnicalSkill(skill)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Skill name"
              value={newSkillName}
              onChange={(e) => setNewSkillName(e.target.value)}
              className="input flex-1"
            />
            <input
              type="range"
              min="1"
              max="10"
              value={newSkillLevel}
              onChange={(e) => setNewSkillLevel(parseInt(e.target.value))}
              className="w-24"
            />
            <span className="text-sm text-gray-500 w-8">{newSkillLevel}/10</span>
            <button
              onClick={handleAddTechnicalSkill}
              disabled={!newSkillName.trim()}
              className="btn btn-primary"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Soft Skills */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Soft Skills</h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {formData.softSkills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
              >
                {skill}
                <button
                  onClick={() => handleRemoveSoftSkill(index)}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  <FiTrash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Add soft skill"
              value={newSoftSkill}
              onChange={(e) => setNewSoftSkill(e.target.value)}
              className="input flex-1"
            />
            <button
              onClick={handleAddSoftSkill}
              disabled={!newSoftSkill.trim()}
              className="btn btn-primary"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Education */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Education</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                College/University Name
              </label>
              <input
                type="text"
                value={formData.education.collegeName}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  education: { ...prev.education, collegeName: e.target.value }
                }))}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                College Tier (1-10)
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.education.tier}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  education: { ...prev.education, tier: parseInt(e.target.value) }
                }))}
                className="input"
              />
              <div className="text-sm text-gray-500 mt-1">
                {formData.education.tier}/10
              </div>
            </div>
          </div>
        </div>

        {/* Past Companies */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Past Companies</h3>

          <div className="space-y-2 mb-4">
            {formData.pastCompanies.map((company, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">{company}</span>
                <button
                  onClick={() => handleRemoveCompany(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Company name"
              value={newCompany}
              onChange={(e) => setNewCompany(e.target.value)}
              className="input flex-1"
            />
            <button
              onClick={handleAddCompany}
              disabled={!newCompany.trim()}
              className="btn btn-primary"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Certifications */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Certifications & Awards</h3>

          <div className="space-y-2 mb-4">
            {formData.certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">{cert}</span>
                <button
                  onClick={() => handleRemoveCertification(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FiTrash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Certification or award"
              value={newCertification}
              onChange={(e) => setNewCertification(e.target.value)}
              className="input flex-1"
            />
            <button
              onClick={handleAddCertification}
              disabled={!newCertification.trim()}
              className="btn btn-primary"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Job Tenure */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Job Tenure (Years)</h3>

          <div className="flex flex-wrap gap-2 mb-4">
            {formData.jobTenureYears.map((tenure, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                {tenure} years
                <button
                  onClick={() => handleRemoveTenure(index)}
                  className="ml-2 text-green-600 hover:text-green-800"
                >
                  <FiTrash2 className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="number"
              min="0"
              step="0.5"
              placeholder="Years (e.g., 2.5)"
              value={newTenure}
              onChange={(e) => setNewTenure(e.target.value)}
              className="input w-32"
            />
            <button
              onClick={handleAddTenure}
              disabled={!newTenure || isNaN(parseFloat(newTenure))}
              className="btn btn-primary"
            >
              <FiPlus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => navigate('/upload')}
            className="btn btn-secondary"
          >
            Back to Upload
          </button>
          <button
            onClick={handleSubmit}
            className="btn btn-primary flex items-center space-x-2"
          >
            <FiCheck className="h-4 w-4" />
            <span>Save & Continue</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileReviewPage