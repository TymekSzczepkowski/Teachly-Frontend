import React, { useState } from "react";
import UserDetails from "./UserDetails";
import PersonalDetails from "./PersonalDetails";
import Confirmation from "./Confirmation";
import Success from "./Success";
function Register() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState({
    profileType: "",
    email: "",
    password: "",
    repeatPassword: "",
    firstName: "",
    secondName: "",
    country: "",
    region: "",
    city: "",
  });

  const previousStep = () => {
    setStep(step - 1);
  };
  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <div>
      {(() => {
        switch (step) {
          case 1:
            return (
              <UserDetails
                nextStep={nextStep}
                state={state}
                setState={setState}
                step={step}
              />
            );
          case 2:
            return (
              <PersonalDetails
                nextStep={nextStep}
                previousStep={previousStep}
                setState={setState}
                state={state}
                step={step}
              />
            );
          case 3:
            return (
              <Confirmation
                nextStep={nextStep}
                previousStep={previousStep}
                step={step}
                state={state}
              />
            );
          case 4:
            return <Success />;
          default:
            return <div>error</div>;
        }
      })()}
    </div>
  );
}

export default Register;
