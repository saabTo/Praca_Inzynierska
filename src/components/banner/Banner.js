import React from 'react'
import { useMediaQuery } from '@mui/material';
import {useTheme} from '@mui/material'; 
import {BannerContainer,BannerContent,BannerTitle,BannerDescription,BannerImage } from '../../styles/banner/banner';
import {Typography} from '@mui/material';

const Banner = () => {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div>
      <BannerContainer>
      <BannerImage src='/img/plants.jpeg'/>
        <BannerContent>
            <Typography variant='h6'>Hello</Typography>
            <BannerTitle variant='h2'>
              New Plants
            </BannerTitle>
            <BannerDescription variant='subtitle'>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </BannerDescription>
        </BannerContent>
      </BannerContainer>
    </div>
  )
}

export default Banner;
