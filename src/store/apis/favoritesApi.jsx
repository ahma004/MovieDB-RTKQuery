import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const favoritesApi = createApi({
  reducerPath: 'favorites',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3005' // Vores lokale server
  }),
  tagTypes: ['Favorite'], // Tags hjælper med at opdatere listen automatisk
  endpoints(builder) {
    return {
      fetchFavorites: builder.query({
        providesTags: ['Favorite'],
        query: () => '/favorites',
      }),
      addFavorite: builder.mutation({
        invalidatesTags: ['Favorite'], // Sletter gammel cache, så listen hentes på ny
        query: (movie) => ({
          url: '/favorites',
          method: 'POST',
          body: movie,
        }),
      }),
      removeFavorite: builder.mutation({
        invalidatesTags: ['Favorite'],
        query: (movie) => ({
          url: `/favorites/${movie.id}`,
          method: 'DELETE',
        }),
      }),
    };
  },
});

export const { 
  useFetchFavoritesQuery, 
  useAddFavoriteMutation, 
  useRemoveFavoriteMutation 
} = favoritesApi;
export { favoritesApi };