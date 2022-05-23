import { useState, useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { reducer, intialState } from "./reducer";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Navbar from "./components/Navbar/Navbar.js";
import Settings from "./pages/Settings/Settings.js";
import VerifyEmail from "./pages/Auth/VerifyEmail/VerifyEmail";
import Home from "./pages/Home/Home";
import MyAccount from "./pages/MyAccount/MyAccount";
import EditEmail from "./components/EditAccountInfo/EditEmail/EditEmail";
import EditEmailRequest from "./components/EditAccountInfo/EditEmail/EditEmailRequest";
import EditPassword from "./components/EditAccountInfo/EditPassword/EditPassword";
import EditPasswordRequest from "./components/EditAccountInfo/EditPassword/EditPasswordRequest";
import EditEmailConfirm from "./components/EditAccountInfo/EditEmail/EditEmailConfirm";
import AuthContext from "./context/authContext";
import ReducerContext from "./context/reducerContext";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute.js";
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
              <Navbar />
              <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route
                  path='/myaccount'
                  element={
                    <AuthenticatedRoute>
                      <MyAccount />
                    </AuthenticatedRoute>
                  }
                />
                <Route
                  path='/settings'
                  element={
                    <AuthenticatedRoute>
                      <Settings />
                    </AuthenticatedRoute>
                  }
                />
                <Route
                  path='/settings/editemail'
                  element={
                    <AuthenticatedRoute>
                      <Settings>
                        <EditEmailRequest />
                      </Settings>
                    </AuthenticatedRoute>
                  }
                />
                <Route
                  path='/email-reset/:uidFromUrl/:tokenFromUrl'
                  element={
                    <AuthenticatedRoute>
                      <Settings>
                        <EditEmail />
                      </Settings>
                    </AuthenticatedRoute>
                  }
                />
                <Route
                  path='/email-reset-confirm/:uidFromUrl/:tokenFromUrl/:hashedEmail'
                  element={
                    <AuthenticatedRoute>
                      <Settings>
                        <EditEmailConfirm />
                      </Settings>
                    </AuthenticatedRoute>
                  }
                />
                <Route
                  path='/password/reset/confirm/:uidFromUrl/:tokenFromUrl'
                  element={
                    <AuthenticatedRoute>
                      <Settings>
                        <EditPassword />
                      </Settings>
                    </AuthenticatedRoute>
                  }
                />
                <Route
                  path='/settings/editpasswordrequest'
                  element={
                    <AuthenticatedRoute>
                      <Settings>
                        <EditPasswordRequest />
                      </Settings>
                    </AuthenticatedRoute>
                  }
                />
                <Route exact path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
                <Route path='/activate/:uidURL/:tokenURL' element={<VerifyEmail />}></Route>
              </Routes>
            </ThemeProvider>
          </Router>
        </ReducerContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
