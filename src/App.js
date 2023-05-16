import React, { useEffect, useState }  from 'react';
import { ThemeProvider } from '@mui/material';
import {theme} from './styles/theme/theme';
import './App.css';
import Layout from './components/layout/Layout';
import LoginPage from './components/pages/LoginPage';
import ProductPage from './components/pages/ProductPage';
import SignUpPage from './components/pages/SignUpPage';
import {BrowserRouter as Router ,Route,Routes,Navigate, useParams} from "react-router-dom";
import Header from './components/header/Header';
import { useAuthContext } from './hooks/useAuthContext';
import MineProductPage from './components/pages/MainProductPage';
import './firebase';
import UserChat from './components/chat/UserChat';
import { useSelector } from 'react-redux';
import ChatList from './components/chatList/ChatList';


export const TestContext = React.createContext(null);

function App() {

  const [token, setToken] = useState(null);


  const [backendData, setBackendData] = useState('');
  const [session, setSession] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const {user, isAdmin} = useAuthContext();   
  const chatId = useSelector(state=>state.chat.chatId) 


  useEffect(()=>{
    fetch("/api").then(
      response => response.json([{}])
    ).then(
      data =>{
        setBackendData(data)
      }
    )
  },[])

//sprawdzenie czy użytkownik jest zalogowany (czy w sesji mamy dane)

useEffect(()=>{
  if(session == null){
    setIsLogged(false);
  }else{
    setIsLogged(true);
  }
},[]);


  return (
    <div className="App">
    <TestContext.Provider value={{token: token, setToken: setToken}}>
      <ThemeProvider theme={theme}>
      <Header/>
        <Router>
          <Routes>
            <Route path='/' element={<Layout/>}/>  
            {/* <AuthProvider>
            </AuthProvider> */}
            <Route path='/login'  element={!user && <LoginPage/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/product' element={ <ProductPage/>}/> 
            <Route path={`/mineProducts`} element={<MineProductPage/>}/>
            <Route path={`/newChat/:chatId`} element={<UserChat/>}/>
            <Route path='*' element={<ChatList/>}/>
          </Routes>  
        </Router>  
        </ThemeProvider> 
      </TestContext.Provider>
    </div>
  );
}

export default App;
