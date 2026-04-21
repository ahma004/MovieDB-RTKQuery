import { createSlice } from '@reduxjs/toolkit';

const searchMovieSlice = createSlice({
  name: 'searchMovie', // Navnet på skuffen
  initialState: {
    searchTerm: '' // Til at starte med er søgefeltet tomt
  },
  reducers: {
    // Dette er funktionen ("kokken"), der ændrer søgeordet, når brugeren taster
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    }
  }
});

// Vi eksporterer handlingen og selve reduceren
export const { changeSearchTerm } = searchMovieSlice.actions;
export const searchMovieReducer = searchMovieSlice.reducer;