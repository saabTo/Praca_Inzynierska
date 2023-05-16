const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const admin = require('firebase-admin');
const serviceAccount = require("C:\\Users\\Legion\\Desktop\\pracaInż\\settings\\chat-6e313-firebase-adminsdk-olak8-2f697e480a.json");
const Admin = require('../models/adminModel');
//Inicjalizacja Firebasr Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'mongodb://localhost:27017/Plants'
});

const db = admin.firestore();

//Funkcja do generowania tokenu JWT na podstawie ID użytkownika
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '30d' })
}

//Funkcja do wyszukiwania danych uzytkownika na podstawie adresu email
const findUserData = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.FindUserByEmail(email);
    res.status(200).json({user});
  } catch (error) {
    res.status(400).json({error});
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
      let user;
      let isAdmin = false;

      // check if user is admin
      if (email === 'Administrator@admin.com' && password === 'Administrator') {
        isAdmin = true;
        user = {
          _id: 'admin',
          email: 'Administrator@admin.com'
        }
      } else {
        user = await User.login(email, password);
      }

      // create a token
      const token = createToken(user._id)

      const userId = await User.FindUserByEmail(email);

      res.status(200).json({ email, token, userId, isAdmin })
  } catch (error) {
      res.status(400).json({ error: error.message })
  }
}

const logoutUser = (req, res) => {
  res.status(200).json({ message: "Successfully logged out" });
}


// signup a user
const signupUser = async (req, res) => {
  const {email, password, confirmPassword} = req.body

  try {
    // check if passwords match
    if (password !== confirmPassword) {
      throw Error('Hasła nie są takie same');
    }
  // create a new admin user
  const admin = new Admin({
    login: 'Administrator@admin.com',
    password: await bcrypt.hash('Administrator', 10) // hash the password using bcrypt
  });

  // save the new admin user to the database
  await admin.save();
    const user = await User.signup(email, password,confirmPassword);

    // generate a new Firebase token
    const token = createToken(user._id);

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// const userEmail = (req, res) => {
//   const email = req.params.email
//   res.send({ email })
// }
//update token
const updateFCMToken = async (req,res)=>{
  try {
    const token = req.body.fcmToken;
    const userId = req.body.userId;
    const user = await User.findById(userId);
    user.fcmToken = token;
    await user.save();
    res.status(200).send('Token FCM został zaktualizowany');
  } catch (error) {
    console.error(error);
    res.status(500).send('Nie udało się zaktualizować tokenu FCM');
  }
}

// const getAllUsers = async () => {
//   try {
//     const users = await User.find();
//     return users;
//   } catch (error) {
//     throw new Error('Nie udało się pobrać użytkowników');
//   }
// };


module.exports = { signupUser, loginUser,logoutUser, findUserData,updateFCMToken }
