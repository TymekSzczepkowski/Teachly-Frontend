import { orange, grey, blue, red } from "@mui/material/colors";

export default function myColorPallete(mode) {
  return {
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            primary: {
              main: blue[500],
              dark: blue[700],
            },
            secondary: {
              main: grey[600],
              dark: "#007856",
              contrastText: "#000",
            },
            background: {
              default: "#222",
              paper: "#1F1F1F",
            },
            success: {
              main: blue[300],
              light: blue[300],
            },
            warning: {
              main: orange[400],
              light: orange[50],
            },
            error: {
              main: red[300],
              light: red[100],
            },
          }
        : {
            primary: {
              main: blue[600],
              dark: blue[800],
            },
            secondary: {
              main: grey[600],
              dark: "#007856",
              contrastText: "#fff",
            },
            background: {
              paper: "#FBFBFB",
              default: "#fff",
            },
            error: {
              main: red[700],
              light: red[700],
            },
          }),
    },
  };
}
