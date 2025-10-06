import { baseApi } from './baseApi'

export const radarApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    generateRadarScores: builder.mutation({
      query: (profile) => ({
        url: '/api/generate-radar-scores',
        method: 'POST',
        body: { profile },
      }),
      invalidatesTags: ['RadarChart'],
    }),
    getRadarConfig: builder.query({
      query: () => '/api/radar-config',
      providesTags: ['RadarChart'],
    }),
  }),
})

export const {
  useGenerateRadarScoresMutation,
  useGetRadarConfigQuery,
} = radarApi