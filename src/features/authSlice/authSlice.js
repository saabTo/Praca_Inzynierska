// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   error: null,
// };

// const auth = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginSuccess: (state, action) => {
//         state.isAuthenticated = true;
//         state.user = action.payload;
//         sessionStorage.setItem('isAuthenticated', true);
//         sessionStorage.setItem('user', JSON.stringify(action.payload));
//       },    
//     loginFailure: (state, action) => {
//       state.error = action.payload;
//     },
//     logout: state => {
//         state.isAuthenticated = false;
//         state.user = null;
//         sessionStorage.removeItem('isAuthenticated');
//       sessionStorage.removeItem('user');
//       },
//   },
// });

// export const { loginSuccess, loginFailure, logout } = auth.actions;

// export default auth.reducer;
