import React from "react";

function UserDetails({ nextStep, step }) {
  const [userDetails, setUserDetails] = [
    {
      email: "",
      password: "",
      repeatpassword: "",
    },
  ];
  const Continue = (e) => {
    e.preventDefault();
    nextStep();
  };
  const passwordVerifier = () => {
    if (userDetails.password == "") alert("Please enter Password");
    else if (userDetails.repeatpassword == "")
      alert("Please enter confirm password");
    else if (userDetails.password != userDetails.repeatpassword) {
      alert("\nPassword did not match: Please try again...");
      return false;
    }
  };
  return (
    <div>
      <div>
        <div>Krok {step}-4</div>
        <div>Załóż konto</div>
        <form>
          <div>
            <input
              placeholder='Adres email'
              onChange={(e) => {
                setUserDetails({ ...userDetails, email: e.target.value });
              }}></input>
          </div>
          <div>
            <input
              placeholder='Hasło'
              onChange={(e) => {
                setUserDetails({ ...userDetails, password: e.target.value });
              }}></input>
          </div>
          <div>
            <input
              placeholder='Powtórz hasło'
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  repeatpassword: e.target.value,
                });
              }}></input>
          </div>
          <div>
            <button onClick={Continue}>Kontynuuj</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserDetails;
