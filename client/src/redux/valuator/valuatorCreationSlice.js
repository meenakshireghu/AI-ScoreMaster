import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  valuators: [],
  error: null,
  loading: false,
};

const valuatorSlice = createSlice({
  name: 'valuator',
  initialState,
  reducers: {
    createValuatorStart: (state) => {
      state.loading = true;
    },
    createValuatorSuccess: (state, action) => {
      state.valuators.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    createValuatorFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteValuatorStart: (state) => {
      state.loading = true;
    },
    deleteValuatorSuccess: (state, action) => {
      state.valuators = state.valuators.filter((valuator) => valuator.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteValuatorFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Action for uploading question paper
    uploadQuestionPaperStart: (state) => {
      state.loading = true;
    },
    uploadQuestionPaperSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    uploadQuestionPaperFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    // Action for uploading answer key
    uploadAnswerKeyStart: (state) => {
      state.loading = true;
    },
    uploadAnswerKeySuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    uploadAnswerKeyFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  createValuatorStart,
  createValuatorSuccess,
  createValuatorFailure,
  deleteValuatorStart,
  deleteValuatorSuccess,
  deleteValuatorFailure,
  uploadQuestionPaperStart,
  uploadQuestionPaperSuccess,
  uploadQuestionPaperFailure,
  uploadAnswerKeyStart,
  uploadAnswerKeySuccess,
  uploadAnswerKeyFailure,
} = valuatorSlice.actions;

export default valuatorSlice.reducer;
