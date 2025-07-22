import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const uploadExcel = createAsyncThunk('file/uploadExcel', async (fileData, thunkAPI) => {
  try {
    const res = await axios.post('/api/files/upload', fileData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const fileSlice = createSlice({
  name: 'file',
  initialState: {
    uploadedData: null,
    isLoading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadExcel.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadExcel.fulfilled, (state, action) => {
        state.isLoading = false;
        state.uploadedData = action.payload;
      })
      .addCase(uploadExcel.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  }
});

export default fileSlice.reducer;
