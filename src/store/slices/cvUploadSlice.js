import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  file: null,
  fileName: '',
  fileSize: 0,
  cvText: '',
  isUploading: false,
  uploadError: null
}

const cvUploadSlice = createSlice({
  name: 'cvUpload',
  initialState,
  reducers: {
    setFile: (state, action) => {
      state.file = action.payload.file
      state.fileName = action.payload.fileName
      state.fileSize = action.payload.fileSize
    },
    setCvText: (state, action) => {
      state.cvText = action.payload
    },
    setUploading: (state, action) => {
      state.isUploading = action.payload
    },
    setUploadError: (state, action) => {
      state.uploadError = action.payload
    },
    clearUpload: (state) => {
      state.file = null
      state.fileName = ''
      state.fileSize = 0
      state.cvText = ''
      state.isUploading = false
      state.uploadError = null
    }
  }
})

export const { 
  setFile, 
  setCvText, 
  setUploading, 
  setUploadError, 
  clearUpload 
} = cvUploadSlice.actions

export default cvUploadSlice.reducer