import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'
import { Container, Box, Typography, Button } from '@mui/material';
import { Google } from '@mui/icons-material';
import { UserAuth } from '../../context/AuthContext';

const LoginPage = () => {

  const { googleSignIn, user }: any = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const GoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (user !== null) {
      navigate('/app-todo-list-react/list')
    }
  }, [user])

  return (
    <Container maxWidth="md">
      <Box mt={5}>
        <Typography variant="h4" component="div">
          Lista de Tarefas
        </Typography>
      </Box>
      <Box mt={5}>
        <Typography variant="h6" component="h6">
          Faça o login com sua conta Google para continuar.
        </Typography>
      </Box>
      <Box mt={2}>
        <Button variant="contained" startIcon={<Google />} onClick={GoogleSignIn}>
          Login com Google
        </Button>
      </Box>
    </Container>
  )
}

export default LoginPage;