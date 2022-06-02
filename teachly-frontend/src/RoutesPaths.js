import { Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import Settings from "./pages/Settings/Settings.js";
import VerifyEmail from "./pages/Auth/VerifyEmail/VerifyEmail";
import Home from "./pages/Home/Home";
import MyAccount from "./pages/MyAccount/MyAccount";
import EditEmail from "./components/EditAccountInfo/EditEmail/EditEmail";
import EditEmailRequest from "./components/EditAccountInfo/EditEmail/EditEmailRequest";
import EditPassword from "./components/EditAccountInfo/EditPassword/EditPassword";
import EditPasswordRequest from "./components/EditAccountInfo/EditPassword/EditPasswordRequest";
import EditEmailConfirm from "./components/EditAccountInfo/EditEmail/EditEmailConfirm";
import AuthenticatedRoute from "./hoc/AuthenticatedRoute.js";

function RoutesPaths() {
  return (
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
        path='/settings/editpassword'
        element={
          <AuthenticatedRoute>
            <Settings>
              <EditPasswordRequest />
            </Settings>
          </AuthenticatedRoute>
        }
      />
      <Route exact path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/activate/:uidURL/:tokenURL' element={<VerifyEmail />} />
    </Routes>
  );
}

export default RoutesPaths;