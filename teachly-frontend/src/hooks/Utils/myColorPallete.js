import { grey, blue, red } from "@mui/material/colors";

export default function myColorPallete() {
  return {
    typography: {
      fontFamily: ["Public Sans", "sans-serif"].join(","),
    },
    palette: {
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
    },
  };
}
