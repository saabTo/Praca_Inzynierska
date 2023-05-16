import React, { useContext, useState } from 'react';
import { Button,TextField } from '@mui/material';
import {Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLogin } from '../../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { TestContext } from '../../App';
import { getToken } from '@firebase/messaging';
import { messaging } from '../../firebase';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  formContainer: {
    height: '87.7vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(123, 175, 158, 0.5)',
    padding: theme.spacing(2),
  },
  form: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),
  },
  paper: {
    backgroundColor: '#e4f0e2',
    padding: '40px',
    marginTop: '30px',
    borderRadius: '0',
    // [theme.breakpoints.up('md')]: {
    //   marginLeft: '200px',
    // },
  },
  responsiveImg: {
    maxWidth: '100%',
    height: 'auto',
    marginTop: '30px',
  },
}));

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const classes = useStyles();

  const onSubmitClicked = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      // console.log(user);
      if (messaging === null) {
        console.log('messaging jest pusty');
      }
      const token = await getToken(messaging, {
        vapidKey:
          'BMMa2_rgeNGR3D93RKNJjsKDxKDi2S3fgMdPLPpaED_4sVEDMyV5x34M2VlC53iyhPX7VuAx41fLYYud5v8W7mA',
      });
      const getUserFromLocalStorage = sessionStorage.getItem('user');
      const userObject = JSON.parse(getUserFromLocalStorage);
      const userId = userObject.userId;
      axios
        .post('/api/user/updateFCMToken', {
          userId: userId,
          fcmToken: token,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      //wysłac na serwer request z nowym tokenem i id uzytkownika ktoremu ten token trzeba przypisac
      console.log(token);

      navigate('/mineProducts');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.formContainer}>
     <Paper elevation={3} className={classes.paper}>
      <form className={classes.form} onSubmit={onSubmitClicked}>
        <h2>Zaloguj się</h2>
        <TextField
          style={{width:'50vh'}}
          label="Adres e-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          style={{width:'50vh'}}
          label="Hasło"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" disabled={isLoading}>
          Zaloguj
        </Button>
        <p>
          Nie masz jeszcze konta?{' '}
          <a href="/signup" style={{color:'green', textDecoration:'none'}}>Kliknij i załóż je od razu!</a>
        </p>
      </form>
  </Paper>
    {/* <div>
      <img src='../../img/logowanie-plant.jpeg' alt='kwiatuszek logowania' className={classes.responsiveImg}/>
     </div> */}
    </div>
  );
}
