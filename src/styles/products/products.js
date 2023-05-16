import React from "react";
import { Box, Button, styled } from "@mui/material";
import { Colors } from "../theme/theme";
import {IconButton} from "@mui/material";
import { slideInBottom, slideInRight } from "../../animation/Animation";

export const Product = styled(Box)(({theme})=>({
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
    [theme.breakpoints.up('md')]:{
        position:'relative'
    }
}));

export const ProductImage = styled('img')(({src, theme})=>({
    src: `url(${src})`,
    width: '100%',
    height:'340px',
    //background: Colors.light_gray,
    padding: '10px',
    [theme.breakpoints.down('md')]:{
        width:'80%',
        padding:'24px',

    }
}));
export const ProductActionButton = styled(IconButton)(()=>({
    background:Colors.white,
    margin: 4,
}))
export const ProductFavButton = styled(ProductActionButton)(({isfav,theme})=>({
    color: isfav ? Colors.primary : Colors.light,
    [theme.breakpoints.up('md')]:{
        position:'absolute',
        right: 0,
        top: 0,
    }
}));
//withoud add to cart
export const ProductMetaWrapper = styled(Box)(({theme}) => ({
    padding: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }));
  
  export const ProductActionsWrapper = styled(Box)(({ show, theme }) => ({ 
    [theme.breakpoints.up("md")]: {
      display: show ? 'visible' : 'none',
      position: "absolute",
      right: 0,
      top: '20%',
      animation: show && `${slideInRight} 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`,
    }
  }));
