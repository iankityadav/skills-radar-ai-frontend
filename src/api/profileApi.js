import { baseApi } from './baseApi'

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadCV: builder.mutation({
      query: (formData) => ({
        url: '/api/upload-cv',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Profile'],
    }),
    extractProfile: builder.mutation({
      query: (cvText) => ({
        url: '/api/extract-profile',
        method: 'POST',
        body: { cvText },
      }),
      invalidatesTags: ['Profile'],
    }),
    submitManualData: builder.mutation({
      query: (manualData) => ({
        url: '/api/submit-manual-data',
        method: 'POST',
        body: manualData,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const {
  useUploadCVMutation,
  useExtractProfileMutation,
  useSubmitManualDataMutation,
} = profileApi