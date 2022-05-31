import { useState, useReducer } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { reducer, intialState } from "./reducer";
import Navbar from "./components/Navbar/Navbar";
import Layout from "./Layout/Layout";
import RoutesPaths from "./RoutesPaths";
import AuthContext from "./context/authContext";
import ReducerContext from "./context/reducerContext";
import myColorPalette from "./hooks/Utils/myColorPallete";
import { GlobalStyles } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function App() {
  const [userDetails, setUserDetails] = useState(" ");
  const [state, dispatch] = useReducer(reducer, intialState);
  const colorTheme = createTheme(myColorPalette);

  return (
    <>
      <AuthContext.Provider
        value={{
          userDetails,
          setUserDetails,
          user: state.user,
          login: (user) => dispatch({ type: "login", user }),
          logout: () => dispatch({ type: "logout" }),
        }}>
        <ReducerContext.Provider
          value={{
            state,
            dispatch,
          }}>
          <Router>
            <ThemeProvider theme={colorTheme}>
              <GlobalStyles
                styles={{
                  body: { backgroundColor: "#F8F8F8" },
                }}
              />
              <Layout header={<Navbar />} content={<RoutesPaths />} />
            </ThemeProvider>
          </Router>
        </ReducerContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
