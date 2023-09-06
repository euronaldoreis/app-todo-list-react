import React from 'react';
import { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography
  } from '@mui/material';
import CardTask from '../../components/CardTask';
import AddTask from '../../components/AddTask';
import { createTask, findAllTasks } from '../../services/firebaseService';
import { Timestamp, onSnapshot } from 'firebase/firestore'
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ListPage() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Criar funcionalidade X no sistema",
      createdAt: new Date(),
      author: 'Ronaldo Reis',
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir para a academia",
      createdAt: new Date(),
      author: 'Ronaldo Reis',
      isCompleted: false,
    },
    {
      id: 3,
      text: "Aprimorar funcionalidade X no sistema",
      createdAt: new Date(),
      author: 'Ronaldo Reis',
      isCompleted: false,
    },
  ]);
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user }: any = UserAuth();
  const { logOut }: any = UserAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [search, setSearch] = useState('');

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleCreateTask = (name: string) => {
    createTask({
      isBlocked: false,
      isCompleted: false,
      createdAt: Timestamp.now(),
      user: user.email,
      name: name,
    }).then(() => {
      setSnackbarMessage('A tarefa foi criada com sucesso.');
      setSnackbarOpen(true);
    }).catch((err) => {
      setSnackbarMessage('Erro na requisição');
      setSnackbarOpen(true);
    })

  }

  useEffect(() => {
    if (user !== null) {
      const q = findAllTasks();
      onSnapshot(q, (querySnapshot: any) => {
        setTasks(
          querySnapshot.docs.map((doc: any) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
        setIsLoading(false);
      })
    }
  }, [user]);

  return (
    <>
      <Header user={user} />
      <Container maxWidth="md">
        <Box mt={5}>
          <Typography variant="h4" component="h4">
            Lista de Tarefas
          </Typography>
        </Box>
        <Box mt={5}>
          <AddTask handleCreate={handleCreateTask} />
          { tasks !== null && tasks !== undefined && 
            tasks
              .filter((task: any) => task.data.name.toLowerCase().includes(search.toLowerCase()))
              .sort((a: any, b: any) =>
                b.data.createdAt.toDate() - a.data.createdAt.toDate()
              )
              .map((task: any) => (
                <Box mt={2}>
                  <CardTask key={task.id} listData={task} />
                </Box>
          ))}
        </Box>
      </Container>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={snackbarOpen} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </>
  );
}

export default ListPage;
