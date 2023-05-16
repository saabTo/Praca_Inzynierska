import React, { useRef, useState } from 'react';
import { TextField, Paper, Button } from '@mui/material';
import { PasswordInput } from '@mantine/core';
import { Form, Col, Row, Stack } from 'react-bootstrap';
import { useSignup } from '../../hooks/useSignup';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  formContainer: {
    height: '92vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(123, 175, 158, 0.5)',
    //backgroundImage:'url(../../img/singUpPage.jpeg)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(3),
    height: '72vh'
  },
  paper: {
    backgroundColor: '#e4f0e2',
    padding: '40px',
    marginTop: '30px',
  },
}));

export default function SignUpPage() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signup, error, isLoading } = useSignup();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password, confirmPassword);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row className={classes.formContainer}>
        <Col xs={6}>
          <Paper className={classes.paper}>
            <Stack gap={3} className={classes.form}>
            <h1 order={3} style={{justifyItems:'center'}}>Zarejestruj się</h1>
              <TextField style={{width:'50vh'}} label="Imię" placeholder="Twoje imię" required ref={emailRef} value={firstName} onChange={e => setFirstName(e.target.value)} />
              <TextField style={{width:'50vh'}} label="Email" placeholder="twojmail@.com" required ref={emailRef} value={email} onChange={e => setEmail(e.target.value)} />
              <TextField type='password' style={{width:'50vh'}} label="Hasło" placeholder="Twoje hasło" required ref={passwordRef} value={password} onChange={e => setPassword(e.target.value)} sx={{ width: '100%' }} />
              <TextField type='password' style={{width:'50vh'}} label="Powtórz hasło" placeholder="Twoje hasło" required ref={passwordRef} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} sx={{ width: '100%' }} />

              <Button variant="filled" color="teal" style={{ marginTop: "20px" }} onClick={handleSubmit} disabled={isLoading}>Zarejestruj</Button>
              <p>
                Masz już konto?{' '}
                <a href="/logIn" style={{color:'green', textDecoration:'none'}}>Zaloguj się!</a>
              </p>
              {error && <div className='error'>{error}</div>}
            </Stack>
          </Paper>
        </Col>
      </Row>
    </Form>
  );
}
