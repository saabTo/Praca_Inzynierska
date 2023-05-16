import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import '../header/Header.css';
import ChatList from '../chatList/ChatList';



function Header() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

 const pages = ['Produkty', 'Moje', !user ? 'Logowanie' : null, !user ? 'Rejestracja' : null];
  const settings = ['Logout'];
  const links = ['/product', '/mineProducts', '/logIn', '/signup']
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (href) => {
    setAnchorElNav(null);
    if (href) {
      window.location.href = href;
    }
  };
  

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout= () => {
    logout();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl" className='header-background'>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography 
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontSize:'25px',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover': {
                color: 'lightgray',
              },
            }}
          >
          PlantVerse
        </Typography>
        
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
             {pages.map((page, index) => (
              <MenuItem key={page} onClick={() => handleCloseNavMenu(links[index])} href={links[index]}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              '&:hover':{
                color:'lightgray'
              }
            }}
          >
            PlantVerse
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page, index) => {
                if (page === 'Moje' && !user) {
                return null; // jeśli nie ma zalogowanego użytkownika i strona to "Moje", to nie renderuj linku
                }
                return (
                <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' ,'&:hover':{color:'lightgray'}, fontSize:'13px', marginTop:'20px'}}
                    href={links[index]}
                >
                    {page}
                </Button>
                );
            })}
            </Box>
        {user &&  <ChatList />}  
        {user && 
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar/>
                {user && <Typography variant="subtitle1">{user.email}</Typography>}

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
              
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">Wyloguj</Typography>
                </MenuItem>
              
            </Menu>
          </Box>}          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;