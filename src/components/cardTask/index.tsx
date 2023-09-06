import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Avatar, Grid, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

const CardTask = ({ listData }: any) => {
  console.log(listData);
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container spacing={0} alignItems={'center'}>
          <Grid item xs={1} justifyContent={'center'}>
            <Checkbox defaultChecked={false} color="success" />
          </Grid>
          <Grid item xs={9} justifyContent={'center'}>
          <TextField
            id="outlined-basic" 
            value={listData.data.name}
            defaultValue={listData.data.name} 
            variant="outlined"
            fullWidth 
          />
          </Grid>
          <Grid item xs={2}>
            <Box flexDirection={'row'} display={'flex'} justifyContent={'center'}>
              <Box>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>  
              </Box>
              <Box>
                <Button>
                  <DeleteIcon />
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CardTask;