import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await axios.get('/transactions/getTransaction');
    return response.data;
  }
);

export const postTransaction = createAsyncThunk(
    'transactions/postTransaction',
    async ({ message, userId, chat }) => {
      const response = await axios.post('http://localhost:4200/transactions/postTransaction', {
        message,
        userId,
        chat,
      });
      return response.data;
    }
  );
const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(postTransaction.fulfilled, (state, action) => {
        state.transactions.push(action.payload);
      });
  }
});

export default transactionsSlice.reducer;
