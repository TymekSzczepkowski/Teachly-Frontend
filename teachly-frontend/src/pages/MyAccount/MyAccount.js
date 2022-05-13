import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;

function MyAccount() {
  const [auth, setAuth] = useAuth();
  const [profileDetails, setProfileDetails] = useState({});

  useEffect(() => {
    // axios.get(API_URL + ``,  headers: {
    //   Authorization: `Bearer ${auth.access}`,
    // },)
  }, []);

  return <div>MyAccount</div>;
}

export default MyAccount;
