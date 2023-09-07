import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Avatar, Grid, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { getUser, updateTask } from '../../services/firebaseService';
import { onSnapshot } from 'firebase/firestore';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CardTask = ({ taskData, user, taskId, eraseTask, blockTask, editTask }: any) => {
  const [name, setName] = useState(taskData.name);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [owner, setOwner] = useState<any>();

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const completedTask = () => {
    if (!taskData.isBlocked || taskData.user === user.email) {
        updateTask(taskId , {
          isCompleted: !taskData.isCompleted,
        })
        .then(() => {
          if (!taskData.isCompleted) {
            setSnackbarMessage('A tarefa foi completada com sucesso.');
            setSnackbarOpen(true);
          }
        }).catch((err: Error) => {
          setSnackbarMessage('Erro na requisição');
          setSnackbarOpen(true);
        });
      }
  }

  useEffect(() => {
    const user = getUser(taskData.user);

    onSnapshot(user, (querySnapshot: any) => {
      setOwner(
        querySnapshot.docs.map((doc: any) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })
  }, []);

  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container spacing={0} alignItems={'center'}>
            <Grid item xs={1} justifyContent={'center'}>
              <Checkbox 
                checked={taskData.isCompleted}
                defaultChecked={false} 
                color="success" 
                onClick={completedTask}
                inputProps={{ 'aria-label': 'controlled' }}
                disabled={taskData.isBlocked && taskData.user !== user.email}
              />
            </Grid>
            <Grid item xs={8} justifyContent={'center'}>
            <TextField
              id="outlined-basic" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyUp={(e) => {
                if(e.key === 'Enter') {
                  if (name.trim() !== '') { 
                    editTask(taskId, name)
                  }
                }
              }}
              onBlur={() => {
                if (name.trim() !== '') { 
                  editTask(taskId, name)}  
                }
              } 
              variant="outlined"
              disabled={taskData.isCompleted || taskData.isBlocked && taskData.user !== user.email}
              className={taskData.isCompleted ? 'completed-textfield' : ''}
              fullWidth 
            />
            </Grid>
            <Grid item xs={2} ml={5}>
              <Box flexDirection={'row'} display={'flex'} justifyContent={'center'}>
                <Box>
                  <Avatar sx={{ bgcolor: deepOrange[500] }} src={
                    owner !== null && owner !== undefined ? owner[0]?.data?.photoURL
                    : 'https://i.pinimg.com/280x280_RS/59/af/9c/59af9cd100daf9aa154cc753dd58316d.jpg'
                    }>N</Avatar>  
                </Box>
                { taskData.user === user.email && (
                <Box>
                  <Button 
                    disabled={taskData.isBlocked && taskData.user !== user.email}
                    onClick={() => blockTask(taskId, taskData)}
                  >
                    {taskData.isBlocked ? (
                      <LockIcon />
                    ) : (
                      <LockOpenIcon />
                    )}
                  </Button>
                </Box>
                )}
                <Box>
                  <Button 
                    disabled={taskData.isBlocked && taskData.user !== user.email}
                    onClick={() => eraseTask(taskId)}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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

export default CardTask;