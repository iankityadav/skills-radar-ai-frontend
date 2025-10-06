import { baseApi } from './baseApi'

export const shareApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createShareableProfile: builder.mutation({
      query: (profileData) => ({
        url: '/api/create-shareable-profile',
        method: 'POST',
        body: profileData,
      }),
      invalidatesTags: ['Share'],
    }),
    getSharedProfile: builder.query({
      query: (profileId) => `/api/shared-profile/${profileId}`,
      providesTags: ['Share'],
    }),
  }),
})

export const {
  useCreateShareableProfileMutation,
  useGetSharedProfileQuery,
} = shareApi