import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sharedProfile: null,
  shareableLink: null,
  isGeneratingLink: false,
  linkGenerationError: null,
  isLoadingShared: false,
  sharedLoadError: null
}

const shareSlice = createSlice({
  name: 'share',
  initialState,
  reducers: {
    setShareableLink: (state, action) => {
      state.shareableLink = action.payload
    },
    setGeneratingLink: (state, action) => {
      state.isGeneratingLink = action.payload
    },
    setLinkGenerationError: (state, action) => {
      state.linkGenerationError = action.payload
    },
    setSharedProfile: (state, action) => {
      state.sharedProfile = action.payload
    },
    setLoadingShared: (state, action) => {
      state.isLoadingShared = action.payload
    },
    setSharedLoadError: (state, action) => {
      state.sharedLoadError = action.payload
    },
    clearShare: (state) => {
      state.sharedProfile = null
      state.shareableLink = null
      state.isGeneratingLink = false
      state.linkGenerationError = null
      state.isLoadingShared = false
      state.sharedLoadError = null
    }
  }
})

export const {
  setShareableLink,
  setGeneratingLink,
  setLinkGenerationError,
  setSharedProfile,
  setLoadingShared,
  setSharedLoadError,
  clearShare
} = shareSlice.actions

export default shareSlice.reducer