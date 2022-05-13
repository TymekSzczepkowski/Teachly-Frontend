import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { reducer, intialState } from "./reducer";
import { useState, useReducer } from "react";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Navbar from "./components/Navbar/Navbar.js";
import VerifyEmail from "./pages/Auth/VerifyEmail/VerifyEmail";
import Home from "./pages/Home/Home";
import myColorPalette from "./hooks/Utils/myColorPallete";
import AuthContext from "./context/authContext";
import { ColorModeContext } from "./context/ColorModeContext";
import ReducerContext from "./context/reducerContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GlobalStyles } from "@mui/material";
import MyAccount from "./pages/MyAccount/MyAccount.js";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute.js";

function App() {
  const [colorMode, setColorMode] = useState(true);
  const [state, dispatch] = useReducer(reducer, intialState);
  const colorTheme = createTheme(myColorPalette(colorMode ? "dark" : "light"));
  return (
    <>
      <AuthContext.Provider
        value={{
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
                  body: { backgroundColor: colorMode ? "#121212" : "#F8F8F8" },
                }}
              />
              <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
                <Navbar />
                <Routes>
                  {/* <AuthenticatedRoute path='/profile' element={<MojaStaraSzybkoTanczy />}/> */}
                  <Route path='/' element={<Home />}></Route>
                  <Route path='/profile' element={<AuthenticatedRoute element={<MyAccount />} />}></Route>
                  <Route exact path='/login' element={<Login />}></Route>
                  <Route path='/register' element={<Register />}></Route>
                  <Route path='/activate/:uidURL/:tokenURL' element={<VerifyEmail />}></Route>
                </Routes>
              </ColorModeContext.Provider>
            </ThemeProvider>
          </Router>
        </ReducerContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
