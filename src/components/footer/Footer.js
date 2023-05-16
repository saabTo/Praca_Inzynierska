import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Link, Button } from '@mui/material';
import { Email, Facebook, Twitter, Instagram } from '@mui/icons-material';
import {Dialog} from '@mui/material';

export default function Footer(){
  const [onClose, setOnClose] = useState(false);

  const handleOnClose = () =>{
    setOnClose(true);
  }

    return(
      <div>
        <AppBar position='fixed' color='primary' sx={{top: 'auto', bottom: 0}}>
          <Toolbar sx={{ justifyContent: 'space-between' }}>
            {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Dialog>
              <Button>Kontakt</Button>
            </Dialog>
            </Typography> */}
          <div></div>
            <div>
            <Link href="mailto:plantverse@example.com" color="inherit">
              <IconButton aria-label="Email">
                <Email />
              </IconButton>
            </Link>
            <IconButton href="#" aria-label="Facebook">
              <Facebook />
            </IconButton>
            <IconButton href="#" aria-label="Twitter">
              <Twitter />
            </IconButton>
            <IconButton href="#" aria-label="Instagram">
              <Instagram />
            </IconButton>
          </div>
          </Toolbar>
        </AppBar>
      </div>
    
    );
}