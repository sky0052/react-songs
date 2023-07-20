import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi ({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://spotify23.p.rapidapi.com',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '38fcb97ad4msh37359277ccb8c4fp165f06jsnd4e7287bdde0')
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getAlbums: builder.query({ query: (ids) => `/albums/?ids=${ids}` }),
    searchTracks: builder.query({
      query: ({ q, type, offset, limit, numberOfTopResults }) =>
        `/search/?q=${q}&type=${type}&offset=${offset}&limit=${limit}&numberOfTopResults=${numberOfTopResults}`,
    }),
    searchArtists: builder.query({
      query: ({ artistName, limit }) =>
        `/search/?q=${encodeURIComponent(artistName)}&type=artists&limit=${limit}`,
    }),
  })
});

export const { useGetAlbumsQuery, useSearchArtistsQuery } = shazamCoreApi;

export default shazamCoreApi;
