import React from 'react';
import Slider from 'react-slick';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, IconButton, Typography } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderProducts = ({ children }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = theme.breakpoints.down('sm');
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: (
      <IconButton
        aria-label="next"
        sx={{ position: 'absolute', top: '50%', right: -24, transform: 'translateY(-50%)' }}
      >
        <ArrowForward />
      </IconButton>
    ),
    prevArrow: (
      <IconButton
        aria-label="previous"
        sx={{ position: 'absolute', top: '50%', left: -24, transform: 'translateY(-50%)' }}
      >
        <ArrowBack />
      </IconButton>
    ),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };
const showAll = () =>{
  navigate('/product')
}
  return (
    <Container maxWidth="lg" sx={{ mt: 8 }}>
      <Slider {...settings} matches={matches}>
        {children}
      </Slider>
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button variant="outlined" sx={{ mr: 2 }} onClick={showAll}>
          Pokaż wszystkie
        </Button>
      </Box>
    </Container>
  );
};

export default SliderProducts;