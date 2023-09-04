import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, Grid } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const CardTask = ({ listData }: any) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Grid container spacing={0}>
          <Grid item xs={2}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>  
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6" component="div">
            {listData.text}
            </Typography>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
              Criado em 
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button>
              <EditIcon />
            </Button>
            <Button>
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
}

export default CardTask;