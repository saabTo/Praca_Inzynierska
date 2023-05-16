import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getChatsByUserId = createAsyncThunk(
    'chats/getChatsByUserId',
    async (_, { rejectWithValue }) => {
      try {
        const userString = sessionStorage.getItem('user');
        const userObject = JSON.parse(userString);
        const userId = userObject.userId;
  
        const response = await axios.get(`/chats/${userId}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
const chatsByIdSlice = createSlice({
  name: 'chatsById',
  initialState: {
    chats: [],
  },
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getChatsByUserId.fulfilled, (state, action) => {
        state.chats = action.payload;
      });
  },
});
export const { setChatId } = chatsByIdSlice.actions;
export default chatsByIdSlice.reducer;