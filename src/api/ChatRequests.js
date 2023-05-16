import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:4200' });

// export const createChat = (data) => API.post('/chat/', data);

// export const userChats = (id) => API.get(`/chat/${id}`);

// export const findChat = (firstId, secondId) => API.get(`/chat/find/${firstId}/${secondId}`);

//export const apiPost = (adres, body) => API.post()

export const createNewChat = (giverUserId, takerUserId) => API.post('/chats/createChat',{
    giverUserId: giverUserId,
    takerUserId: takerUserId
})
.then(function (response) {
    if(response.status===200){
        return 1;
    }else{
        return 0;
    }
})