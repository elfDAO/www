import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { deepPurple, amber } from "@mui/material/colors";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: '#10392A',
    },
    secondary: {
      main: '#36ECAC',
    },
    background: {
      default: "#10392A",
    },
  },
  typography: {
    "fontFamily": `"Labil Grotesk Basic", "Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500
   }
});

theme = responsiveFontSizes(theme);

export default theme;
