import { grey, blue, red } from "@mui/material/colors";

export default function myColorPallete() {
  return {
    // mode,
    // ...(mode === "dark"
    // ? {
    //     typography: {
    //       fontFamily: ["Public Sans", "sans-serif"].join(","),
    //       allv: {
    //         color: "pink",
    //       },
    //     },
    //     palette: {
    //       primary: {
    //         main: blue[500],
    //         dark: blue[700],
    //       },
    //       secondary: {
    //         main: grey[100],
    //         dark: "#007856",
    //         contrastText: "#fff",
    //       },
    //       background: {
    //         default: "#222",
    //         paper: "#1E1E1E",
    //       },
    //       success: {
    //         main: blue[300],
    //         light: blue[300],
    //       },
    //       warning: {
    //         main: orange[400],
    //         light: orange[50],
    //       },
    //       error: {
    //         main: red[300],
    //         light: red[100],
    //       },
    //     },
    //   }
    // : {
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
    // }),
  };
}
