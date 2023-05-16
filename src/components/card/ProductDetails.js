import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {useTheme, useMediaQuery, Container, Grid} from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../features/product/ProductsSlice';
import { Colors } from '../../styles/theme/theme';
import { Close } from '@mui/icons-material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
} from '@material-ui/core';
import { Box, Typography } from '@mui/material';



export default function ProductDetails({ open, handleClose, product }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
 

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

 
  return (
    <Dialog open={open} onClose={handleClose} maxWidth='md' variant="permanant">
      <DialogTitle>
        <Box display='flex' alignItems='center' justifyContent='space-between'>
        {product.name}
          <IconButton aria-label='close' onClick={handleClose}>
            <Close/>
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Container maxWidth='lg'>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <img src={product.imgBase64} style={{ maxWidth: "100%" }} />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <p>{product.description}</p>
          <h4>{product.state}</h4>
        </Grid>
      </Grid>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
