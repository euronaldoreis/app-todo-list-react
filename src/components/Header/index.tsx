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
  MenuItem } from '@mui/material';
import { onSnapshot } from 'firebase/firestore'
import { UserAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { createUser, getUser } from '../../services/firebaseService';


const Header = ({user}: any) => {
  const navigate = useNavigate();
  const { logOut }: any = UserAuth();
  const [listUser, setListUser] = useState<any>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

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
  };

  useEffect(() => {
    if (user !== null) {
      const queryUser = getUser(user.email);

      onSnapshot(queryUser, (querySnapshot: any) => {
        setListUser(
          querySnapshot.docs.map((doc: any) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      })
    }
  }, [user])

  useEffect(() => {
    if (listUser !== null && listUser.length === 0) {
      createUser({ email: user.email, name: user.displayName, photoURL: user.photoURL })
    }
  }, [listUser]);

  return (
    <AppBar position="static" className='customAppBar'>
      <Container>
        <Grid item xs={12}>
          <Box mt={1} display="flex" alignItems='center' justifyContent='right'>
            <Tooltip title="Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user" src={
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