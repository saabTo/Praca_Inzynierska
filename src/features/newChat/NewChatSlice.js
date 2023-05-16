import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const createChat = createAsyncThunk(
  'chat/createChat',
  async (arg, { rejectWithValue }) => {
    try {
      const getUserFromLocalStorage = sessionStorage.getItem('user');
      const userObject = JSON.parse(getUserFromLocalStorage);
      const userId = userObject.userId;

      const response = await axios.post(`http://localhost:4200/chats/createChat`, {
        giverUserId: arg.userId,
        takerUserId: userId
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    chatId: '',
  },
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload.chatId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createChat.fulfilled, (state, action) => {
        state.chatId = action.payload;
      })
  }
});
export const { setChatId } = chatSlice.actions;
export default chatSlice.reducer;