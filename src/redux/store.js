import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import authReducer from '../features/authSlice/authSlice';
import productReducer from '../features/product/ProductsSlice';
import chatReducer from '../features/newChat/NewChatSlice';
import messagesReducer from '../features/messagesByChatIdSlice/MessagesByChatIdSlice';
import chatsByIdReducer from '../features/chatsByUserId/ChatsByUserIdSlice';
import lastMessagesReducer from '../features/lastMessages/LastMessagesSlice';
import transactionsReducer from '../features/transactionSlice/TransactionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    chat: chatReducer,
    chatsById: chatsByIdReducer,
    lastMessages: lastMessagesReducer,
    message: messagesReducer,
    transactions: transactionsReducer
  },
  middleware: [...getDefaultMiddleware(), thunk, logger],
});
