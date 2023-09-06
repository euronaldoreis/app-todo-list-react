import React, { useState } from 'react';
import { TextField } from '@mui/material';

const AddTask = ({ handleCreate }: any) => {
  const [name, setName] = useState('');

  return (
    <TextField 
      id="outlined-basic" 
      label="Adicione sua task" 
      variant="outlined"
      value={name}
      onChange={(e) => setName(e.target.value)}
      onKeyUp={(e) => {
        if(e.key === 'Enter') {
          if (name.trim() !== '') { 
            handleCreate(name)
            setName('');
          }
        }
      }} 
      placeholder="Digite um nome para sua task" 
      fullWidth 
    />
  )
}

export default AddTask;