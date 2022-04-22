import React, { useState } from "react";
import UserDetails from "./UserDetails";
function Register() {
  const [state, setState] = useState({
    step: 1,
    email: "",
    password: "",
    repeatpassword: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
  });

  return (
    <div>
      <UserDetails></UserDetails>
    </div>
  );
}

export default Register;
