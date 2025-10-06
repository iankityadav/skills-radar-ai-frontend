import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  extractedProfile: null,
  manualData: null,
  finalProfile: null,
  isExtracting: false,
  extractionError: null,
  isSubmittingManual: false,
  manualSubmissionError: null
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setExtractedProfile: (state, action) => {
      state.extractedProfile = action.payload
      state.finalProfile = action.payload
    },
    setManualData: (state, action) => {
      state.manualData = action.payload
      // Merge manual data with extracted profile
      state.finalProfile = {
        ...state.extractedProfile,
        ...action.payload
      }
    },
    setExtracting: (state, action) => {
      state.isExtracting = action.payload
    },
    setExtractionError: (state, action) => {
      state.extractionError = action.payload
    },
    setSubmittingManual: (state, action) => {
      state.isSubmittingManual = action.payload
    },
    setManualSubmissionError: (state, action) => {
      state.manualSubmissionError = action.payload
    },
    clearProfile: (state) => {
      state.extractedProfile = null
      state.manualData = null
      state.finalProfile = null
      state.isExtracting = false
      state.extractionError = null
      state.isSubmittingManual = false
      state.manualSubmissionError = null
    }
  }
})

export const {
  setExtractedProfile,
  setManualData,
  setExtracting,
  setExtractionError,
  setSubmittingManual,
  setManualSubmissionError,
  clearProfile
} = profileSlice.actions

export default profileSlice.reducer