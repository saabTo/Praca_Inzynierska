import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getLastMessageByChat = createAsyncThunk(
  'chats/getLastMessageByChat',
  async ({ chatId }, { rejectWithValue }) => {
    try {
      const userString = sessionStorage.getItem('user');
      const userObject = JSON.parse(userString);
      const userId = userObject.userId;
  
      const response = await axios.get(`/chats/${userId}/${chatId}/lastMessage`);
      return { chatId, lastMessage: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const markMessageAsRead = createAsyncThunk(
  'lastMessages/markMessageAsRead',
  async ({ chatId, messageId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/chats/${chatId}/messages/${messageId}/read`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const lastMessagesSlice = createSlice({
  name: 'lastMessages',
  initialState: {
    lastMessages: {},
  },
  reducers: {
    // dodajemy reducer, który będzie oznaczał wiadomość jako przeczytaną
    markAsRead: (state, action) => {
      const { chatId, messageId } = action.payload;
      if (state.lastMessages[chatId]) {
        state.lastMessages[chatId].read = messageId;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLastMessageByChat.fulfilled, (state, action) => {
        const { chatId, lastMessage } = action.payload;
        state.lastMessages[chatId] = lastMessage;
      })
      .addCase(markMessageAsRead.fulfilled, (state, action) => {
        // nic nie robimy, ponieważ oznaczenie wiadomości jako przeczytanej odbyło się już w reducerze 'markAsRead'
      });
  },
});

export const { markAsRead } = lastMessagesSlice.actions;
export default lastMessagesSlice.reducer;
