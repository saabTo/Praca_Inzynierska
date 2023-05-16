import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import {IconButton} from '@mui/material';
import {Menu} from '@mui/material';
import {MenuItem} from '@mui/material';
import {ListItemIcon} from '@mui/material';
import {ListItemText} from '@mui/material';
import { Message } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getChatsByUserId } from '../../features/chatsByUserId/ChatsByUserIdSlice';
import { getLastMessageByChat } from '../../features/lastMessages/LastMessagesSlice';
import { setChatId } from '../../features/chatsByUserId/ChatsByUserIdSlice';
import Badge from '@mui/material/Badge';
import {createChat} from '../../features/newChat/NewChatSlice';
import { useParams } from 'react-router';

const useStyles = makeStyles((theme)=>({
    iconButton:{
        color:theme.palette.common.white,
    },
    unreadMessage: {
      fontWeight: 'bold',
  }
}))

const ChatList = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const chatsById = useSelector(state=>state.chatsById.chats);
    const selectChat = chatsById.map((state)=>state.chatId);
    // const chat = useSelector((state)=>state.chat.chatId);
    // const {chatId} = chat;
    const lastMessages = useSelector(state=>state.lastMessages.lastMessages);
    const [selectedChat, setSelectedChat] = useState(null);
    const [notificationsCount, setNotificationsCount] = useState(0); // stan dla liczby powiadomień
    const getUserFromLocalStorage = sessionStorage.getItem('user');
    const userObject = JSON.parse(getUserFromLocalStorage);
    const userId = userObject.userId;
    const {chatId} = useParams();
    const [isRead, setIsRead] = useState(false);

    useEffect(()=>{
        dispatch(getChatsByUserId());
    },[dispatch]);
    
    useEffect(() => {
      chatsById.forEach((chat) => {
        dispatch(getLastMessageByChat({ chatId: chat.chatId }));
      });
    }, [dispatch, chatsById]);
    
    //console.log(lastMessages);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
      };
      // const latest = () =>{
      //   for (const chatId in lastMessages) {
      //     const latestMessage = lastMessages[chatId].lastMessage;
      //     console.log(`Chat ID: ${chatId}, Latest message: ${latestMessage && latestMessage.text}`);
      //   }
      // }
      const sendNotification = (message) => {
        const payload = {
          notification: {
            title: 'Nowa wiadomość',
            body: message,
            click_action: `/`,
          },
        };
      }    
      const handleListItemClick = (chatId) => {
        // Ustawienie aktualnie wybranego czatu
        dispatch(setChatId({ chatId }));
        setSelectedChat(chatId);
        
        // Stworzenie nowego czatu dla użytkownika
        dispatch(createChat({ userId: userId }));
        
        // Przekierowanie na stronę nowego czatu
        window.location.href = `/newChat/${chatId}`;
        
        // Zwrócenie wybranego chatId
        return chatId;
      }

      
        // Oblicz liczbę nieprzeczytanych powiadomień na podstawie lastMessages
        useEffect(() => {
          let unreadMessagesCount = 0;
          for (const chatId in lastMessages) {
            const latestMessage = lastMessages[chatId].lastMessage;
            if (latestMessage && latestMessage.displayed === false) {
              unreadMessagesCount++;
            }
          }
          setNotificationsCount(unreadMessagesCount);
        }, [lastMessages]);
        
        

  return (
    <div>
  
        <IconButton
          className={classes.iconButton}
          onClick={handleMenuOpen}
          aria-controls="chat-menu"
          aria-haspopup="true"
        >
       <Badge badgeContent={notificationsCount} color="secondary">
        <Message />
      </Badge>
      </IconButton>
      <Menu id="chat-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}>

      
      {chatsById.map((chat) => {
        let latestMessage = "Brak wiadomości";
        let TagNewMsg = false;
      if (lastMessages[chat.chatId] && lastMessages[chat.chatId].lastMessage && lastMessages[chat.chatId].lastMessage.text) {
        latestMessage = lastMessages[chat.chatId].lastMessage.text;
      }
      if(userId === lastMessages[chat.chatId] && lastMessages[chat.chatId].lastMessage && lastMessages[chat.chatId].lastMessage.senderId){
        setIsRead(false);
      {/* }else{
        if(!lastMessages[chat.chatId] || !lastMessages[chat.chatId].lastMessage || !lastMessages[chat.chatId].lastMessageRead){
          setIsRead(true);
        } else {
          setIsRead(false);
        } */}
        
        
      } else if(!lastMessages[chat.chatId] || !lastMessages[chat.chatId].lastMessage || !lastMessages[chat.chatId].lastMessageRead){
        //setIsRead(true);
        
      }

      let lm = null;
        if(lastMessages[chat.chatId] != null)
        lm = lastMessages[chat.chatId].lastMessage;
        if(lm != null && lastMessages[chat.chatId].lastMessage.senderId != sessionStorage.userId)
        if(lm != null && !lm.displayed)  TagNewMsg = true;

      return (
        <MenuItem key={chat._id} onClick={handleMenuClose}>
          <ListItemIcon>
            <Message fontSize="small" />
          </ListItemIcon>
          
          <ListItemText
          primary={chat.chatId}
          secondary={latestMessage}
          onClick={() => handleListItemClick(chat.chatId)}
          primaryTypographyProps={{ style: { fontWeight: TagNewMsg ? 'bold' : 'normal' } }}
          secondaryTypographyProps={{ style: { fontWeight: TagNewMsg ? 'bold' : 'normal' } }}
          //className={lastMessages[chat.chatId] && lastMessages[chat.chatId].lastMessage && !lastMessages[chat.chatId].lastMessage.read ? classes.unreadMessage : ''}

        />
      </MenuItem>
      );
    })}
      </Menu>
      <div>
      </div>
    </div>
  )
}

export default ChatList
