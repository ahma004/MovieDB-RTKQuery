import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const moviesApi = createApi({
  reducerPath: 'movies',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.themoviedb.org/3/'
  }),
  endpoints(builder) {
    return {
      // Dit eksisterende endpoint
      fetchPopularMovies: builder.query({
        query: () => {
          return {
            url: 'discover/movie',
            params: {
              sort_by: 'popularity.desc',
              api_key: '81c50c197b83129dd4fc387ca6c8c323'
            },
            method: 'GET',
          };
        },
      }), // <-- HUSK KOMMAET HER!
      
      // NYT: Endpoint til de højest bedømte film
      fetchHighestRatedMovies: builder.query({
        query: () => {
          return {
            url: 'discover/movie',
            params: {
              sort_by: 'vote_average.desc', // Her ændrer vi sorteringen!
              api_key: '81c50c197b83129dd4fc387ca6c8c323'
            },
            method: 'GET',
          };
        },
      }), 

      // NYT ENDPOINT TIL SØGNING
      fetchSearchMovie: builder.query({
        // Bemærk: Her tager funktionen imod et argument (searchTerm)
        query: (searchTerm) => { 
          return {
            url: 'search/movie', // Ny URL til søgning
            params: {
              query: searchTerm, // Her sender vi brugerens tekst afsted
              api_key: '81c50c197b83129dd4fc387ca6c8c323'
            },
            method: 'GET',
          };
        },
      }),


      fetchUpcomingMovies: builder.query({
        query: () => {
          return {
            url: 'movie/upcoming', // Den korrekte URL til kommende film på TheMovieDB
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323'
            },
            method: 'GET',
          };
        },
      }),

      // NYT: Hent videoer for en specifik film
      fetchMovieVideos: builder.query({
        query: (movieId) => { // Vi tager imod et specifikt film-ID
          return {
            url: `movie/${movieId}/videos`, // Læg mærke til ` backticks ` her i stedet for normale anførselstegn!
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323'
            },
            method: 'GET',
          };
        },
      }),
      // NYT: Hent TV-data
      fetchPopularTV: builder.query({
        query: () => {
          return {
            url: 'tv/popular', // Her henter vi TV-data i stedet for film
            params: {
              api_key: '81c50c197b83129dd4fc387ca6c8c323'
            },
            method: 'GET',
          };
        },
      }),
    };
  },
});

// HUSK AT OPDATERE EKSPORTEN I BUNDEN:
export const { 
  useFetchPopularMoviesQuery, 
  useFetchHighestRatedMoviesQuery,
  useFetchSearchMovieQuery, // NYT HOOK!
  useFetchUpcomingMoviesQuery, // NYT HOOK!
  useFetchMovieVideosQuery,
  useFetchPopularTVQuery
} = moviesApi;
export { moviesApi };