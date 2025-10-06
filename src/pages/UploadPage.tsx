import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useUploadCVMutation } from '../api/profileApi'
import { setFile, setCvText, setUploading, setUploadError } from '../store/slices/cvUploadSlice'
import { FiUpload, FiFile, FiAlertCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import LoadingSpinner from '../components/LoadingSpinner'

const UploadPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const { fileName, fileSize, cvText, isUploading, uploadError } = useSelector(state => state.cvUpload)
  const [uploadCV] = useUploadCVMutation()
  const [dragActive, setDragActive] = useState(false)

  const maxFileSize = 300 * 1024 // 300KB

  const handleFileSelect = (file) => {
    if (!file) return

    // Validate file type
    const allowedTypes = ['application/pdf', 'text/plain', 'application/msword']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a PDF, TXT, or DOC file')
      return
    }

    // Validate file size
    if (file.size > maxFileSize) {
      toast.error(`File size must be less than ${maxFileSize / 1024}KB`)
      return
    }

    dispatch(setFile({
      file,
      fileName: file.name,
      fileSize: file.size
    }))
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    handleFileSelect(file)
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const file = e.dataTransfer.files[0]
    handleFileSelect(file)
  }

  const handleUpload = async () => {
    if (!fileName) {
      toast.error('Please select a file first')
      return
    }

    const formData = new FormData()
    formData.append('cvFile', fileInputRef.current.files[0])

    dispatch(setUploading(true))
    dispatch(setUploadError(null))

    try {
      const result = await uploadCV(formData).unwrap()
      dispatch(setCvText(result.cvText))
      toast.success('CV uploaded and processed successfully!')
      navigate('/review')
    } catch (error) {
      const errorMessage = error?.data?.error || 'Upload failed'
      dispatch(setUploadError(errorMessage))
      toast.error(errorMessage)
    } finally {
      dispatch(setUploading(false))
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Upload Your CV</h1>
        <p className="mt-2 text-gray-600">
          Upload your CV file to extract profile information using AI
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* File Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive
              ? 'border-primary-400 bg-primary-50'
              : fileName
              ? 'border-green-300 bg-green-50'
              : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.txt,.doc,.docx"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            disabled={isUploading}
          />

          <div className="space-y-4">
            {fileName ? (
              <>
                <FiFile className="mx-auto h-12 w-12 text-green-600" />
                <div>
                  <p className="text-lg font-medium text-gray-900">{fileName}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(fileSize)} - Ready to upload
                  </p>
                </div>
              </>
            ) : (
              <>
                <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drop your CV here, or click to browse
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF, TXT, DOC files up to 300KB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Error Message */}
        {uploadError && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <FiAlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <p className="text-sm text-red-700">{uploadError}</p>
            </div>
          </div>
        )}

        {/* CV Text Preview */}
        {cvText && (
          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Extracted Text Preview
            </h3>
            <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
                {cvText.slice(0, 1000)}
                {cvText.length > 1000 && '...'}
              </pre>
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={() => {
              dispatch(setFile({ file: null, fileName: '', fileSize: 0 }))
              dispatch(setCvText(''))
              if (fileInputRef.current) {
                fileInputRef.current.value = ''
              }
            }}
            className="btn btn-secondary"
            disabled={isUploading || !fileName}
          >
            Clear
          </button>

          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading || !fileName}
            className="btn btn-primary flex items-center space-x-2"
          >
            {isUploading ? (
              <>
                <LoadingSpinner size="small" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <FiUpload className="h-4 w-4" />
                <span>Upload & Process</span>
              </>
            )}
          </button>
        </div>

        {/* File Requirements */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="text-sm font-medium text-blue-900 mb-2">
            File Requirements:
          </h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Supported formats: PDF, TXT, DOC</li>
            <li>• Maximum file size: 300KB</li>
            <li>• Text should be readable (not scanned images)</li>
            <li>• Include relevant professional information</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default UploadPage