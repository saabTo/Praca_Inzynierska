import React, { useEffect } from 'react'
import { createContext, useReducer } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      if (action.payload._id === 'admin') {
        // jeśli zalogowany użytkownik to administrator, ustaw isAdmin na true,
        // a wartość user na obiekt reprezentujący tylko administratora
        return { user: null, isAdmin: true };
      } else {
        // w przeciwnym przypadku ustaw wartości user i isAdmin na podstawie zalogowanego użytkownika
        return { user: action.payload, isAdmin: false };
      }
    case 'LOGOUT':
      return { user: null, isAdmin: false };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    isAdmin: false
  })

  console.log('AuthContext state:', state)

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user._id === "admin") {
          dispatch({ type: 'LOGIN', payload: null }); // ustawienie user na null dla admina
          dispatch({ type: "SET_ADMIN_FLAG", payload: true });
        } else {
          dispatch({ type: 'LOGIN', payload: user });
          dispatch({ type: "SET_ADMIN_FLAG", payload: false }); // dla pozostałych użytkowników ustaw flagę isAdmin na false
        }
      }
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
    }
  }, []);
  

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}
