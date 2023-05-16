import { createTheme } from "@mui/material"

export const Colors = {
    primary: "#009688",
    secondary: "#757575",
    success: "#4caf50",
    info: "#00bcd4",
    danger: "#D32F2F",
    warning: "#FFC107",
    dark: "#00796B",
    light: "#B2DFDB",
   

    //TEXT & ICONS
    p_text:"#212121",
    s_text:"#757575",   
    icons:"#FFFFFF",
    accent:"#009688",

    //GRAYS
    dim_gray:"#696969",
    dove_gray: "#d5d5d5",
    body_bg:"#f3f6f9",
    light_gray:"rgb(230,230,230)",

    //BASIC
    white:"#fff",
    black:"#000"

}

export const theme = createTheme({
    palette: {
        primary: {
          main: Colors.primary,
        },
        secondary: {
          main: Colors.secondary,
        },
      },
      components: {
        MuiButton: {
          defaultProps: {
            disableRipple: true,
            disableElevation: true,
          },
        }
    }   
});

