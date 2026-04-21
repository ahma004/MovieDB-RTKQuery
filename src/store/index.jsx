import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { moviesApi } from './apis/moviesApi';
// NYT: 1. Vi skal importere reduceren fra vores nye slice
import { searchMovieReducer } from './slices/searchMovieSlice'; 
import { favoritesApi } from './apis/favoritesApi'; // NY IMPORT

export const store = configureStore({
  reducer: {
    [moviesApi.reducerPath]: moviesApi.reducer,
    [favoritesApi.reducerPath]: favoritesApi.reducer, // NYT: Skuffe til favoritter
    
    // NYT: 2. Vi skal tilføje skuffen til vores arkivskab!
    searchMovie: searchMovieReducer 
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(moviesApi.middleware)
      .concat(favoritesApi.middleware);
  }
});

setupListeners(store.dispatch);

export { 
  useFetchPopularMoviesQuery, 
  useFetchHighestRatedMoviesQuery,
  useFetchSearchMovieQuery,
  useFetchUpcomingMoviesQuery,
  useFetchMovieVideosQuery,
  useFetchPopularTVQuery
} from './apis/moviesApi';

export { 
  useFetchFavoritesQuery, 
  useAddFavoriteMutation, 
  useRemoveFavoriteMutation 
} from './apis/favoritesApi'; // NYT: Eksporter favorit-hooks

export { changeSearchTerm } from './slices/searchMovieSlice';