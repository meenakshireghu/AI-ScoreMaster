import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  answerSheet: [],
  isUploading: false,
  error: null,
};

const answerSheetSlice = createSlice({
  name: 'answerSheet',
  initialState,
  reducers: {
    setanswerSheet: (state, action) => {
      state.answerSheet = action.payload;
    },
    uploadanswerSheetStart: (state) => {
      state.isUploading = true;
    },
    uploadanswerSheetSuccess: (state) => {
      state.isUploading = false;
      state.error = null;
      state.answerSheet = []; // Clear answer sheet after successful upload
    },
    uploadanswerSheetFailure: (state, action) => {
      state.isUploading = false;
      state.error = action.payload;
    },
    clearanswerSheet: (state) => {
      state.answerSheet = [];
    },
  },
});

export const {
  setanswerSheet,
  uploadanswerSheetStart,
  uploadanswerSheetSuccess,
  uploadanswerSheetFailure,
  clearanswerSheet,
} = answerSheetSlice.actions;

export default answerSheetSlice.reducer;
