import { initializeApp } from "firebase/app";
import { onMessage,getMessaging } from "firebase/messaging";

export const firebaseConfig = {
    apiKey: "AIzaSyCb0su79sMi3HCV8vPrgkZ-B5o5AZqeyfI",
    authDomain: "chat-6e313.firebaseapp.com",
    projectId: "chat-6e313",
    storageBucket: "chat-6e313.appspot.com",
    messagingSenderId: "463301916418",
    appId: "1:463301916418:web:343c5e0a52a8728749741b",
    measurementId: "G-GLFJ7ED5T2"
}

export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
    
});