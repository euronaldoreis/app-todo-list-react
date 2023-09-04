import React from 'react';
import { Box, Button, FormControl, Grid, TextField } from '@mui/material';

const AddTask = () => {
  return (
    <TextField 
      id="outlined-basic" 
      label="Adicione sua task" 
      variant="outlined" 
      placeholder="Digite um nome para sua task" 
      fullWidth 
    />
  )
}

export default AddTask;