import React, {useState, useEffect } from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  AppBar, 
  Grid, 
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem  } from '@mui/material';
  import { onSnapshot } from 'firebase/firestore'
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = ({ user }: any) => {
  const navigate = useNavigate();
  const { logOut }: any = UserAuth();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  console.log(user);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = async () => {
    try {
      await logOut()
      navigate('/app-todo-list-react/', {
        state: {
          mode: 'logout',
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AppBar position="static">
    <Container>
      <Grid item xs={6}>
        <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Lista de Tarefas
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={
                  user ? user.photoURL
                  : '/static/images/avatar/2.jpg'
                  } />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleSignOut}>
                <Typography textAlign="center">Sair</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Grid>
    </Container>
  </AppBar>
  )
}

export default Header;