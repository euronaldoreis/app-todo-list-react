import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography,
  TextField
  } from '@mui/material';
import CardTask from '../../components/CardTask';
import AddTask from '../../components/AddTask';
import { createTask, findAllTasks, deleteTask, updateTask } from '../../services/firebaseService';
import { Timestamp, onSnapshot } from 'firebase/firestore';
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom'
import Header from '../../components/Header';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import SkeletonList from '../../components/SkeletonList';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ListPage() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user }: any = UserAuth();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [search, setSearch] = useState('');

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const showSnackbar = (message: string) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCreateTask = (name: string) => {
    createTask({
      isBlocked: false,
      isCompleted: false,
      createdAt: Timestamp.now(),
      user: user.email,
      name: name,
    }).then(() => {
      showSnackbar('A tarefa foi criada com sucesso.');
    }).catch((err) => {
      showSnackbar('Erro na requisição');
    });
  };

  const handleEraseTask = (taskId: any) => {
    deleteTask(taskId)
      .then(() => {
        showSnackbar('A tarefa foi excluida com sucesso.');
      }).catch((err) => {
        showSnackbar('Erro na requisição');
      });
  };

  const handleblockTask = (taskId: any, taskData: any) => {
    updateTask(taskId , {
      isBlocked: !taskData.isBlocked
    })
      .then(() => {
        if (!taskData.isBlocked) {
          showSnackbar('A tarefa foi bloqueada com sucesso.');
        } else {
          showSnackbar('A tarefa foi desbloqueada com sucesso.');
        }
      }).catch((err) => {
        showSnackbar('Erro na requisição');
      });
  };

  const handleUpdateTask = (taskId: any, name: string) => {
    updateTask(taskId , {
      name
    })
      .then(() => {
        showSnackbar('A tarefa foi atualizada com sucesso.');
      }).catch((err) => {
        showSnackbar('Erro na requisição');
      }); 
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
    {user && (
      <>
        <Header user={user} />
        <Container maxWidth="md">
          <Box mt={5}>
            <Typography variant="h4" component="h4">
              Lista de Tarefas
            </Typography>
          </Box>
          <Box mt={2}>
            <TextField 
              id="outlined-basic" 
              label="Pesquisar" 
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Pesquise uma task"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              fullWidth 
            />
          </Box>
          <Box mt={5}>
            <AddTask handleCreate={handleCreateTask} />
            {isLoading ? (
              <SkeletonList />
            ) : (
              tasks !== null && tasks !== undefined && 
                tasks
                  .filter((task: any) => task.data.name.toLowerCase().includes(search.toLowerCase()))
                  
                  .sort((a: any, b: any) => {
                    if (a.data.isCompleted && !b.data.isCompleted) {
                      return 1; 
                    }
                    if (!a.data.isCompleted && b.data.isCompleted) {
                      return -1;
                    }
                    return b.data.createdAt.toDate() - a.data.createdAt.toDate()
                  })
                  .map((task: any) => (
                    <Box mt={2} key={task.id}>
                      <CardTask 
                        key={task.id} 
                        taskData={task.data} 
                        user={user} 
                        taskId={task.id} 
                        eraseTask={handleEraseTask} 
                        blockTask={handleblockTask}
                        editTask={handleUpdateTask}
                      />
                    </Box>
              ))
            )}
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
    )}
    </>
  );
}

export default ListPage;
