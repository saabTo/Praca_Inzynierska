import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css"
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, Sidebar, Search, Conversation, ConversationList,ConversationHeader, MessageSeparator } from '@chatscope/chat-ui-kit-react';
import { useSelector } from 'react-redux';
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';
import { firebaseConfig } from '../../firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { useParams } from 'react-router';
import ChatList from '../chatList/ChatList';
import { Alert } from '@mui/material';
import Transaction from '../transaction/Transaction';
import '../chat/UserChat.css';

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

const UserChat = () => {
  const [messageValue, setMessageValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]); // dodany stan przechowujący listę konwersacji
  const [ messagesByChatId, setMessagesByChatId] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const getUserFromLocalStorage = sessionStorage.getItem('user');
  const userObject = JSON.parse(getUserFromLocalStorage);
  const userId = userObject.userId;
  const userEmail = userObject.email;
  // const chat = useSelector((state)=>state.chat.chatId);
  const {chatId} = useParams();
  const [open, setOpen] = useState(true);
  const chats = useSelector(state => state.chatsById.chats);
  const chat = chats.find(chat => chat.chatId === chatId);
  const giverUserId = chat ? chat.giverUserId : '';

  useEffect(()=>{
    axios.get(`/messages/${chatId}`)
      .then(response =>{
        setMessagesByChatId(response.data);
      })
      .catch(error => {
        console.error(error);
      })
    axios.get(`/messages/${chatId}/${userId}/mark`)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  },[chatId]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const updatedMessages = await axios.get(`/messages/${chatId}`);
        setMessagesByChatId(updatedMessages.data);
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    return () => clearInterval(intervalId); // wyczyszczenie interwału przed odmontowaniem komponentu
  }, [chatId]);
  const sendNotification = (message) => {
    const payload = {
      notification: {
        title: 'Nowa wiadomość',
        body: message,
        click_action: `/`,
      },
    };

    messaging
      .getToken()
      .then((token) => {
        return messaging.sendToDevice(token, payload);
      })
      .catch((error) => {
        console.error('Unable to send notification:', error);
      });
  };
  const sendMessage = async () => {
    try {
      const message = { text: messageValue, senderId: userId, chatId: chatId };
      const response = await axios.post('http://localhost:4200/messages', message);
      const newMessage = response.data;
      setMessages([...messages, newMessage]);
      sendNotification(newMessage.text);
      setMessageValue('');

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ position: "relative", height: "600px" }}>
    <div style={{ marginLeft: '10%', marginRight: '10%', height: '100%' }}>
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Back />
            <ConversationHeader.Content
              userName={`Czat z użytkownikiem: ${giverUserId}`}
            />
          </ConversationHeader>
          <MessageList>
            {messagesByChatId.map((message, index) => (
              <Message
                key={index}
                model={{
                  message: message.text,
                  sentTime: message.sentTime,
                  sender: message.senderId,
                  direction: message.senderId === userId ? 'outgoing' : 'incoming',
                  
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder='Napisz wiadomość...'
            value={messageValue}
            onChange={val => setMessageValue(val)}
            onSend={sendMessage}
          />
        </ChatContainer>
      </MainContainer>
      <Transaction />
    </div>
  </div>
  

  );
}

export default UserChat;
