import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, useTheme } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import axios from 'axios';
import SingleProduct from './SingleProduct';
import SliderProducts from '../common/slider/SliderProducts';

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));


  useEffect(() => {
    axios.get('/product/latest')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const productStyle = {
    width: '100%', // ustawienie stałej szerokości
    height: 'auto', // ustawienie automatycznej wysokości
  }
  
  const renderProducts = products.map((product) => (
    <Grid item key={product._id} xs={12} sm={6} md={4} lg={3} display='flex' flexDirection={'column'} alignItems="center" >
      <SingleProduct product={product} matches={matches} style={productStyle} />
    </Grid>
  ));
  const sliderStyle = {
    maxWidth: '1200px', // ustawienie maksymalnej szerokości
    margin: '0 auto', // ustawienie centrowania
  }
  return (
    <Container>
      <SliderProducts className="slider-container" style={sliderStyle}>
        {renderProducts}
      </SliderProducts>
    </Container>
  );
}