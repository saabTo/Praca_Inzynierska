import React from 'react';
import '../grid/StartGrid.css';
import { Container } from '@mui/material';
import Banner from '../banner/Banner';
import LatestProducts from '../latestProducts.js/LatestProducts';

export default function StartGrid() {

  return (
    <Container maxWidth="xl" sx={{ background: "#fff" }}>
    <Banner />
    <LatestProducts />
    <td style={{height:'100px'}}/>
  </Container>

  );
}
