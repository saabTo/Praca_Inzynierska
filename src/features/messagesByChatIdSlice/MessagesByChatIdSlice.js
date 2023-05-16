import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messages: [],
  isLoading: false,
  error: null,
};

export const fetchMessagesByChatId = createAsyncThunk(
  'messages/fetchByChatId',
  async (chatId) => {
    const response = await axios.get(`http://localhost:4200/messages/${chatId}`);
    return response.data;
  }
);

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesByChatId.fulfilled, (state, action) => {
        state.messages = action.payload;
      });
  },
});

export default messagesSlice.reducer;