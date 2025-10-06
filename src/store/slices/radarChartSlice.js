import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  radarData: null,
  profileSummary: null,
  isGenerating: false,
  generationError: null,
  chartConfig: null
}

const radarChartSlice = createSlice({
  name: 'radarChart',
  initialState,
  reducers: {
    setRadarData: (state, action) => {
      state.radarData = action.payload.radarData
      state.profileSummary = action.payload.profileSummary
    },
    setGenerating: (state, action) => {
      state.isGenerating = action.payload
    },
    setGenerationError: (state, action) => {
      state.generationError = action.payload
    },
    setChartConfig: (state, action) => {
      state.chartConfig = action.payload
    },
    clearRadarChart: (state) => {
      state.radarData = null
      state.profileSummary = null
      state.isGenerating = false
      state.generationError = null
    }
  }
})

export const {
  setRadarData,
  setGenerating,
  setGenerationError,
  setChartConfig,
  clearRadarChart
} = radarChartSlice.actions

export default radarChartSlice.reducer