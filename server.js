const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config()
// const bodyParser = require('bodyParser');
const cors = require('cors');
const userRoutes = require('./routes/user.js');
const productRoutes = require('./routes/posts.js');
const reviewRoutes = require('./routes/reviews');
const messagesRoutes = require('./routes/messages');
const plantRoute = require("./routes/plantRoute");
const chatRoutes = require('./routes/chat');
const transactionRoutes = require('./routes/transactions');
const adminRoutes = require('./routes/admin');
const session = require('express-session');
const User = require('./models/userModel');
const datauri = require('datauri');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { collection } = require('./models/userModel.js');
//firebase


const http = require('http').Server(app);


// const io = require('socket.io')(4000, {
//   cors:{
//       origin: ['http://localhost:3000'],
//   }
// })

// io.on('connection', (socket) => {
//   console.log(`A user connected with id: ${socket.id}`);

//   socket.on('disconnect', () => {
//     console.log(`A user disconnected with id: ${socket.id}`);
//   });

//   socket.on('private message', async (data) => {
//     console.log(`Received private message from user ${data.senderId} to user ${data.recipientId}: ${data.message}`);

//     try {
//       // check if a chat already exists between the users
//       const existingChat = await ChatModel.findOne({
//         $or: [
//           { giverUserId: data.senderId, takerUserId: data.recipientId },
//           { giverUserId: data.recipientId, takerUserId: data.senderId }
//         ]
//       });

//       // if the chat doesn't exist, create a new one
//       if (!existingChat) {
//         await ChatModel.create({
//           chatId: uuidv4(),
//           giverUserId: data.senderId,
//           takerUserId: data.recipientId,
//           messages: []
//         });
//       }

//       // send the private message to the recipient
//       socket.to(data.recipientId).emit('private message', data);

//     } catch (error) {
//       console.error(error);
//     }
//   });
// });


//MIDLEWARE //body parser config
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors());

//ROUTES
app.use('/api/user', userRoutes);
app.use('/api/posts',productRoutes);
app.use('/reviews', reviewRoutes);
app.use('/messages', messagesRoutes);
app.use('/chats', chatRoutes);
app.use('/plants', plantRoute);
app.use('/transactions', transactionRoutes);
app.use('/admin',adminRoutes )


//DATABASE
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("Database connected :)"))
    .catch(console.err);

//SERVER LISTENING
    app.get("/api", (req,res)=>{
        res.send("Hello, express here");
    });
    
// //definicja schematu dla produktu
//  const postSchema = mongoose.Schema({
//   name: String,
//   type: String,
//   price: String,
//   state: String,
//   description: String,
//   productImg: {
//     data: Buffer,
//     contentType: String
//   },
//   imgBase64: String,
//   userId: String,
//   date: {
//     type: Date,
//     default: Date.now
// },
//   isUsed:{
//     type: Boolean,
//     default: false
//   }
// });

// //konfiguracja multera do obsługi plików
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './');
//   },
//   filename: (req, file, cb) => {
//     cb(null,  file.originalname);
//   }
// });

// //filtr plików - akceptujemy tylko obrazy w formacie JPEG, JPG i PNG
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/jpeg' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/png'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };
// module.exports = postSchema;
// //konfiguracja multera z użyciem wcześniej zdefiniowanych opcji
// const upload = multer({ storage: storage, fileFilter: fileFilter, limits: {fileSize:5*1024*1024} });
// //definicja modelu dla produktu
// const Post = mongoose.model("Post",postSchema);

// //definicja endpointa /createCard do dodawania produktów
// app.post('/createCard', upload.single('imgBase64'), async (req, res) => {
//   if (true) {
//     //jeśli plik został załadowany
//     const maxChars = 250;//maksymalna liczba znaków w opisie produktu
//     const user = await User.FindUserByEmail(req.body.ownerEmail);//pobieranie użytkownika z bazy danych
//     console.log(user);

//   //tworzymy nowy produkt i zapisujemy go w bazie danych
//   Post.create({
//     name: req.body.name,
//     type: req.body.type,
//     price: req.body.price,
//     state: req.body.state,
//     description: req.body.description.slice(0,maxChars),
//     //productImg:req.body.productImg,
//     imgBase64:req.body.productImg,
//     userId: user,
//   })
//   .then((doc) => console.log(doc))
//   .catch((err) => console.log(err));
// } else {
//   res.status(400).send('No file uploaded');
// }
// });
const { Post, upload } = require('./models/postCard.js');
app.post('/createCard', upload.single('imgBase64'), async (req, res) => {
  if (true) {
    const maxChars = 250;
    const user = await User.FindUserByEmail(req.body.ownerEmail);
    console.log(user);

    Post.create({
      name: req.body.name,
      type: req.body.type,
      price: req.body.price,
      state: req.body.state,
      description: req.body.description.slice(0,maxChars),
      imgBase64:req.body.productImg,
      userId: user,
    })
    .then((doc) => console.log(doc))
    .catch((err) => console.log(err));
  } else {
    res.status(400).send('No file uploaded');
  }
});

//definicja endpointa /product do pobierania produktów
  app.get("/product",(req,res)=>{
    Post.find().then(items=>res.json(items))
    .catch((err)=>console.log(err));
})

  app.get(`/product/${Object._id}`, (req, res) => {
    const productId = req.params._id;
    const product = products.find(p => p._id === Number(productId));
    if (!product) {
      return res.status(404).send('Product not found');
    }
    return res.send(product);
  });
  app.get("/product/latest", (req, res) => {
    Post.find()
      .sort({ _id: -1 })
      .limit(10)
      .then((items) => res.json(items))
      .catch((err) => console.log(err));
  });

  
    app.listen(4200, function(){
        console.log('Im listening on port 4200')
    })
