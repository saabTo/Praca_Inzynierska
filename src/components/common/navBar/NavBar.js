import React from 'react';
import '../navBar/NavBar.css';
import { Container } from '@mantine/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Autocomplete } from '@mantine/core';
import { IconSearch } from '@tabler/icons';
import { useLogout } from '../../../hooks/useLogout';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';


export default function NavBar() {
  const { logout } = useLogout();
  const { user, isAdmin } = useAuthContext();
  const navigate = useNavigate();


  const handleClick = () => {
    logout();
  };

  return (
    <Navbar bg='light' expand="lg">
      <Navbar.Brand>
        <a href="/">
              <img src="../img/logo2.png" className="logo" alt="logo" />
        </a>
      </Navbar.Brand>
      <Navbar.Toggle aria-aria-controls='basic-navbar-nav'/>
      <Navbar.Collapse style={{display: 'block'}}>
        <Nav className='mr-auto'>
        {/* {user && !isAdmin &&(
          <Nav.Link  href="/aboutUs">O nas</Nav.Link>
        )} */}
          
          <Nav.Link  href="/forum">Forum</Nav.Link>
          {!user &&
          <Nav.Link  href="/product">Produkty</Nav.Link>}
          {user && (
            <Nav.Link  href="/mineProducts">Moje</Nav.Link>
            )}
           
          </Nav>
          <Nav className='ml-auto'>
          {!user &&(
            <Nav.Link  href="/signup">Rejestracja</Nav.Link>
          )}
          {!user &&( 
            <Nav.Link href="/login">Logowanie</Nav.Link>
          )}
          {user && !isAdmin && (
            <Nav.Link href="/profil">Profil</Nav.Link>
          )}
          {user && (
            <Nav.Link>
              <span>{user.email}</span>
              {user &&
              <button onClick={handleClick}>Wyloguj</button>}
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
          
    )
}