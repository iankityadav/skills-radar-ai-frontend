import React from 'react'
import { FiGithub } from 'react-icons/fi'

const LoginPage = () => {
  const handleGitHubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/github`
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center">
            <FiGithub className="h-6 w-6 text-white" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to Radar Chart AI
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Generate beautiful radar chart profiles from your CV using AI
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-white py-8 px-6 shadow-lg rounded-lg">
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Get Started
                </h3>
                <p className="text-sm text-gray-500 mb-6">
                  Sign in with your GitHub account to create your professional profile
                </p>
              </div>

              <button
                onClick={handleGitHubLogin}
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
              >
                <FiGithub className="h-5 w-5 mr-2" />
                Continue with GitHub
              </button>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xs text-gray-500 space-y-2">
              <p>By signing in, you agree to our Terms of Service</p>
              <div className="flex justify-center space-x-4">
                <span>🔒 Secure</span>
                <span>⚡ Fast</span>
                <span>🎯 AI-Powered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage