import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome, FiArrowLeft } from 'react-icons/fi'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Page not found</h2>
          <p className="mt-2 text-gray-600">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/"
            className="btn btn-primary flex items-center justify-center space-x-2"
          >
            <FiHome className="h-4 w-4" />
            <span>Go to Dashboard</span>
          </Link>

          <button
            onClick={() => window.history.back()}
            className="btn btn-outline flex items-center justify-center space-x-2 w-full"
          >
            <FiArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            If you think this is an error, please{' '}
            <a href="mailto:support@example.com" className="text-primary-600 hover:text-primary-500">
              contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage