import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useCheckAuthQuery } from './api/authApi'
import { setCredentials, logout } from './store/slices/authSlice'

// Components
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import LoadingSpinner from './components/LoadingSpinner'

// Pages
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import UploadPage from './pages/UploadPage'
import ProfileReviewPage from './pages/ProfileReviewPage'
import RadarChartPage from './pages/RadarChartPage'
import SharedProfilePage from './pages/SharedProfilePage'
import NotFoundPage from './pages/NotFoundPage'

function App() {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector((state) => state.auth)

  const { data: authData, isLoading, error } = useCheckAuthQuery()

  useEffect(() => {
    if (authData?.authenticated && authData?.user) {
      dispatch(setCredentials({ user: authData.user }))
    } else if (error) {
      dispatch(logout())
    }
  }, [authData, error, dispatch])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />
        } />

        <Route path="/share/:profileId" element={<SharedProfilePage />} />

        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="upload" element={<UploadPage />} />
          <Route path="review" element={<ProfileReviewPage />} />
          <Route path="radar" element={<RadarChartPage />} />
        </Route>

        {/* Catch all route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App