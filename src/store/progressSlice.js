import { createSlice } from '@reduxjs/toolkit';

const progressSlice = createSlice({
    name: 'progress',
    initialState: {
      currentPage: 'dashboard',
      view: 'overview',
      formData: {
        farmName: '',
        farmLocation: '',
        isFullTime: '',
        farmBackground: '',
        farmOwnership: '',
        hectaresLeased: '',
        leaseLength: '',
        hectaresOwned: '',
        irrigatedHectares: '',
        drylandHectares: ''
      }
    },
    reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    }
  }
});

export const { setCurrentPage, setView, updateFormData } = progressSlice.actions;
export default progressSlice.reducer;